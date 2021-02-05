from django.contrib.contenttypes.models import ContentType

from timeattendance.models import Audit, DeviceEvent, Employee


def make_device_event_audit(request, instance, operation, description):
    return Audit.objects.create_from_request(
        request,
        operation=operation,
        object_id=instance.id,
        content_type=ContentType.objects.get_for_model(DeviceEvent),
        obj_description=instance.auditname(),
        op_description=description,
        audittype=Audit.EVENTS,
        additional_date=instance.event_date,
        additional_object_id=instance.employee.id,
        additional_content_type=ContentType.objects.get_for_model(Employee),
    )
