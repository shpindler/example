from client_states.default.device_event_permission import \
    DefaultDeviceEventPermissionState


class ItellaDeviceEventPermissionState(DefaultDeviceEventPermissionState):

    def has_object_permission(self, request, view, obj):
        result = super().has_object_permission(request, view, obj)

        if request.real_user.userprofile.is_itella_leasing_manager() \
                and "timeattendance/groups/dayresult/i" not in request.META.get(
            "HTTP_REFERER", ""):
            result = False

        return result
