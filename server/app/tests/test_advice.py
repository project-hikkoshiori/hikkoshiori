from models.schemas.advice import Advice

from datetime import datetime


def test_advice_class():
    dt = datetime.strptime("2022-03-01 10:00:00", "%Y-%m-%d %H:%M:%S")
    instance = Advice(
        id="34aadc65-d971-6311-4565-b70f5deb6d07",
        user_id="81f981b2-bdfa-4b98-b1a3-b4669f948a12",
        content="京都は除湿器がとても大事。",
        created_at=dt,
        icon_src="invalid",
    )
    assert instance.created_at == dt
