from app.controllers.property_collector import fetch_lng_lat_from_address


def test_lng_lat():
    address = "北海道札幌市北区北６条西４丁目"
    assert fetch_lng_lat_from_address(address) == (141.349243, 43.068455)
