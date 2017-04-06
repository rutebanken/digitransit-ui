import React from 'react';
import cx from 'classnames';

import accessibilityUtils, {
  getAccessibility,
  accessibilities,
  getAccessibilityIcon,
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

  getIcon = (stop, accessibility) => {
    const status = getAccessibility(stop, accessibility);
    if (status) {
      return (
        <span className={cx(status)}>{getAccessibilityIcon(accessibility)}</span>
      );
    }
    return null;
  };

  getIcons() {
    const icons = [];
    if (this.state.stopPlace) {
      const gtfsId = this.props.stop.gtfsId;
      const isQuay = gtfsId.indexOf('Quay') !== -1;
      const stop = (!isQuay) ? this.state.stopPlace :
        this.state.stopPlace.quays.filter(quay => quay.id === gtfsId).reduce(a => a);

      accessibilities.forEach((accessibility) => {
        icons.push(this.getIcon(stop, accessibility));
      });
        /*
        if (this.state.stopPlace.quays) {
          for (let j = 0; j < this.state.stopPlace.quays.length; j++) {
            if (hasAccessibility(this.state.stopPlace.quays[j], accessibility)) {
              return '\u267f';
            }
          }
        }
        */
    }
    return icons;
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
