from copy import copy

from django.contrib import messages
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, \
    HTTP_204_NO_CONTENT

from client_states.base import ClientState
from client_states_functionalities.make_audit import make_device_event_audit
from timeattendance.models import DeviceEvent, Audit
from timeattendance.serializers.device_event import DeviceEventSerializer
from timeattendance.views import DeviceEventApiView
from utils.datetime import from_iso_to_ru


class DefaultDeviceEventApiViewState(ClientState):

    def __init__(self, *, instance_id, **kwargs):
        super().__init__(instance_id=instance_id, **kwargs)
        self.instance_id = instance_id
        self.instance = None

    @property
    def request(self):
        return self.context.request

    @property
    def user(self):
        return self.request.user

    @property
    def employee(self):
        result = self.instance.employee
        result.user = self.user
        return result

    def get_queryset(self):
        return DeviceEvent.objects.filter(user=self.user)

    def get_serializer_context(self, *args, **kwargs):
        return {'request': self.request}

    def update(self):
        self.instance = get_object_or_404(DeviceEvent, pk=self.instance_id)

        s = DeviceEventSerializer(
            data=self.request.data,
            instance=self.instance,
            context=self.get_serializer_context(),
        )

        if s.is_valid():
            s.save()
            return {
                'success': True,
                'serializer': s,
            }

        return {'success': False, 'serializer': s}

    @staticmethod
    def get_success_patch_response(serializer, *args, **kwargs):
        return Response(serializer.data)

    @staticmethod
    def get_error_patch_response(errors):
        return Response(
            {'errors': errors},
            status=HTTP_400_BAD_REQUEST,
        )

    def patch(self, *args, **kwargs):
        self.instance = get_object_or_404(
            self.get_queryset(), pk=self.instance_id)
        update_data = self.update()
        if update_data.get('success'):
            return self.get_success_patch_response(**update_data)
        return self.get_error_patch_response(
            update_data.get('serializer').errors)

    def make_post_delete_audit(self, instance):
        make_device_event_audit(
            request=self.request,
            instance=instance,
            operation=Audit.DELETE,
            description='Удалена отметка',
        )
        messages.success(
            self.request,
            'Отметка была успешно удалена.',
            fail_silently=True,
        )

    def delete(self, request, *args, **kwargs):
        self.instance = get_object_or_404(
            self.get_queryset(), pk=self.instance_id)
        response = super(DeviceEventApiView, self.context).delete(
            request, *args, **kwargs)
        if response.status_code == HTTP_204_NO_CONTENT:
            response.status_code = HTTP_200_OK
            response.data = DeviceEventSerializer(
                self.instance, context=self.get_serializer_context()).data
        self.make_post_delete_audit(instance=self.instance)
        return response
