React = require 'react'
RouteNumber  = require '../departure/route-number'
moment = require 'moment'
Distance = require './distance'

intl = require 'react-intl'
FormattedMessage = intl.FormattedMessage
FormattedRelative = intl.FormattedRelative

class BicycleLeg extends React.Component

  render: ->
    <div key={@props.index} style={{width: "100%"}} className="row itinerary-row">
      <div className="small-2 columns itinerary-time-column">
        <div className="itinerary-time-column-time">
          {moment(@props.leg.startTime).format('HH:mm')}
        </div>
        <RouteNumber mode={@props.leg.mode.toLowerCase()} vertical={true}/>
      </div>
      <div className={"small-10 columns itinerary-instruction-column " + @props.leg.mode.toLowerCase()}>
        <div>
            <FormattedMessage
              id='cycle-from-to'
              values={{
                  fromName: <b>{@props.leg.from.name}</b>
                  toName: <b>{@props.leg.to.name}</b>
                  estimatedMinutes: <b>{Math.round(@props.leg.duration / 60)}</b>}}
              defaultMessage='Cycle for about {estimatedMinutes} minutes from {fromName} to {toName}' />
        </div>
        <div>
          <Distance distance={@props.leg.distance}/>
        </div>

      </div>
    </div>

module.exports = BicycleLeg
