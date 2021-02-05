from rest_framework.fields import SerializerMethodField

from client_states.default.device_event_serializer import \
    DefaultDeviceEventSerializerState
from timeattendance.models import DeviceEventChangeRequestForConfirmation


class FfrgDeviceEventSerializerState(DefaultDeviceEventSerializerState):

    def update(self, instance, validated_data):
        if 'forceskip' in validated_data and not instance.forceskip:
            DeviceEventChangeRequestForConfirmation.confirm_changes_for_event(
                instance,
                self.request.session.get(
                    'audit_user',
                    self.request.real_user,
                ),
            )
        return super().update(instance, validated_data)

    def _add_territorial_manager_email_field(self):
        name = 'territorial_manager_email'

        def get_field_value(instance):
            return (
                instance.employee.get_group().info.territorial_manager
                    .userprofile.extended_notification_email
            )

        self.context.fields[name] = SerializerMethodField()
        setattr(self.context, f'get_{name}', get_field_value)

    def update_fields(self):
        super().update_fields()
        self._add_territorial_manager_email_field()
