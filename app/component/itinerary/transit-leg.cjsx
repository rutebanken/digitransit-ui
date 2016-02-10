React        = require 'react'
RouteNumber  = require '../departure/route-number'
Link         = require 'react-router/lib/Link'
moment        = require 'moment'
#TODO Use two letter language code from server.cjsx with context
require 'moment/locale/nb'

config       = require '../../config'

intl = require 'react-intl'
FormattedMessage = intl.FormattedMessage

class TransitLeg extends React.Component
  @contextTypes:
    intl: intl.intlShape.isRequired

  render: ->
    originalTime = if @props.leg.realTime and @props.leg.departureDelay >= config.itinerary.delayThreshold then [
      <br/>,
      <span className="original-time">
        {moment(@props.leg.startTime).subtract(@props.leg.departureDelay, 's').format('HH:mm')}
      </span>
    ] else false

    <div key={@props.index} style={{width: "100%"}} className="row itinerary-row">
      <Link to="/lahdot/#{@props.leg.tripId}">
        <div className="small-2 columns itinerary-time-column">
          <div className="itinerary-time-column-time">
            <span className={if @props.leg.realTime then "realtime" else ""}>
              {moment(@props.leg.startTime).format('HH:mm')}
            </span>
            {originalTime}
          </div>
          <RouteNumber
            mode={@props.leg.mode.toLowerCase()}
            text={@props.leg.routeShortName}
            realtime={@props.leg.realTime}
            vertical={true}
          />
        </div>
      </Link>
      <div className={"small-10 columns itinerary-instruction-column " + @props.leg.mode.toLowerCase() + if @props.index == 0 then " from" else ""}>
        <div>
          <FormattedMessage
            id='transit-from-to'
            values={{
                transitMode: @context.intl.formatMessage({id: @props.leg.mode, defaultMessage: @props.leg.mode})
                fromName: <b>{@props.leg.from.name}</b>
                toName: <b>{@props.leg.to.name}</b>
                }}
            defaultMessage='Take the {transitMode} from {fromName} to {toName}' />
        </div>
        <div>{if @props.leg.headsign
          <FormattedMessage
            id='route-with-headsign'
            values={{
              route: @props.leg.route
              headsign: @props.leg.headsign}}
              defaultMessage="Route: {route} towards {headsign}" />
         else
           <FormattedMessage
            id='route-without-headsign'
            values={{
              route: @props.leg.route}}
              defaultMessage="Route {route}" />}
        </div>

        <div>{if @props.leg.intermediateStops.length > 0
          <FormattedMessage
            id={if(@props.leg.mode == 'AIRPLANE')
                  'num-stops-flight'
                else
                  'num-stops'}
            values={{
              stops: @props.leg.intermediateStops.length
              duration: moment.duration(@props.leg.duration, 'seconds').humanize()}}
            defaultMessage='{
              stops, plural,
              =1 {one stop}
              other {# stops}
              } ({duration})' />
        else
            moment.duration(@props.leg.duration, 'seconds').humanize()}

        </div>
        <div>
          {if @props.leg.mode != 'AIRPLANE'
            <FormattedMessage
              id='alight'
              values={{
                toName: <b>{@props.leg.to.name}</b>
                }}
              defaultMessage='Alight at stop {toName}'/>}
        </div>
      </div>
    </div>


module.exports = TransitLeg
