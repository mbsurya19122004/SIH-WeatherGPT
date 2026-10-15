import requests

OSRM_URL = "https://router.project-osrm.org/route/v1/driving"


def get_route(origin, destination, alternatives: bool = False):
    """
    origin and destination format:
    (latitude, longitude)
    
    Returns a list of routes (max 3 when alternatives=True), each with:
    - distance_km
    - duration_minutes
    - coordinates (GeoJSON LineString coordinates [lon, lat])
    """

    origin_lat, origin_lon = origin
    destination_lat, destination_lon = destination

    coordinates = (
        f"{origin_lon},{origin_lat};"
        f"{destination_lon},{destination_lat}"
    )

    url = f"{OSRM_URL}/{coordinates}"

    params = {
        "overview": "full",
        "geometries": "geojson",
        "alternatives": "true" if alternatives else "false",
    }

    response = requests.get(
        url,
        params=params,
        timeout=30
    )

    if response.status_code != 200:
        raise Exception(
            f"OSRM request failed: {response.status_code}"
        )

    data = response.json()

    if data["code"] != "Ok":
        raise Exception(
            f"Routing failed: {data['code']}"
        )

    routes = data["routes"][:3]  # Limit to 3 alternatives max

    return [
        {
            "distance_km": route["distance"] / 1000,
            "duration_minutes": route["duration"] / 60,
            "coordinates": route["geometry"]["coordinates"]
        }
        for route in routes
    ]