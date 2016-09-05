import React, { Component } from 'react';
import Icon from '../icon/icon';
import config from '../../config';
import connectToStores from 'fluxible-addons-react/connectToStores';
import UserPreferencesActions from '../../action/user-preferences-actions';
import PreferencesStore from '../../store/preferences-store';

class InformationBar extends Component {

  static propTypes = {
    currentLanguage: React.PropTypes.string.isRequired,
    showFirstTimeMessage: React.PropTypes.bool.isRequired,
  };

  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.messages = config.aboutThisService;
  }

  close = () => {
    this.context.executeAction(UserPreferencesActions.setShowFirstTimeMessage, false);
  }

  render = () => {
    if (this.props.showFirstTimeMessage) {
      return (<div className="information-bar" onClick={() => this.close()} >
        <Icon id="information-bar-close-icon" img="icon-icon_close" />
        <div className="information-body">
          <p>{this.messages[this.props.currentLanguage].intro}
            <span className="bold"> {this.messages[this.props.currentLanguage].siteName}</span>
          </p>
          <p>{this.messages[this.props.currentLanguage].about}</p>

        </div>
      </div>);
    }

    return (null);
  };

}
export default connectToStores(InformationBar, [PreferencesStore], (context) => ({
  currentLanguage: context.getStore(PreferencesStore).getLanguage(),
  showFirstTimeMessage: context.getStore(PreferencesStore).getShowFirstTimeMessage(),
}));
