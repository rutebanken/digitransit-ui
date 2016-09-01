import React, { Component, PropTypes } from 'react';
import Icon from '../icon/icon';
import config from '../../config';
import connectToStores from 'fluxible-addons-react/connectToStores';

class InformationBar extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    currentLanguage: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.messages = config.aboutThisService;
    this.state = {
      visible: true,
    };
  }

  render = () =>
    <div className="information-bar">
      <Icon id="information-bar-close-icon" img="icon-icon_close" />
      <p>{this.messages[this.props.currentLanguage].about}</p>
      <p>{this.messages[this.props.currentLanguage].cookies}</p>
    </div>

}
export default connectToStores(InformationBar, ['PreferencesStore'], (context) => ({
  currentLanguage: context.getStore('PreferencesStore').getLanguage(),
}));
