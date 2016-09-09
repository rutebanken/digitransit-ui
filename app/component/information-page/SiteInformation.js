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
        <h3>{messages.cookiesHeader}</h3>
        <p>{messages.cookies}</p>
      </div>);
  } else {
    cookieInfo = null;
  }

  let dataSourceInfo;
  if (props.showDataSourceInfo) {
    dataSourceInfo = (<div>
      <h3>{messages.dataSourcesHeader}</h3>
      <p>{messages.dataSources}</p>
    </div>);
  } else {
    dataSourceInfo = null;
  }

  let aboutProject;
  if (props.showAboutProject) {
    aboutProject = (<div>
      <h3>{messages.aboutProjectHeader}</h3>
      <p>{messages.aboutProject}
        <a href={messages.aboutProjectLink}> {messages.aboutProjectLink}</a>
      </p>
    </div>);
  } else {
    aboutProject = null;
  }

  let aboutService;
  if (props.showAboutService) {
    aboutService = (<div>
      <h3>{messages.aboutHeader}</h3>
      <p>{messages.about}</p>
    </div>);
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
