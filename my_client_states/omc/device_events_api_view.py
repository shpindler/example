from datetime import timedelta, datetime, time

from django.db.models import Q

import apps
import json

from client_states.default.device_events_api_view import \
    DefaultDeviceEventsApiViewState
from timeattendance.models import DeviceEvent, EmployeeGroup, \
    EmployeeGroup_Offices
from timeattendance.utils.common import get_month_range


class OmcDeviceEventsApiViewState(DefaultDeviceEventsApiViewState):

    @property
    def defaults(self):
        result = super().defaults
        _, end_date = get_month_range(self.today.year, self.today.month)
        result['end_date'] = datetime.combine(
            end_date, time(23, 59, 59, 999999))
        return result

    @staticmethod
    def localize_date(user, event_date, office_timezone):
        import pytz
        if office_timezone:
            return pytz.utc.localize(event_date).astimezone(
                office_timezone).replace(tzinfo=None)
        return user.userprofile.localizedate(event_date)

    def get_queryset(self, query=None):
        if query is None:
            query = self.base_query
        if self.request.user.egroups:
            EmployeeGroup_employees = apps.get_model('timeattendance',
                                                     'EmployeeGroup_employees')

            ownoffices = list(EmployeeGroup_Offices.objects.filter(
                employeegroup__in=self.request.user.egroups).values_list(
                'office_id', flat=True).order_by())
            ownempls = list(EmployeeGroup_employees.objects.filter(
                employeegroup__in=self.request.user.egroups).values_list(
                'employee_id', flat=True).order_by())

            not_manager_groups_ids = list(EmployeeGroup.objects.filter(
                offices__in=ownoffices, user=self.request.user
            ).get_descendants(include_self=True).filter(
                user=self.request.user).exclude(
                id__in=[g.id for g in self.request.user.egroups]
            ).values_list('id', flat=True).order_by())
            not_manager_employee_ids = list(
                EmployeeGroup_employees.objects.filter(
                    employeegroup__in=not_manager_groups_ids
                ).values_list('employee_id', flat=True).order_by())
            query &= ~Q(
                employee__in=not_manager_employee_ids)  # exclude foreign employees
            query &= ~(~Q(
                office__in=ownoffices) &  # exclude guestempls work in other offices
                       ~Q(employee__in=ownempls))

        return DeviceEvent.objects.filter(query).prefetch_related(
            'deviceeventinfo', 'deviceeventworkcode',
            'office__employeegroup_set', 'employee__employeegroup_set__info',
            'image_duplicate', 'device__devicelastimage'
        ).order_by('-event_date').distinct()

    def get_filtered_query(self):
        query = self.base_query

        if self.search_value:
            search_params = json.loads(self.search_value)
            try:
                start_date = datetime.strptime(
                    search_params.get('start_date', ''), '%d.%m.%Y %H:%M')
            except ValueError:
                start_date = None
            try:
                end_date = datetime.strptime(
                    search_params.get('end_date', ''),
                    '%d.%m.%Y %H:%M',
                ).replace(second=59, microsecond=999999)
            except (ValueError, AttributeError):
                end_date = None
        else:
            start_date = self.defaults['start_date']
            end_date = self.defaults['end_date']

        if start_date or end_date:
            base_exclude_query = DeviceEvent.objects.filter(
                query
            ).values('id', 'office_id', 'office__timezone',
                     'event_date').order_by()
            querysets_to_exclude = []

            if start_date:
                query &= Q(event_date__gte=start_date - timedelta(hours=12))

            if end_date:
                query &= Q(event_date__lte=end_date + timedelta(hours=12))

            if start_date:
                querysets_to_exclude.append(
                    base_exclude_query.filter(
                        event_date__range=(start_date - timedelta(hours=12),
                                           start_date + timedelta(hours=12))
                    )
                )
            if end_date:
                querysets_to_exclude.append(
                    base_exclude_query.filter(
                        event_date__range=(end_date - timedelta(hours=12),
                                           end_date + timedelta(hours=12))
                    )
                )

            skip = set()
            for skip_query in querysets_to_exclude:
                for event in skip_query.iterator():
                    localdate = self.localize_date(
                        self.request.user,
                        event['event_date'],
                        event['office__timezone'],
                    )
                    if start_date and localdate < start_date:
                        skip.add(event['id'])
                    elif end_date and localdate > end_date:
                        skip.add(event['id'])

            query &= ~Q(id__in=skip)

        return query

