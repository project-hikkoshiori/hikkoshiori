from abc import ABCMeta


class BaseLayoutModel(metaclass=ABCMeta):
    def __init__(self, model_path: str, *args, **kwargs):
        """load model from path.

        Args:
            model_path(str):

        """
        pass
