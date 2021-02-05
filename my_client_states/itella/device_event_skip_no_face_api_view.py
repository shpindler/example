from rest_framework.status import HTTP_424_FAILED_DEPENDENCY

from apps.itella_corrections.exceptions import ItellaAcceptedWorksChanged
from client_states.default.device_event_skip_no_face_api_view import \
    DefaultDeviceEventSkipNoFaceApiViewState
from client_states.itella.enums.warning import DeviceEventWarningType
from client_states.itella.mixins.warning import ItellaWarningStateMixin
from timeattendance.models.deviceevent import invalidate_event_no_face
from timeattendance.utils import custom_itella
from timeattendance.views import DeviceEventSkipNoFaceApiView


class ItellaDeviceEventSkipNoFaceApiViewState(
    ItellaWarningStateMixin,
    DefaultDeviceEventSkipNoFaceApiViewState,
):

    @property
    def warning(self):
        return self.get_warning(self.request, self.instance)

    def post(self, *args, **kwargs):
        invalidate_event_no_face(
            event=self.instance,
            is_support_user=bool(self.support_user),
            commit=False,
        )
        try:
            with custom_itella.ItellaShiftsChangesWatcher(
                self.request,
                self.request.user,
                self.instance.employee,
                self.instance.localized_event_date().date(),
            ):
                response = super(
                    DeviceEventSkipNoFaceApiView,
                    self.context,
                ).post(*args, **kwargs)
                self.instance.save(update_fields=['comment', 'forceskip'])
        except ItellaAcceptedWorksChanged:
            response.status_code = HTTP_424_FAILED_DEPENDENCY
            response.data['_info'] = {
                'type': DeviceEventWarningType.ERROR,
                **self.warning.get('specific_error_message')
            }
        return response
