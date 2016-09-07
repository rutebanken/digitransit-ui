import React from 'react';
import Icon from '../icon/icon';
import { aboutThisService } from '../../config';

function SiteInformation(props) {
  let messages;
  if (!aboutThisService[props.currentLanguage]) {
    messages = aboutThisService[aboutThisService.defaultLanguage];
  } else {
    messages = aboutThisService[props.currentLanguage];
  }

  let cookieInfo;
  if (props.showCookieInfo) {
    cookieInfo = <p>{messages.cookies}</p>;
  } else {
    cookieInfo = null;
  }

  let dataSourceInfo;
  if (props.showDataSourceInfo) {
    dataSourceInfo = <p>{messages.dataSourceInfo}</p>;
  } else {
    dataSourceInfo = null;
  }

  let aboutProject;
  if (props.showDataSourceInfo) {
    aboutProject = (<p>{messages.aboutProject}
      <a href={messages.aboutProjectLink}> {messages.aboutProjectLink}</a>
    </p>);
  } else {
    aboutProject = null;
  }


  return (<div className="site-information" >
    <Icon id="site-information-close-icon" img="icon-icon_close" />
    <div className="information-body">
      <p>{messages.intro}
        <span className="bold"> {messages.siteName}</span>
      </p>
      <p>{messages.about}</p>
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
};

export default SiteInformation;
