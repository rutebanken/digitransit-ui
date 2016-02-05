CONFIG = process.env.CONFIG or 'rutebanken'
API_URL = process.env.API_URL or 'http://apiman.rutebanken.org'
APP_PATH = process.env.APP_CONTEXT or ''
PIWIK_ADDRESS = process.env.PIWIK_ADDRESS or ''
PIWIK_ID = process.env.PIWIK_ID or ''
SENTRY_DSN = process.env.SENTRY_DSN or ''
PORT = process.env.PORT or 8080
# Erlend is not sure if SERVER_ROOT is still used
SERVER_ROOT = process.env.SERVER_ROOT or "#{API_URL}"
module.exports =
  PIWIK_ADDRESS: "#{PIWIK_ADDRESS}"
  PIWIK_ID: "#{PIWIK_ID}"
  SENTRY_DSN: "#{SENTRY_DSN}"
  PORT: "#{PORT}"
  CONFIG: "#{CONFIG}"
  URL:
    API_URL: "#{API_URL}"
    OTP: "#{API_URL}/apiman-gateway/rutebanken/journeyplanner/1.0/"
#    MAP: "#{API_URL}/apiman-gateway/rutebanken/map/1.0/"
    MAP: "http://map.rutebanken.org/hsl-map/"
#    STOP_MAP: "http://map.rutebanken.org/hsl-map/hsl-stop-map/"
    MQTT: "ws://localhost:1883"
    ALERTS: "#{API_URL}/hsl-alert/"
    FONT: "http://fonts.googleapis.com/css?family=Lato:300,400,900%7CPT+Sans+Narrow:400,700"
    REALTIME: "#{API_URL}/navigator-server"
    PELIAS: "http://pelias.rutebanken.org/v1/search"
#    PELIAS: "http://apiman.rutebanken.org/apiman-gateway/rutebanken/geocoder/1.0/autocomplete"
    PELIAS_REVERSE_GEOCODER: "http://pelias.rutebanken.org/v1/reverse"
#    PELIAS_REVERSE_GEOCODER: "http://apiman.rutebanken.org/apiman-gateway/rutebanken/geocoder/1.0/reverse"
  APP_PATH: "#{APP_PATH}"
  title: "Rutebanken"
  # TODO: What is preferredAgency?? Explanation: Used to filter trips for a certain agency at several places in the app
  preferredAgency: null
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
    # Number of stops to search for in pelias and to put first in search result.
    stopsFromPeliasSize: 3
    sortOrder: locality: 1, address: 2, stop: 3
    sortOthers: 4
    # Let Pelias suggest based on current user location
    locationAware: false
  showCityBikes: true
  # Lowest level when stop or terminal markers are rendered at all
  stopsMinZoom: 15
  # Highest level when stops and terminals are still rendered as small markers
  stopsSmallMaxZoom: 15
  # Highest level when terminals are still rendered instead of individual stops
  terminalStopsMaxZoom: 17
  colors:
    primary: "#007ac9"
  socialMedia:
    title: "Rutebanken"
    description: "... under utvikling ..."
  hideTicketInformation : true
