import React from 'react';
import Relay from 'react-relay';
import ViewerRoute from '../../../route/ViewerRoute';
import config from '../../../config';
import ParkAndRideMarker from './ParkAndRideMarker';
import ComponentUsageExample from '../../ComponentUsageExample';

const ParkAndRideMarkerWrapper = Relay.createContainer((({ alerts }) => (
  <div>
    {alerts && alerts.carParks.map(carPark => (
      <ParkAndRideMarker
        carPark={carPark}
        key={`carpark-${carPark.carParkId}`}
      />
    ))}
  </div>
)), {
  fragments: {
    alerts: () => Relay.QL`
      fragment on QueryType {
          carParks {
            id
            carParkId
            name
            lat
            lon
          }
      }
    `,
  },
});


class ParkAndRideMarkerContainer extends React.Component {
  static description = (
    <div>
      <p>Renders all park-and-ride if zoom is over configured value.</p>
      <ComponentUsageExample description="">
        <ParkAndRideMarkerContainer />
      </ComponentUsageExample>
    </div>
  );

  static contextTypes = {
    map: React.PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.context.map.on('zoomend', this.onMapZoom);
  }

  componentWillUnmount() {
    this.context.map.off('zoomend', this.onMapZoom);
  }

  onMapZoom = () => this.forceUpdate();

  render() {
    if (this.context.map.getZoom() < config.parkAndRide.parkAndRideMinZoom) {
      return false;
    }
    return (
      <Relay.Renderer
        Container={ParkAndRideMarkerWrapper}
        queryConfig={new ViewerRoute()}
        environment={Relay.Store}
      />
    );
  }
}

export default ParkAndRideMarkerContainer;
