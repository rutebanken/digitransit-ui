import React from 'react';
import mapProps from 'recompose/mapProps';
import { FormattedMessage } from 'react-intl';

import Availability from '../../Availability';
import ComponentUsageExample from '../../ComponentUsageExample';

const maxCapacityCalc = (maxCapacity, config) => {
  if (isNaN(maxCapacity)) {
    return 0;
  }
  const maxCapcityThreshold = (config.parkAndRide.maxCapacityThreshold) ?
    config.parkAndRide.maxCapacityThreshold : (2 ** 31) - 1;
  if (maxCapacity >= maxCapcityThreshold) {
    return <FormattedMessage id="park-and-ride-unknown" defaultMessage="Unknown capacity" />;
  }
  return maxCapacity;
};

const ParkAndRideAvailability = mapProps(({ realtime, maxCapacity, spacesAvailable, config }) => ({
  available: realtime ? spacesAvailable : 0,
  total: maxCapacity,
  fewAvailableCount: maxCapacity * 0.2,
  text: (
    <p className="sub-header-h4 availability-header">
      <FormattedMessage id="park-and-ride-availability" defaultMessage="Spaces available" />
      {'\u00a0'}
      ({!realtime || isNaN(spacesAvailable) ? '?' : spacesAvailable}/
      {maxCapacityCalc(maxCapacity, config)})
    </p>
  ),
}))(Availability);

ParkAndRideAvailability.displayName = 'ParkAndRideAvailability';

ParkAndRideAvailability.description = (
  <div>
    <p>Renders information about park and ride availability</p>
    <ComponentUsageExample description="non-realtime">
      <ParkAndRideAvailability spacesAvailable={1} maxCapacity={3} />
    </ComponentUsageExample>
    <ComponentUsageExample description="realtime">
      <ParkAndRideAvailability realtime spacesAvailable={1} maxCapacity={3} />
    </ComponentUsageExample>
  </div>
);

ParkAndRideAvailability.propTypes = {
  realtime: React.PropTypes.bool,
  maxCapacity: React.PropTypes.number.isRequired,
  spacesAvailable: React.PropTypes.number.isRequired,
  config: React.PropTypes.object.isRequired,
};

export default ParkAndRideAvailability;
