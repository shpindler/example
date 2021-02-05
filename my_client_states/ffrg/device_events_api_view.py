from client_states.default.device_events_api_view import \
    DefaultDeviceEventsApiViewState


class FfrgDeviceEventsApiViewState(DefaultDeviceEventsApiViewState):

    def get_queryset(self, query):
        return super().get_queryset(query).prefetch_related(
            'deviceeventstatuschangerequest_set')
