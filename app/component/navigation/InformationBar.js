import React, { Component } from 'react';
import Icon from '../icon/icon';
import config from '../../config';
import connectToStores from 'fluxible-addons-react/connectToStores';

class InformationBar extends Component {

  static propTypes = {
    currentLanguage: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.messages = config.aboutThisService;
    this.state = {
      visible: true,
    };
  }

  close = () => {
    this.setState({ visible: false });
  }

  render = () => {
    if (this.state.visible) {
      return (<div className="information-bar" onClick={() => this.close()} >
        <Icon id="information-bar-close-icon" img="icon-icon_close" />
        <p>{this.messages[this.props.currentLanguage].about}</p>
        <p>{this.messages[this.props.currentLanguage].cookies}</p>
      </div>);
    }

    return (null);
  };

}
export default connectToStores(InformationBar, ['PreferencesStore'], (context) => ({
  currentLanguage: context.getStore('PreferencesStore').getLanguage(),
}));
