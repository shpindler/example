class ItellaWarningStateMixin:
    unable_to_save_error = {
        'title': 'Невозможно сохранить корректировку отметки',
        'description':
            'Изменение повлияет на согласованную или отправленную на согласование смену'
    }

    pending_shift_message = {
        'title': 'Смена, к которой относится отметка, согласована или отправлена на согласование',
        'description': 'При изменении менеджер провайдера, '
                       'начальник смены и начальник склада получат уведомления.'
    }

    def get_warning(self, request, instance):
        result = {}

        if instance.get_affected_itella_works(request, ['accepted', 'sent']):
            if not request.real_user.userprofile.is_itella_part_of_confirmation_process():
                result['specific_info_message'] = self.pending_shift_message
            else:
                result['specific_error_message'] = self.unable_to_save_error

        return result
