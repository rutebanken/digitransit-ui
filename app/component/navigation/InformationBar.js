import React, { Component } from 'react';
import Icon from '../icon/icon';

class InformationBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  render = () =>
    <div className="information-bar">
      <Icon id="information-bar-close-icon" img="icon-icon_close" />

    </div>

}

export default InformationBar;
