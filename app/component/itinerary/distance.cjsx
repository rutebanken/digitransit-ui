React = require 'react'

intl = require 'react-intl'
FormattedMessage = intl.FormattedMessage
FormattedRelative = intl.FormattedRelative

class Distance extends React.Component

  render: ->

    if @props.distance > 0
      console.log @props.distance
      approxDistance = Math.round(@props.distance/50)*50
      console.log approxDistance

      if approxDistance > 50
        <FormattedMessage
          id='approx-meters'
          values={{
            approxDistance: approxDistance}}
          defaultMessage='About {approxDistance} meters' />
      else
        <FormattedMessage
          id='less-than-meters'
          values={{
            threshold: 50}}
          defaultMessage='Less than {threshold} meters' />

module.exports = Distance
