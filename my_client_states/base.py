from typing import Generic, TypeVar
from importlib import import_module
from stringcase import snakecase
from stringcase import pascalcase

from .signatures import CLIENT_SIGNATURES


def get_state_key(username: str):
    state_keys = {
        'omctest': 'omc',
        'itellatest': 'itella',
    }
    if username in state_keys.keys():
        return state_keys[username]
    return username


Context = TypeVar('Context')


class ClientState(Generic[Context]):
    """
    Base class for client states.
    """

    def __init__(self, *, context: Context, **kwargs):
        self.context = context


class ClientStatefulMixin:
    """
    Mixin for client state contexts.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.client_state = None

    def init_client_state(self, *, username: str, **kwargs) -> None:
        class_name = self.__class__.__name__
        client_key = None
        for key, value in CLIENT_SIGNATURES.items():
            if value['username'] == username:
                client_key = get_state_key(key)
                break
        try:
            self.client_state = getattr(
                import_module(
                    f'client_states.{client_key}.{snakecase(class_name)}',
                ),
                f'{pascalcase(client_key)}{class_name}State',
            )(context=self, **kwargs)
        except (ImportError, AttributeError):
            self.client_state = getattr(
                import_module(
                    f'client_states.default.{snakecase(class_name)}',
                ),
                f'Default{class_name}State',
            )(context=self, **kwargs)
