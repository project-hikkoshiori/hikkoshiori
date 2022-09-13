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
        glob(f"{os.path.dirname(os.path.abspath(__file__))}/property_html/homes_example*")
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
        assert homes_parsers[2].monthly_maintenance_fee == 80000

    def test_initial_cost(self, homes_parsers):
        assert homes_parsers[0].initial_cost == 180000
        assert homes_parsers[1].initial_cost == 0
        assert homes_parsers[2].initial_cost == 330000
