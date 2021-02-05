from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from client_states.base import ClientState
from timeattendance.models import DeviceEvent
from timeattendance.models.deviceevent import invalidate_event_no_face


class DefaultDeviceEventSkipNoFaceApiViewState(ClientState):

    def __init__(self, instance_id, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.instance = get_object_or_404(
            DeviceEvent,
            user=self.request.user,
            pk=instance_id,
        )

    @property
    def request(self):
        return self.context.request

    @property
    def support_user(self):
        return self.request.session.get('support_user')

    def post(self, *args, **kwargs):
        invalidate_event_no_face(
            event=self.instance,
            is_support_user=bool(self.support_user),
        )
        return Response()
