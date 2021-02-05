from copy import copy

from client_states.default.device_event_serializer import \
    DefaultDeviceEventSerializerState
from timeattendance.models import DeviceEventChangeRequestForCheck, DeviceEvent


class OmcDeviceEventSerializerState(DefaultDeviceEventSerializerState):

    def update(self, instance, validated_data):
        old_instance = copy(instance)
        result = super().update(instance, validated_data)
        DeviceEventChangeRequestForCheck.objects.create_from_old_and_new_events(
            self.request.session.get(
                'audit_user',
                self.request.real_user,
            ),
            old_instance,
            result,
        )
        return result
