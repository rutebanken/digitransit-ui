import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import PreferencesStore from '../../store/preferences-store';
import InformationPageStore from '../../store/InformationPageStore';
import { closeInformationPage } from '../../action/InformationPageActions';
import SiteInformation from './SiteInformation';

function InformationPage(props, context) {
  if (props.open) {
    return (
      <div
        className="information-page"
        onClick={() => context.executeAction(closeInformationPage)}
      >
        <SiteInformation
          currentLanguage={props.currentLanguage}
          showAboutService
          showAboutShort={false}
          showCookieInfo
          showDataSourceInfo
          showAboutProject
        />
      </div>
      );
  }
  return (null);
}

InformationPage.propTypes = {
  currentLanguage: React.PropTypes.string.isRequired,
  open: React.PropTypes.bool.isRequired,
};

InformationPage.contextTypes = {
  executeAction: React.PropTypes.func.isRequired,
};

export default connectToStores(InformationPage,
    [PreferencesStore, InformationPageStore], (context) => ({
      currentLanguage: context.getStore(PreferencesStore).getLanguage(),
      open: context.getStore(InformationPageStore).isOpen,
    })
);
