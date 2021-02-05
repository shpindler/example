from datetime import timedelta, datetime

from django.core.exceptions import ValidationError

from client_states.base import ClientState
from client_states_functionalities.make_audit import make_device_event_audit
from timeattendance.models import Office, Employee, Audit, AuditChange


class DefaultDeviceEventSerializerState(ClientState):

    @property
    def request(self):
        return getattr(self.context, 'request', None)

    @property
    def instance(self):
        return getattr(self.context, 'instance', None)

    @property
    def user(self):
        return getattr(self.context, 'user', None)

    @property
    def real_user(self):
        return getattr(self.context, 'real_user', None)

    def validate(self, data):
        device_event_edit_days = self.real_user.userprofile \
            .get_deviceevent_editdays_for_datepicker(for_form=True)

        event_date = data.get('event_date')
        work_code = data.get('workcode')
        office = data.get('office')

        if office and work_code:
            warehouse = office.employeegroup_set.all()

            office_companies = self.user.officecompany_set.filter(
                groups__parent__in=warehouse, code=work_code)

            if not office_companies.exists():
                raise ValidationError({'workcode': ['Неверный клиент']})

        if device_event_edit_days is not None and event_date:
            event_date_date = event_date.date()
            dt = datetime.utcnow()
            dtd = self.user.userprofile.localizedate(dt).date()
            delta = dtd - event_date_date
            if delta > timedelta(device_event_edit_days):
                if device_event_edit_days == 0:
                    raise ValidationError(
                        'Вы можете редактировать отметки в прошлом'
                        ' только за сегодняшний день',
                    )
                else:
                    from timeattendance.utils.common import \
                        pluralize_russian_word
                    word = pluralize_russian_word(
                        device_event_edit_days + 1,
                        ('день', 'дня', 'дней'))
                    raise ValidationError(
                        'Вы можете редактировать отметки в прошлом'
                        ' только за последние ' + word +
                        ', включая сегодняшний',
                    )

        return data

    @staticmethod
    def get_audit_description(update_fields):
        if (
            'forceskip' in update_fields and
            'comment' in update_fields and
            len(update_fields) == 2
        ):
            return 'Отметка аннулирована'

        return 'Изменена отметка'

    def update(self, instance, validated_data):
        update_fields = set(validated_data.keys())
        audit = make_device_event_audit(
            request=self.request,
            instance=instance,
            operation=Audit.CHANGE,
            description=self.get_audit_description(update_fields),
        )

        for field in validated_data:
            old_value = getattr(instance, field)
            if field == 'office':
                setattr(
                    instance,
                    field,
                    Office.objects.get(pk=validated_data[field]['id']),
                )
            elif field == 'employee':
                setattr(
                    instance,
                    field,
                    Employee.objects.get(pk=validated_data[field]['id']),
                )
            else:
                setattr(instance, field, validated_data[field])
            new_value = getattr(instance, field)
            if new_value != old_value:
                change = AuditChange(
                    label=instance.getfield_verbose_name(field),
                    old_value=old_value,
                    new_value=new_value,
                )
                change.audit = audit
                change.save()

        if instance.employee.scheduletype != 3:
            instance.status = -1
            update_fields.add('status')

        if instance.mode == -2 and not instance.comment:
            instance.comment = 'Изменена вручную'
            update_fields.add('comment')

        instance.save(update_fields=update_fields)
        instance.markasmodified()
        instance.employee.update_reportdays_last_modified_date(
            [instance.localizedate(instance.event_date).date()])
        return instance

    def update_fields(self):
        pass
