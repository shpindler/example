from copy import copy

from rest_framework.exceptions import ValidationError

from client_states.default.device_event_serializer import \
    DefaultDeviceEventSerializerState
from timeattendance.models import DeviceEventChangeRequestForCheck
from timeattendance.models.deviceeventstatuschangerequest import REQUESTSTATUS
from timeattendance.utils import custom_itella


class ItellaDeviceEventSerializerState(DefaultDeviceEventSerializerState):

    def validate(self, data):
        result = super().validate(data)

        event_date = result.get('event_date')
        work_code = result.get('workcode')
        office = result.get('office')

        if self.instance and office and work_code:
            warehouse = office.employeegroup_set.all()
            office_companies = self.user.officecompany_set.filter(
                groups__parent__in=warehouse, code=work_code)

            if office_companies.exists():
                if (
                    (not self.instance.id or 'event_date' in result)
                    and self.user.real_user.userprofile
                        .is_itella_leasing_manager()
                ):
                    if not office_companies.filter(archive=False).exists():
                        raise ValidationError({'workcode': ['Неверный клиент']})
                    else:
                        if event_date:
                            if not custom_itella.itella_leasing_can_add_event(
                                self.instance.employee,
                                event_date.date(),
                                office,
                            ):
                                raise ValidationError({
                                    'event_date',
                                    ['На выбранный день заявок нет'],
                                })

        return result

    def update(self, instance, validated_data):
        instance.create_original_deviceevent_if_it_does_not_exist(
            instance.status,
            instance.forceskip,
            instance.workcode,
            instance.event_date,
            instance.office.id,
        )

        old_instance = copy(instance)

        result = super().update(instance, validated_data)

        if 'workcode' in validated_data:
            result.create_or_update_workcode(validated_data['workcode'])

        if self.request.real_user.userprofile.is_itella_leasing_manager():
            DeviceEventChangeRequestForCheck.objects\
                .create_from_old_and_new_events(
                    self.request.session.get(
                        'audit_user',
                        self.request.real_user,
                    ),
                    old_instance,
                    result,
                    status=REQUESTSTATUS.NEW,
                )

        return result
