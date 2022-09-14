import math
import os
from glob import glob
from typing import List

import pytest
from app.controllers.property_collector import HomesParser


@pytest.fixture
def homes_parsers() -> List[HomesParser]:
    parsers = []
    for fname in sorted(
        glob(
            f"{os.path.dirname(os.path.abspath(__file__))}/property_html/homes_example*"
        )
    ):
        with open(fname) as fp:
            parsers.append(HomesParser(fp.read()))
    return parsers


class TestHomesParser:
    def test_monthly_rent_price(self, homes_parsers):
        assert homes_parsers[0].monthly_rent_price == 60000
        assert homes_parsers[1].monthly_rent_price == 63000
        assert homes_parsers[2].monthly_rent_price == 110000

    def test_monthly_mainenance_fee(self, homes_parsers):
        assert homes_parsers[0].monthly_maintenance_fee == 2000
        assert homes_parsers[1].monthly_maintenance_fee == 0
        assert homes_parsers[2].monthly_maintenance_fee == 8000

    def test_initial_cost(self, homes_parsers):
        assert homes_parsers[0].initial_cost == 180000
        assert homes_parsers[1].initial_cost == 0
        assert homes_parsers[2].initial_cost == 330000

    def test_location(self, homes_parsers):
        assert homes_parsers[0].location == "京都府京都市左京区上高野石田町"
        assert homes_parsers[1].location == "千葉県柏市布施974-19"
        assert homes_parsers[2].location == "埼玉県さいたま市中央区上落合5丁目9-(未定)"

    def test_distance_station_raw(self, homes_parsers):
        assert homes_parsers[0].distance_station_raw.startswith("京都市営烏丸線 国際会館駅 徒歩4分")
        assert homes_parsers[1].distance_station_raw.startswith("JR常磐線 北柏駅 徒歩23分")
        assert homes_parsers[2].distance_station_raw.startswith("JR埼京線 北与野駅 徒歩10分")

    def test_house_layout(self, homes_parsers):
        assert homes_parsers[0].house_layout == "ワンルーム"
        assert homes_parsers[1].house_layout == "3LDK"
        assert homes_parsers[2].house_layout == "1LDK"

    def test_exclusive_area(self, homes_parsers):
        assert math.isclose(homes_parsers[0].exclusive_area, 22.35)
        assert math.isclose(homes_parsers[1].exclusive_area, 71.21)
        assert math.isclose(homes_parsers[2].exclusive_area, 47.07)

    def test_age_of_building(self, homes_parsers):
        assert homes_parsers[0].age_of_building == 3
        assert homes_parsers[1].age_of_building == 42
        assert homes_parsers[2].age_of_building == 0

    def test_floor_num(self, homes_parsers):
        assert homes_parsers[0].floor_num == 2
        assert homes_parsers[1].floor_num == 1
        assert homes_parsers[2].floor_num == 1

    def test_direction(self, homes_parsers):
        assert homes_parsers[0].direction == "北"
        assert homes_parsers[1].direction == "南"
        assert homes_parsers[2].direction == "南西"

    def test_additional_info(self, homes_parsers):
        assert "バス・トイレ別" in homes_parsers[0].additional_info["features"]
