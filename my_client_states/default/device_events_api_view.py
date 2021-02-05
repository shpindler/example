import json
from datetime import datetime, time, timedelta

from django.db.models import Q

from client_states.base import ClientState
from timeattendance.models import DeviceEvent, EmployeeGroup
from utils.datetime import from_iso_to_ru


class DefaultDeviceEventsApiViewState(ClientState):

    @property
    def request(self):
        return self.context.request

    @property
    def today(self):
        return self.request.user.userprofile.localizedate(
            datetime.utcnow()).date()

    @property
    def defaults(self):
        return {
            'start_date': datetime.combine(self.today - timedelta(2), time()),
            'end_date': None,
        }

    @property
    def base_query(self):
        return Q(user=self.request.user)

    @property
    def search_value(self):
        if 'date_from' in self.request.GET or 'date_to' in self.request.GET:
            start_date = (
                from_iso_to_ru(self.request.GET.get('date_from'))
                if self.request.GET.get('date_from')
                else None
            )
            end_date = (
                from_iso_to_ru(self.request.GET.get('date_to'))
                if self.request.GET.get('date_to')
                else None
            )
            return json.dumps({
                'start_date': start_date,
                'end_date': end_date,
            })

    @property
    def page(self):
        return int(self.request.GET.get('page', '1'))

    @property
    def page_size(self):
        return int(self.request.GET.get('page_size', '10'))

    @property
    def start(self):
        return (self.page - 1) * self.page_size

    @property
    def length(self):
        return self.page_size

    def get_queryset(self, query=None):
        if query is None:
            query = self.base_query
        if len(self.request.user.egroups) > 0:
            egroups_ids = [g.id for g in self.request.user.egroups]
            not_manager_groups_ids = list(
                EmployeeGroup.objects.get_queryset_descendants(
                    EmployeeGroup.objects.filter(
                        offices__employeegroup__in=self.request.user.egroups),
                    include_self=True
                ).exclude(id__in=egroups_ids).values_list('id', flat=True))

            query &= ~Q(
                employee__employeegroup__in=not_manager_groups_ids)  # exclude foreign employees
            query &= ~(~Q(
                office__employeegroup__in=self.request.user.egroups) &  # exclude guestempls work in other offices
                       ~Q(
                           employee__employeegroup__in=self.request.user.egroups))

        return DeviceEvent.objects.filter(query).prefetch_related(
            'deviceeventinfo', 'deviceeventworkcode',
            'office__employeegroup_set', 'employee__employeegroup_set__info',
            'image_duplicate', 'device__devicelastimage'
        ).order_by('-user_id', '-event_date').distinct()

    def get_filtered_query(self):
        query = self.base_query
        if self.search_value:
            search_params = json.loads(self.search_value)
            try:
                start_date = datetime.strptime(
                    search_params.get('start_date', ''), '%d.%m.%Y').date()
            except (TypeError, ValueError):
                start_date = None
            try:
                end_date = datetime.strptime(search_params.get('end_date', ''),
                                             '%d.%m.%Y').date()
            except (TypeError, ValueError):
                end_date = None
        else:
            start_date = self.defaults['start_date']
            end_date = self.defaults['end_date']

        if start_date or end_date:
            if start_date:
                start_date = datetime.combine(start_date, time())
                query &= Q(event_date__gte=start_date - timedelta(hours=12))

            if end_date:
                end_date = datetime.combine(end_date, time(23, 59, 59, 999999))
                query &= Q(event_date__lte=end_date + timedelta(hours=12))

            if start_date and end_date:
                exclude_query = Q(
                    event_date__range=(min(end_date, start_date + timedelta(1)),
                                       max(end_date - timedelta(1),
                                           start_date)))
            elif start_date:
                exclude_query = Q(event_date__gte=start_date + timedelta(1))
            elif end_date:
                exclude_query = Q(event_date__lte=end_date - timedelta(1))

            events_to_check_skip = DeviceEvent.objects.filter(
                query & ~exclude_query
            ).select_related('office').only(
                'id', 'office__id', 'event_date', 'office__timezone',
                'employee_id'
            )

            skip = set()
            for event in events_to_check_skip.iterator():
                localdate = event.localizedate(event.event_date,
                                               self.request.user.userprofile)
                if start_date and localdate < start_date:
                    skip.add(event.id)
                elif end_date and localdate > end_date:
                    skip.add(event.id)

            query &= ~Q(id__in=skip)

        return query

    def get_paginated_queryset(self, queryset):
        return queryset[self.start:self.start + self.length]
