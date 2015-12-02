SERVER_ROOT = process.env.SERVER_ROOT or "http://localhost:8080"
module.exports =
  URL:
    SERVER_ROOT: SERVER_ROOT
    OTP: "#{SERVER_ROOT}/apiman-gateway/rutebanken/journeyplanner/1.0/"
    MAP: "#{SERVER_ROOT}/apiman-gateway/rutebanken/map/1.0/"
    MQTT: "ws://localhost:1883"
    ALERTS: "#{SERVER_ROOT}/hsl-alert/"
    FONT: "http://fonts.googleapis.com/css?family=Lato:300,400,900%7CPT+Sans+Narrow:400,700"
    REALTIME: "#{SERVER_ROOT}/navigator-server"
    PELIAS: "#{SERVER_ROOT}/apiman-gateway/rutebanken/geocoder/1.0/autocomplete"
    PELIAS_REVERSE_GEOCODER: "#{SERVER_ROOT}/apiman-gateway/rutebanken/geocoder/1.0/reverse"
  ROOT_PATH: process.env.ROOT_PATH or ''
  title: "Rutebanken"
  searchParams: {}
  nearbyRoutes:
    radius: 10000
    bucketSize: 1000
  maxWalkDistance: 10000
  maxBikingDistance: 40000
  itinerary:
    # How long vehicle should be late in order to mark it delayed. Measured in seconds.
    delayThreshold: 180
    # Wait time to show "wait leg"? e.g. 180 means over 3 minutes are shown as wait time. Measured in seconds.
    waitThreshold: 180
  initialLocation:
    zoom: 11
    lat: 59.91137
    lon: 10.75139
  nearestStopDistance:
    maxShownDistance: 5000
  map:
    useRetinaTiles: false
  autoSuggest:
    sortOrder: locality: 1, address: 2, stop: 3
    sortOthers: 4
  showCityBikes: false
  # Lowest level when stop or terminal markers are rendered at all
  stopsMinZoom: 15
  # Highest level when stops and terminals are still rendered as small markers
  stopsSmallMaxZoom: 15
  # Highest level when terminals are still rendered instead of individual stops
  terminalStopsMaxZoom: 17
