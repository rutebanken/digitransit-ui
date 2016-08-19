React              = require 'react'
moment             = require 'moment'
legTextUtil        = require '../../util/leg-text-util'
timeUtils          = require '../../util/time-utils'
geoUtils           = require '../../util/geo-utils'
Link               = require 'react-router/lib/Link'
RouteNumber        = require('../departure/RouteNumber').default
DepartureTime      = require('../departure/DepartureTime').default
cx                 = require 'classnames'
Icon               = require '../icon/icon'
RelativeDuration  = require '../duration/relative-duration'

class SummaryRow extends React.Component

  render: -> # TODO: divide into separate components/functions
    data = @props.data
    startTime = moment(data.startTime)
    endTime = moment(data.endTime)
    duration = endTime.diff(startTime)
    legs = []

    realTimeAvailable = false

    noTransitLegs = true

    for leg, i in data.legs
      if leg.transitLeg or leg.rentedBike
        if noTransitLegs and leg.realTime then realTimeAvailable = true
        noTransitLegs = false
        break

    realTimeIcon  = if realTimeAvailable then <Icon img="icon-icon_realtime" className="realtime-icon realtime" /> else false

    lastLegRented = false
    for leg, i in data.legs
      if leg.rentedBike && lastLegRented # No sense rendering two citybikes when walking with bike in between
        continue
      lastLegRented = leg.rentedBike

      if leg.transitLeg or leg.rentedBike or leg.mode == 'CAR' or noTransitLegs
        mode = leg.mode
        if leg.rentedBike
          mode = "CITYBIKE"
        legs.push <RouteNumber
                    key={i}
                    mode={mode}
                    text={legTextUtil.getLegText(leg)}
                    vertical={true}
                    className={cx "line", mode.toLowerCase()} />

    classes = cx [
      "itinerary-summary-row"
      "cursor-pointer"
      passive: @props.passive
    ]

    <div className={classes} onClick={() => @props.onSelect(@props.hash)}>
      <div className="itinerary-duration-and-distance">
        <div className="itinerary-duration">
          <RelativeDuration duration={duration} />
        </div>
        <div className="itinerary-walking-distance">
          <Icon img={'icon-icon_walk'} viewBox={"6 0 40 40"}/>
          {geoUtils.displayDistance(data.walkDistance)}
        </div>
      </div>
      <div className={cx "itinerary-start-time", "realtime-available": realTimeAvailable}>
        {realTimeIcon}
        {startTime.format("HH:mm")}
      </div>
      <div className="itinerary-legs">{legs}</div>
      <div className="itinerary-end-time">
        {endTime.format("HH:mm")}
      </div>
      <div className="action-arrow">
        <Icon img={'icon-icon_arrow-collapse--right'}/>
      </div>
    </div>


module.exports = SummaryRow
