import abc
import decimal
import re
from typing import Dict

import bs4
import requests


class AbstractPropertyParser(abc.ABC):
    def __init__(self) -> None:
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
        self._image_links = None

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

    @property
    def image_links(self) -> Dict[str, str]:
        if self._image_links is None:
            self._image_links = self._parse_image_links()
        return self._image_links

    @abc.abstractmethod
    def _parse_monthly_rent_price(self) -> int:
        pass

    @abc.abstractmethod
    def _parse_monthly_maintenance_fee(self) -> int:
        pass

    @abc.abstractmethod
    def _parse_initial_cost(self) -> int:
        pass

    @abc.abstractmethod
    def _parse_location(self) -> str:
        pass

    @abc.abstractmethod
    def _parse_distance_station_raw(self) -> str:
        pass

    @abc.abstractmethod
    def _parse_house_layout(self) -> str:
        pass

    @abc.abstractmethod
    def _parse_exclusive_area(self) -> float:
        pass

    @abc.abstractmethod
    def _parse_age_of_building(self) -> int:
        pass

    @abc.abstractmethod
    def _parse_floor_num(self) -> int:
        pass

    @abc.abstractmethod
    def _parse_direction(self) -> str:
        pass

    @abc.abstractmethod
    def _parse_additional_info(self) -> dict:
        pass

    def _parse_image_links(self) -> Dict[str, str]:
        return []


class SuumoParser(AbstractPropertyParser):
    def __init__(self, html: str) -> None:
        super().__init__()
        self.html = html
        self.soup = bs4.BeautifulSoup(html, "lxml")

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
                    ret = v.get_text(strip=True)
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
            features = selector.get_text(strip=True)
            ret["features"] = features.split("、")
        else:
            ret["features"] = []

        selector = self.soup.select("[class='data_table table_gaiyou'] tr")

        for row in selector:
            keys = row.select("th")
            values = row.select("td")
            for k, v in zip(keys, values):
                ret[k.get_text(strip=True)] = v.get_text(strip=True)

        return ret

    def _parse_image_links(self) -> Dict[str, str]:
        ret = dict()
        selector = self.soup.select("#js-view_gallery-list > li > a > img")
        for img in selector:
            name = img["alt"]
            link = img["data-src"]
            ret[name] = link
        return ret


class HomesParser(AbstractPropertyParser):
    def __init__(self, html):
        super().__init__()
        self.html = html
        self.soup = bs4.BeautifulSoup(html, "lxml")

    def _parse_monthly_rent_price(self) -> int:
        rent_price_raw = self.soup.select_one("dl[class='price'] #chk-bkc-moneyroom > span")
        if rent_price_raw:
            rent_price_raw = rent_price_raw.get_text()
        else:
            return 0

        price_canditates = re.findall(r"[0-9]+\.?[0-9]*", rent_price_raw.replace(",", ""))
        re_price = 0 if len(price_canditates) == 0 else price_canditates[0]
        if "万円" in rent_price_raw:
            return int(decimal.Decimal(re_price) * 10000)
        elif "千円" in rent_price_raw:
            return int(decimal.Decimal(re_price) * 1000)
        else:
            return int(re_price)

    def _parse_monthly_maintenance_fee(self) -> int:
        raw = self.soup.select_one("dl[class='price'] #chk-bkc-moneyroom")
        if raw:
            raw = raw.get_text()
        else:
            return 0

        match = re.search(r"\(.+\)", raw)
        if match:
            raw = match.group()
            price_canditates = re.findall(r"[0-9]+\.?[0-9]*", raw.replace(",", ""))
            re_price = 0 if len(price_canditates) == 0 else price_canditates[0]
            if "万円" in raw:
                return int(decimal.Decimal(re_price) * 10000)
            elif "千円" in raw:
                return int(decimal.Decimal(re_price) * 1000)
            else:
                return int(re_price)
        else:
            return 0

    def _parse_initial_cost(self) -> int:
        tags = {"敷金", "礼金", "保証金", "敷引"}
        selector = self.soup.select("div[class='bukkenSpec'] > div[class='line'] > dl")

        fees = []
        for row in selector:
            if [_ for _ in tags if _ in row.select_one("dt").get_text()]:
                raw = row.select_one("dd").get_text()
                raw_fees = raw.split("/")
                for t in raw_fees:
                    if "ヶ月" in t:
                        fees.append(int(re.sub(r"\D", "", t)) * self.monthly_rent_price)
                    else:
                        price_canditates = re.findall(r"[0-9]+\.?[0-9]*", t.replace(",", ""))
                        re_price = 0 if len(price_canditates) == 0 else price_canditates[0]
                        if "万円" in t:
                            fees.append(int(decimal.Decimal(re_price) * 10000))
                        else:
                            fees.append(int(re_price))
        return sum(fees)

    def _parse_location(self) -> str:
        selector = self.soup.select_one(
            "div[class='bukkenSpec'] > div[class='line'] > dl.rentLocation > dd"
        )
        if selector:
            location = ""
            tokens = selector.get_text(separator="<sep>", strip=True).split("<sep>")
            for t in tokens:
                if "地図を見る" in t:
                    break
                location += t
        else:
            return "div[class='bukkenSpec'] > div[class='line'] > dl.fulltraffic"

        return location

    def _parse_distance_station_raw(self) -> str:
        selector = self.soup.select(
            "div[class='bukkenSpec'] > div[class='line']  dd#chk-bkc-fulltraffic > p"
        )
        ret = ""
        for line in selector:
            if line.select("a"):
                break
            ret += line.get_text(strip=True) + "\n"
        return ret

    def _parse_house_layout(self) -> str:
        selector = self.soup.select_one(
            "div[class='bukkenSpec'] > div[class='line'] dd#chk-bkc-marodi"
        )
        if selector:
            layout = selector.get_text(strip=True)
        else:
            return ""

        return layout.split()[0]

    def _parse_exclusive_area(self) -> float:
        selector = self.soup.select_one(
            "div[class='bukkenSpec'] > div[class='line'] dd#chk-bkc-housearea"
        )
        if selector:
            raw = selector.get_text()
            area = re.findall(r"([0-9]+\.?[0-9]*)", raw)
            if area:
                return float(area[0])
            else:
                return 0.0
        else:
            return 0.0

    def _parse_age_of_building(self) -> int:
        selector = self.soup.select_one(
            "div[class='bukkenSpec'] > div[class='line'] dd#chk-bkc-kenchikudate"
        )
        if selector:
            raw = selector.get_text()
            match = re.search(r"\(.+\)", raw)
            if match:
                raw = match.group()
                raw = re.sub(r"\D", "", raw)
                try:
                    age = int(raw)
                except ValueError:
                    age = 0
                return age
            else:
                return 0
        else:
            return 0

    def _parse_floor_num(self) -> int:
        tag = "所在階 / 階数"

        selector = self.soup.select("[class=mod-bukkenSpecDetail] > table tr")
        for row in selector:
            keys = row.select("th")
            values = row.select("td")
            for k, v in zip(keys, values):
                if tag in k.get_text():
                    raw = v.get_text()
        floor = raw.split("/")[0]
        floor = re.sub(r"\D", "", floor)
        if floor:
            return int(floor)
        else:
            floor = raw.split("/")[1]
            floor = re.sub(r"\D", "", floor)
            if floor:
                return int(floor)
            else:
                return 1

    def _parse_direction(self) -> str:
        selector = self.soup.select_one(
            "div[class='bukkenSpec'] > div[class='line'] dd#chk-bkc-windowangle"
        )
        if selector:
            direction = selector.get_text()
            return direction
        else:
            return ""

    def _parse_additional_info(self) -> dict:
        ret = dict()
        features = []

        exclusive_tag = "この物件のこだわり"
        tag = "備考"

        selector = self.soup.select("#prg-bukkenNotes > table tr")
        for row in selector:
            keys = row.select("th")
            values = row.select("td")
            for k, v in zip(keys, values):
                if exclusive_tag in k.get_text():
                    continue
                if tag in k.get_text():
                    ret["備考"] = v.get_text(strip=True)
                    continue

                features += [_.strip() for _ in v.get_text(strip=True).split("、")]
        ret["features"] = features

        selector = self.soup.select("[class=mod-bukkenSpecDetail] > table tr")
        for row in selector:
            keys = row.select("th")
            values = row.select("td")
            for k, v in zip(keys, values):
                ret[k.get_text(strip=True)] = v.get_text(strip=True)
        return ret

    def _parse_image_links(self) -> Dict[str, str]:
        ret = dict()
        selector = self.soup.select("#photo ul[class='thumbs noscript'] > li > a > img")
        for img in selector:
            name = img["alt"]
            link = img["src"]
            ret[name] = link
        return ret


def download(url: str) -> AbstractPropertyParser:
    if re.match(r"https:\/\/suumo\.jp", url):
        response = requests.get(url, timeout=3)
        html = response.text
        return SuumoParser(html)
    if re.match(r"https:\/\/www\.homes\.co\.jp\/chintai\/room\/", url):
        user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
        header = {"User-Agent": user_agent}
        response = requests.get(url, headers=header)
        html = response.text
        return HomesParser(html)
    else:
        raise NotImplementedError
