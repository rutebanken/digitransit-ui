import React from 'react';
import Icon from '../icon/icon';
import { aboutThisService } from '../../config';

function SiteInformation(props) {
  // TODO avoid reusing this. Use separate components.
  let messages;
  if (!aboutThisService[props.currentLanguage]) {
    messages = aboutThisService[aboutThisService.defaultLanguage];
  } else {
    messages = aboutThisService[props.currentLanguage];
  }

  let cookieInfo;
  if (props.showCookieInfo) {
    cookieInfo = (
      <div>
        <h2>{messages.cookiesHeader}</h2>
        <p>{messages.cookies}</p>
      </div>);
  } else {
    cookieInfo = null;
  }

  let dataSourceInfo;
  if (props.showDataSourceInfo) {
    dataSourceInfo = <p>{messages.dataSources}</p>;
  } else {
    dataSourceInfo = null;
  }

  let aboutProject;
  if (props.showAboutProject) {
    aboutProject = (<p>{messages.aboutProject}
      <a href={messages.aboutProjectLink}> {messages.aboutProjectLink}</a>
    </p>);
  } else {
    aboutProject = null;
  }

  let aboutService;
  if (props.showAboutService) {
    aboutService = <p>{messages.about}</p>;
  } else {
    aboutService = null;
  }

  let aboutShort;
  if (props.showAboutShort) {
    aboutShort = <p>{messages.aboutShort}</p>;
  } else {
    aboutShort = null;
  }

  return (<div className="site-information" >
    <Icon id="site-information-close-icon" img="icon-icon_close" />
    <div className="information-body">
      <p>{messages.intro}
        <span className="bold"> {messages.siteName}</span>
      </p>
      {aboutShort}
      {aboutService}
      {dataSourceInfo}
      {cookieInfo}
      {aboutProject}
    </div>
  </div>);
}

SiteInformation.propTypes = {
  currentLanguage: React.PropTypes.string.isRequired,
  showCookieInfo: React.PropTypes.bool.isRequired,
  showDataSourceInfo: React.PropTypes.bool.isRequired,
  showAboutProject: React.PropTypes.bool.isRequired,
  showAboutService: React.PropTypes.bool.isRequired,
  showAboutShort: React.PropTypes.bool.isRequired,
};

export default SiteInformation;
