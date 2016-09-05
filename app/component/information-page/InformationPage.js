import React from 'react';
import Icon from '../icon/icon';
import { aboutThisService } from '../../config';
import connectToStores from 'fluxible-addons-react/connectToStores';
import PreferencesStore from '../../store/preferences-store';
import InformationPageStore from '../../store/InformationPageStore';
import { closeInformationPage } from '../../action/InformationPageActions';

import FormattedMessage from 'react-intl';

function InformationPage(props, context) {
  if (props.open) {
    return (
      <div
        className="information-page"
        onClick={() => context.executeAction(closeInformationPage)}
      >
        <Icon id="information-page-close-icon" img="icon-icon_close" />
        <p>{aboutThisService[props.currentLanguage].about}</p>
        <p>{aboutThisService[props.currentLanguage].cookies}</p>
      </div>);
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
