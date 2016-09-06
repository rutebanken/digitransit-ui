import React, { Component } from 'react';
import config from '../../config';
import connectToStores from 'fluxible-addons-react/connectToStores';
import UserPreferencesActions from '../../action/user-preferences-actions';
import PreferencesStore from '../../store/preferences-store';
import PositionStore from '../../store/PositionStore';
import SiteInformation from '../information-page/SiteInformation';

class InformationBar extends Component {

  static propTypes = {
    currentLanguage: React.PropTypes.string.isRequired,
    showFirstTimeMessage: React.PropTypes.bool.isRequired,
    getLocationState: React.PropTypes.func.isRequired,
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
    if (this.props.showFirstTimeMessage && !this.props.getLocationState.isLocationingInProgress) {
      return (<div className="information-bar" onClick={this.close}>
        <SiteInformation
          currentLanguage={this.props.currentLanguage}
          showCookieInfo={false}
        />
      </div>);
    }
    return (null);
  };

}
export default connectToStores(InformationBar, [PreferencesStore], (context) => ({
  currentLanguage: context.getStore(PreferencesStore).getLanguage(),
  showFirstTimeMessage: context.getStore(PreferencesStore).getShowFirstTimeMessage(),
  getLocationState: context.getStore(PositionStore).getLocationState(),
}));
