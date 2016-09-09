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
    locationState: React.PropTypes.object.isRequired,
  };

  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.messages = config.aboutThisService;
  }

  close = () => {
    this.context.executeAction(UserPreferencesActions.closeFirstTimeMessage);
  }

  render = () => {
    if (this.props.showFirstTimeMessage && !this.props.locationState.isLocationingInProgress) {
      return (<div className="information-bar" onClick={this.close}>
        <SiteInformation
          currentLanguage={this.props.currentLanguage}
          showAboutShort
          showAboutService={false}
          showCookieInfo={false}
          showDataSourceInfo={false}
          showAboutProject={false}
        />
      </div>);
    }
    return (null);
  };

}
export default connectToStores(InformationBar, [PreferencesStore, PositionStore], (context) => ({
  currentLanguage: context.getStore(PreferencesStore).getLanguage(),
  showFirstTimeMessage: context.getStore(PreferencesStore).getShowFirstTimeMessage(),
  locationState: context.getStore(PositionStore).getLocationState(),
}));
