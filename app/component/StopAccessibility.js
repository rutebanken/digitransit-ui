import React from 'react';

import accessibilityUtils, {
  hasAccessibility,
  accessibilities,
  accessibilityIcons,
} from '../util/accessibilityUtils';

class StopAccessibility extends React.Component {
  static displayName = 'StopAccessibility';

  static contextTypes = {
    config: React.PropTypes.object.isRequired,
  };

  static propTypes = {
    stop: React.PropTypes.shape({
      gtfsId: React.PropTypes.string.isRequired,
      parentStation: React.PropTypes.shape({
        gtfsId: React.PropTypes.string,
      }).isRequired,
    }).isRequired,
  };

  state = {
    stopPlace: undefined,
  };

  componentWillMount() {
    const gtfsId = this.props.stop.parentStation ?
      this.props.stop.parentStation.gtfsId : this.props.stop.gtfsId;
    accessibilityUtils(gtfsId, this.context.config)
      .then(result => this.setState({ stopPlace: result.stopPlace[0] }));
  }

  getIcons() {
    if (this.state.stopPlace) {
      if (this.props.stop.gtfsId.indexOf('Quay') !== -1) {
        return accessibilities.map((accessibility) => {
          for (let j = 0; j < this.state.stopPlace.quays.length; j++) {
            const quay = this.state.stopPlace.quays[j];
            if (quay.id === this.props.stop.gtfsId) {
              if (hasAccessibility(quay, accessibility)) {
                if (accessibility in accessibilityIcons) {
                  return accessibilityIcons[accessibility];
                }
              }
            }
          }
          return null;
        });
      }

      return accessibilities.map((accessibility) => {
        if (hasAccessibility(this.state.stopPlace, accessibility)) {
          if (accessibility in accessibilityIcons) {
            return accessibilityIcons[accessibility];
          }
          return '\u267f';
        }
        /*
        if (this.state.stopPlace.quays) {
          for (let j = 0; j < this.state.stopPlace.quays.length; j++) {
            if (hasAccessibility(this.state.stopPlace.quays[j], accessibility)) {
              return '\u267f';
            }
          }
        }
        */
        return null;
      });
    }
    return null;
  }

  render() {
    return (
      <div className="stop-accessibility">
        {this.getIcons()}
      </div>
    );
  }
}

export default StopAccessibility;
