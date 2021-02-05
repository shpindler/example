from django.shortcuts import get_object_or_404
from rest_framework.status import HTTP_424_FAILED_DEPENDENCY, \
    HTTP_204_NO_CONTENT, HTTP_200_OK

from apps.itella_corrections.exceptions import ItellaAcceptedWorksChanged
from client_states.default.device_event_api_view import \
    DefaultDeviceEventApiViewState
from client_states.itella.enums.warning import DeviceEventWarningType
from client_states.itella.mixins.warning import ItellaWarningStateMixin
from timeattendance.serializers.device_event import DeviceEventSerializer
from timeattendance.utils import custom_itella
from timeattendance.views import DeviceEventApiView


class ItellaDeviceEventApiViewState(
    ItellaWarningStateMixin,
    DefaultDeviceEventApiViewState,
):

    @property
    def warning(self):
        return self.get_warning(self.request, self.instance)

    def save_and_get_obj(self, form):
        try:
            with custom_itella.ItellaShiftsChangesWatcher(
                self.request,
                self.user,
                self.employee,
                form.instance.localized_event_date().date(),
            ):
                obj = form.save()
        except ItellaAcceptedWorksChanged:
            return None

        return obj

    def patch(self, *args, **kwargs):
        response = super().patch(*args, **kwargs)

        if 'id' not in response.data:
            response.status_code = HTTP_424_FAILED_DEPENDENCY
            response.data = {
                '_info': {
                    'type': DeviceEventWarningType.ERROR,
                    **self.unable_to_save_error
                }
            }
        else:
            if 'specific_info_message' in self.warning:
                response.status_code = HTTP_424_FAILED_DEPENDENCY
                response.data['_info'] = {
                    'type': DeviceEventWarningType.WARNING,
                    **self.warning.get('specific_info_message')
                }
            elif 'specific_error_message' in self.warning:
                response.status_code = HTTP_424_FAILED_DEPENDENCY
                response.data['_info'] = {
                    'type': DeviceEventWarningType.ERROR,
                    **self.warning.get('specific_error_message')
                }
        return response

    def delete(self, request, *args, **kwargs):
        self.instance = get_object_or_404(
            self.get_queryset(), pk=self.instance_id)

        try:
            with custom_itella.ItellaShiftsChangesWatcher(
                    request, request.user, self.employee,
                    self.instance.localized_event_date().date()):
                response = super(DeviceEventApiView, self.context).delete(
                    request, *args, **kwargs)
                if response.status_code == HTTP_204_NO_CONTENT:
                    response.status_code = HTTP_200_OK
                    response.data = DeviceEventSerializer(
                        self.instance,
                        context=self.get_serializer_context(),
                    ).data
        except ItellaAcceptedWorksChanged:
            response.status_code = HTTP_424_FAILED_DEPENDENCY
            response.data['_info'] = {
                'type': DeviceEventWarningType.ERROR,
                **self.warning.get('specific_error_message')
            }
            return response

        self.make_post_delete_audit(instance=self.instance)

        return response
