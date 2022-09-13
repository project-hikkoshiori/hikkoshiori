import abc
import decimal
import re

import bs4
import requests


class AbstractPropertyParser(abc.ABC):
    pass


class SuumoParser(AbstractPropertyParser):
    def __init__(self, html: str) -> None:
        super().__init__()
        self.html = html
        self.soup = bs4.BeautifulSoup(html, "lxml")

        self._monthly_rent_price = None
        self._monthly_maintenance_fee = None
        self._initial_cost = None
        self._location = None
        self._distance_station_raw = None
        self._house_layout = None
        self._exclusive_area = None
        self._age_of_building = None
        self._floor_num = None
        self._direction = None
        self._additional_info = None

    def dict(self) -> dict:
        return {
            "monthly_rent_price": self.monthly_rent_price,
            "monthly_maintenance_fee": self.monthly_maintenance_fee,
            "initial_cost": self.initial_cost,
            "location": self.location,
            "distance_station_raw": self.distance_station_raw,
            "house_layout": self.house_layout,
            "exclusive_area": self.exclusive_area,
            "age_of_building": self.age_of_building,
            "floor_num": self.floor_num,
            "direction": self.direction,
            "additional_info": self.additional_info,
        }

    @property
    def monthly_rent_price(self) -> int:
        if self._monthly_rent_price is None:
            self._monthly_rent_price = self._parse_monthly_rent_price()
        return self._monthly_rent_price

    @property
    def monthly_maintenance_fee(self) -> int:
        if self._monthly_maintenance_fee is None:
            self._monthly_maintenance_fee = self._parse_monthly_maintenance_fee()
        return self._monthly_maintenance_fee

    @property
    def initial_cost(self) -> int:
        if self._initial_cost is None:
            self._initial_cost = self._parse_initial_cost()
        return self._initial_cost

    @property
    def location(self) -> str:
        if self._location is None:
            self._location = self._parse_location()
        return self._location

    @property
    def distance_station_raw(self) -> str:
        if self._distance_station_raw is None:
            self._distance_station_raw = self._parse_distance_station_raw()
        return self._distance_station_raw

    @property
    def house_layout(self) -> str:
        if self._house_layout is None:
            self._house_layout = self._parse_house_layout()
        return self._house_layout

    @property
    def exclusive_area(self) -> float:
        if self._exclusive_area is None:
            self._exclusive_area = self._parse_exclusive_area()
        return self._exclusive_area

    @property
    def age_of_building(self) -> int:
        if self._age_of_building is None:
            self._age_of_building = self._parse_age_of_building()
        return self._age_of_building

    @property
    def floor_num(self) -> int:
        if self._floor_num is None:
            self._floor_num = self._parse_floor_num()
        return self._floor_num

    @property
    def direction(self) -> str:
        if self._direction is None:
            self._direction = self._parse_direction()
        return self._direction

    @property
    def additional_info(self) -> dict:
        if self._additional_info is None:
            self._additional_info = self._parse_additional_info()
        return self._additional_info

    def _parse_monthly_rent_price(self) -> int:
        rent_price_raw = self.soup.select_one("[class='property_view_note-emphasis']")
        if rent_price_raw:
            rent_price_raw = rent_price_raw.get_text()
        else:
            return 0
        price = int(float(rent_price_raw.split("万円")[0]) * 10000)
        return price

    def _parse_monthly_maintenance_fee(self) -> int:
        tags = ["管理費", "共益費"]

        selector = self.soup.select(
            "[class='property_view_note-list'] > span:not(.property_view_note-emphasis)"
        )
        fees = []
        for fee_info in selector:
            raw = fee_info.get_text()
            if not [_ for _ in tags if _ in raw]:
                continue
            price_canditates = re.findall(r"([0-9]+\.?[0-9]*)", raw)
            re_price = 0 if len(price_canditates) == 0 else price_canditates[0]
            if "万円" in raw:
                fees.append(int(decimal.Decimal(re_price) * 10000))
            elif "千円" in raw:
                fees.append(int(decimal.Decimal(re_price) * 1000))
            else:
                fees.append(int(re_price))

        return sum(fees)

    def _parse_initial_cost(self) -> int:
        tags = ["敷金", "礼金", "保証金", "敷引"]

        selector = self.soup.select(
            "[class='property_view_note-list'] > span:not(.property_view_note-emphasis)"
        )
        fees = []
        for fee_info in selector:
            raw = fee_info.get_text()
            if not [_ for _ in tags if _ in raw]:
                continue
            price_canditates = re.findall(r"([0-9]+\.?[0-9]*)", raw)
            re_price = 0 if len(price_canditates) == 0 else price_canditates[0]
            if "万円" in raw:
                fees.append(int(decimal.Decimal(re_price) * 10000))
            elif "千円" in raw:
                fees.append(int(decimal.Decimal(re_price) * 1000))
            else:
                fees.append(int(re_price))

        return sum(fees)

    def _parse_location(self) -> str:
        tag = "所在地"
        selector = self.soup.select("[class='property_view_table'] tr")

        ret = ""
        for row in selector:
            keys = row.select("th")
            values = row.select("td")
            for k, v in zip(keys, values):
                if tag in k.get_text():
                    ret = v.get_text()
        ret.strip()
        return ret

    def _parse_distance_station_raw(self) -> str:
        tag = "駅徒歩"
        selector = self.soup.select("[class='property_view_table'] tr")

        ret = ""
        for row in selector:
            keys = row.select("th")
            values = row.select("td")
            for k, v in zip(keys, values):
                if tag in k.get_text():
                    ret = v.get_text()
        ret.strip()
        return ret

    def _parse_house_layout(self) -> str:
        tag = "間取り"
        selector = self.soup.select("[class='property_view_table'] tr")

        ret = ""
        for row in selector:
            keys = row.select("th")
            values = row.select("td")
            for k, v in zip(keys, values):
                if tag in k.get_text():
                    ret = v.get_text()
        ret.strip()
        return ret

    def _parse_exclusive_area(self) -> float:
        tag = "専有面積"
        selector = self.soup.select("[class='property_view_table'] tr")

        ret = ""
        for row in selector:
            keys = row.select("th")
            values = row.select("td")
            for k, v in zip(keys, values):
                if tag in k.get_text():
                    ret = v.get_text()
        ret.strip()

        area = re.findall(r"([0-9]+\.?[0-9]*)", ret)
        if area:
            return float(area[0])
        else:
            return 0.0

    def _parse_age_of_building(self) -> int:
        tag = "築年数"
        selector = self.soup.select("[class='property_view_table'] tr")

        ret = ""
        for row in selector:
            keys = row.select("th")
            values = row.select("td")
            for k, v in zip(keys, values):
                if tag in k.get_text():
                    ret = v.get_text()
        ret.strip()
        age = re.findall(r"[0-9]+", ret)
        if age:
            return int(age[0])
        else:
            return 0

    def _parse_floor_num(self) -> int:
        tag = "階"
        selector = self.soup.select("[class='property_view_table'] tr")

        ret = ""
        for row in selector:
            keys = row.select("th")
            values = row.select("td")
            for k, v in zip(keys, values):
                if tag in k.get_text():
                    ret = v.get_text()
        ret.strip()
        floor = re.findall(r"[0-9]+", ret)
        if floor:
            return int(floor[0])
        else:
            return 0

    def _parse_direction(self) -> str:
        tag = "向き"
        selector = self.soup.select("[class='property_view_table'] tr")

        ret = ""
        for row in selector:
            keys = row.select("th")
            values = row.select("td")
            for k, v in zip(keys, values):
                if tag in k.get_text():
                    ret = v.get_text()
        ret.strip()
        if ret == "-":
            ret = ""
        return ret

    def _parse_additional_info(self) -> dict:
        ret = dict()
        selector = self.soup.select_one("#bkdt-option > div > ul > li")
        if selector:
            features = selector.get_text()
            ret["features"] = features.split("、")
        else:
            ret["features"] = []

        selector = self.soup.select("[class='data_table table_gaiyou'] tr")

        for row in selector:
            keys = row.select("th")
            values = row.select("td")
            for k, v in zip(keys, values):
                ret[k.get_text()] = v.get_text()

        return ret


def download(url: str) -> AbstractPropertyParser:
    response = requests.get(url, timeout=3)
    html = response.text
    if re.match(r"https:\/\/suumo\.jp", url):
        return SuumoParser(html)
    else:
        raise NotImplementedError
