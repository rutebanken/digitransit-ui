import React from 'react';

import accessibilityUtils, { accessibilities, hasAccessibility } from '../util/accessibilityUtils';

class StopAccessibility extends React.Component {
  static displayName = 'StopAccessibility';

  static contextTypes = {
    config: React.PropTypes.object.isRequired,
  };

  static propTypes = {
    gtfsId: React.PropTypes.string.isRequired,
  };

  state = {
    stopPlace: undefined,
  };

  componentWillMount() {
    accessibilityUtils(this.props.gtfsId, this.context.config)
      .then(result => this.setState({ stopPlace: result.stopPlace[0] }));
  }

  getIcons() {
    if (this.state.stopPlace) {
      return accessibilities.map((accessibility) => {
        if (hasAccessibility(this.state.stopPlace, accessibility)) {
          return '\u267f';
        }
        if (this.state.stopPlace.quays) {
          for (let j = 0; j < this.state.stopPlace.quays.length; j++) {
            if (hasAccessibility(this.state.stopPlace.quays[j], accessibility)) {
              return '\u267f';
            }
          }
        }
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
