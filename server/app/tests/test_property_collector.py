import math
import os
from glob import glob
from typing import List

import pytest
from app.controllers.property_collector import SuumoParser


@pytest.fixture
def suumo_parsers() -> List[SuumoParser]:
    parsers = []
    for fname in sorted(
        glob(f"{os.path.dirname(os.path.abspath(__file__))}/property_html/suumo_example*")
    ):
        with open(fname) as fp:
            parsers.append(SuumoParser(fp.read()))
    return parsers


class TestSuumoParser:
    def test_monthly_rent_price(self, suumo_parsers: List[SuumoParser]):
        assert suumo_parsers[0].monthly_rent_price == 110000
        assert suumo_parsers[1].monthly_rent_price == 97000
        assert suumo_parsers[2].monthly_rent_price == 90600

    def test_monthly_maintenance_fee(self, suumo_parsers):
        assert suumo_parsers[0].monthly_maintenance_fee == 3500
        assert suumo_parsers[1].monthly_maintenance_fee == 5000
        assert suumo_parsers[2].monthly_maintenance_fee == 12000

    def test_initial_cost(self, suumo_parsers):
        assert suumo_parsers[0].initial_cost == 220000
        assert suumo_parsers[1].initial_cost == 194000
        assert suumo_parsers[2].initial_cost == 364800

    def test_location(self, suumo_parsers):
        assert suumo_parsers[0].location == "東京都練馬区南大泉６"
        assert suumo_parsers[1].location == "東京都練馬区関町北２"
        assert suumo_parsers[2].location == "京都府京都市左京区一乗寺築田町"

    def test_distance_station_raw(self, suumo_parsers):
        assert suumo_parsers[0].distance_station_raw.startswith("\n西武池袋線/保谷駅 歩8分")
        assert suumo_parsers[1].distance_station_raw.startswith("\n西武新宿線/武蔵関駅 歩4分")
        assert suumo_parsers[2].distance_station_raw.startswith("\n叡山電鉄叡山本線/茶山駅 歩12分")

    def test_house_layout(self, suumo_parsers):
        assert suumo_parsers[0].house_layout == "3LDK"
        assert suumo_parsers[1].house_layout == "1LDK"
        assert suumo_parsers[2].house_layout == "3LDK"

    def test_exclusive_area(self, suumo_parsers):
        assert math.isclose(suumo_parsers[0].exclusive_area, 65.21)
        assert math.isclose(suumo_parsers[1].exclusive_area, 32.48)
        assert math.isclose(suumo_parsers[2].exclusive_area, 65.06)

    def test_age_of_building(self, suumo_parsers):
        assert suumo_parsers[0].age_of_building == 30
        assert suumo_parsers[1].age_of_building == 0
        assert suumo_parsers[2].age_of_building == 20

    def test_floor_num(self, suumo_parsers):
        assert suumo_parsers[0].floor_num == 2
        assert suumo_parsers[1].floor_num == 2
        assert suumo_parsers[2].floor_num == 5

    def test_direction(self, suumo_parsers):
        assert suumo_parsers[0].direction == "南"
        assert suumo_parsers[1].direction == ""
        assert suumo_parsers[2].direction == "南"

    def test_additional_info(self, suumo_parsers):
        info = suumo_parsers[0].additional_info
        assert "バストイレ別" in info["features"]
        assert "初期費用カード決済可" in info["features"]
