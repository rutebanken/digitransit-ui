React = require 'react'
RouteNumber  = require '../departure/route-number'
moment = require 'moment'

intl = require 'react-intl'
FormattedMessage = intl.FormattedMessage

class WalkLeg extends React.Component

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
              id='walk-from-to'
              values={{
                  fromName: <b>{@props.leg.from.name}</b>
                  toName: <b>{@props.leg.to.name}</b>
                  estimatedMinutes: <b>{Math.round(@props.leg.duration / 60)}</b>}}
              defaultMessage='Walk for {estimatedMinutes} minutes from {fromName} to {toName}' />
        </div>
      </div>
    </div>

module.exports = WalkLeg
