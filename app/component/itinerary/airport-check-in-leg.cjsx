React = require 'react'
RouteNumber  = require '../departure/route-number'
moment = require 'moment'

intl = require 'react-intl'
FormattedMessage = intl.FormattedMessage

class AirportCheckInLeg extends React.Component

  render: ->
    <div key={@props.index} style={{width: "100%"}} className="row itinerary-row">
      <div className="small-2 columns itinerary-time-column">
        <div className="itinerary-time-column-time">
          {moment(@props.leg.startTime).format('HH:mm')}
        </div>
        <RouteNumber mode={@props.leg.mode.toLowerCase()} vertical={true}/>
      </div>
      <div className={"small-10 columns itinerary-instruction-column " + @props.leg.mode.toLowerCase()}>
        <div><FormattedMessage
            id='airport-check-in'
            values={{
                agency: @props.leg.nextLeg.agencyName}}
            defaultMessage='Check in your luggage with {agency}' />
        </div>
        <div><FormattedMessage
            id='airport-security-check'
            defaultMessage='Walk through the security check' />
        </div>
        <div><FormattedMessage
            id='airport-go-to-gate'
            defaultMessage='Go to gate' />
        </div>
      </div>
    </div>

module.exports = AirportCheckInLeg
