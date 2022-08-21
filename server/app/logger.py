import logging


def setup_logger():
    # ログ仕込む
    logger = logging.getLogger("uvicorn")
    logger.setLevel(logging.DEBUG)
    logger.info("setup logger completed......")
    return logger
