from rest_framework.response import Response

from client_states.default.device_event_skip_no_face_api_view import \
    DefaultDeviceEventSkipNoFaceApiViewState
from timeattendance.models.deviceevent import invalidate_event_no_face


class OmcDeviceEventSkipNoFaceApiViewState(
    DefaultDeviceEventSkipNoFaceApiViewState,
):

    def post(self, *args, **kwargs):
        invalidate_event_no_face(
            event=self.instance,
            is_support_user=bool(self.support_user),
            commit=False,
        )
        self.instance.save(update_fields=['comment', 'forceskip'])
        return Response()
