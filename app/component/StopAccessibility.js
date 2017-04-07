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
      const quays = this.state.stopPlace.quays.filter(q => q.accessibilityAssessment !== null);
      const quay = quays.filter(q => q.id === gtfsId);
      let stop;
      if (quay.length > 0) {
        stop = quay.reduce(a => a);
      } else if (quays.length > 0) {
        stop = quays.reduce(this.quaysConjunction);
      } else {
        stop = this.state.stopPlace;
      }

      accessibilities.forEach((accessibility) => {
        icons.push(this.getIcon(stop, accessibility));
      });
    }
    return icons;
  }

  quaysConjunction = (a, b) => {
    const limit = (q, accessibility) => q.accessibilityAssessment.limitations[accessibility];
    const result = { };

    accessibilities.forEach((accessibility) => {
      const limitA = limit(a, accessibility);
      const limitB = limit(b, accessibility);
      if (limitA === limitB) {
        result[accessibility] = limitA;
      } else if (limitA === 'TRUE' || limitB === 'TRUE') {
        result[accessibility] = 'PARTIAL';
      }
    });
    return { accessibilityAssessment: { limitations: result } };
  };

  render() {
    return (
      <div className="stop-accessibility">
        {this.getIcons()}
      </div>
    );
  }
}

export default StopAccessibility;
