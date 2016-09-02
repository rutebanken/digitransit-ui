import React, { Component } from 'react';
import Icon from '../component/icon/icon';
import { aboutThisService } from '../config';
import connectToStores from 'fluxible-addons-react/connectToStores';
import PreferencesStore from '../store/preferences-store';
import InformationPageStore from '../store/InformationPageStore';

function InformationPage(props, context) {
  if (props.open) {
    return (
      <Modal
        open={props.open}
        title={
          <FormattedMessage id="disruption-info" defaultMessage="Disruption Info" />}
        toggleVisibility={() => context.executeAction(close)}
      >
        <div className="information-page">
          <Icon id="information-bar-close-icon" img="icon-icon_close" />
          <p>{aboutThisService[this.props.currentLanguage].about}</p>
          <p>{aboutThisService[this.props.currentLanguage].cookies}</p>
        </div>
      </Modal>);
  }
  return (null);
}

InformationPage.propTypes = {
  currentLanguage: React.PropTypes.string.isRequired
};

InformationPage.contextTypes = {
  executeAction: React.PropTypes.func.isRequired,
}

export default connectToStores(InformationPage, [PreferencesStore, InformationPageStore], (context) => ({
  currentLanguage: context.getStore(PreferencesStore).getLanguage(),
  open: context.getStore(InformationPageStore).isOpen,
}));
