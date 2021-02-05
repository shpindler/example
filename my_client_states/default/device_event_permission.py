from rest_framework.permissions import SAFE_METHODS

from client_states.base import ClientState


class DefaultDeviceEventPermissionState(ClientState):

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        result = any(
            request.real_user.has_perm('timeattendance.%s' % perm)
            for perm in ('deviceevent_management', 'edit_deviceevent_status',
                         'edit_deviceevent_forceskip')
        )
        under_support_user =\
            request.session.get('support_user') is not None
        if not under_support_user and obj.skip_no_face \
                and not request.real_user.userprofile.is_admin():
            result = False
        if not obj.is_editable(request.user):
            result = False

        return result
