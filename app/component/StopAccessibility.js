import React from 'react';

import accessibilityUtils from '../util/accessibilityUtils';

class StopAccessibility extends React.Component {
  static displayName = 'StopAccessibility';

  static contextTypes = {
    config: React.PropTypes.object.isRequired,
  };

  static propTypes = {
    gtfsId: React.PropTypes.string.isRequired,
  };

  state = {
    response: undefined,
  };

  componentWillMount() {
    accessibilityUtils(this.props.gtfsId, this.context.config)
      .then(result => this.setState({ response: result }));
  }

  getIcons() {
    const wheelchairAccess = (access) => {
      return access && access.limitations && access.limitations.wheelchairAccess;
    };

    if (this.state.response) {
      if (wheelchairAccess(this.state.response.stopPlace[0].accessibilityAssessment)) {
        return '\u267f';
      }
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
