import React from 'react';
import Relay from 'react-relay';
import provideContext from 'fluxible-addons-react/provideContext';
import { intlShape } from 'react-intl';
import { routerShape, locationShape } from 'react-router';
import cx from 'classnames';

import { getDistanceToFurthestStop } from '../../../util/geo-utils';
import Icon from '../../Icon';
import StopMarkerPopup from '../popups/StopMarkerPopup';
import GenericMarker from '../GenericMarker';
import TerminalRoute from '../../../route/TerminalRoute';
import Loading from '../../Loading';

import { isBrowser } from '../../../util/browser';

let Circle;
let L;

/* eslint-disable global-require */
if (isBrowser) {
  Circle = require('react-leaflet/lib/Circle').default;
  L = require('leaflet');
}
/* eslint-enable global-require */

const StopMarkerPopupWithContext = provideContext(StopMarkerPopup, {
  intl: intlShape.isRequired,
  router: routerShape.isRequired,
  location: locationShape.isRequired,
  route: React.PropTypes.object.isRequired,
  config: React.PropTypes.object.isRequired,
});

class TerminalMarker extends React.Component {
  static contextTypes = {
    getStore: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired,
    router: routerShape.isRequired,
    location: locationShape.isRequired,
    route: React.PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    config: React.PropTypes.object.isRequired,
    map: React.PropTypes.object.isRequired,
  };

  static propTypes = {
    terminal: React.PropTypes.shape({
      lat: React.PropTypes.number.isRequired,
      lon: React.PropTypes.number.isRequired,
      gtfsId: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      stops: React.PropTypes.array,
    }).isRequired,
    mode: React.PropTypes.string.isRequired,
    selected: React.PropTypes.bool,
    renderName: React.PropTypes.string,
    fakeLargeIcon: React.PropTypes.bool,
  }

  getIcon = () =>
    L.divIcon({
      html: Icon.asString('icon-icon_mapMarker-station', 'terminal-medium-size'),
      iconSize: [24, 24],
      className: `${this.props.mode} cursor-pointer`,
    })

  // NRP-1214: show larger icons for terminal like stops
  getModeIcon = (zoom) => {
    const iconId = `icon-icon_${this.props.mode}`;
    const icon = Icon.asString(iconId, 'mode-icon');
    const size = this.getIconSize(zoom);

    return L.divIcon({
      html: icon,
      iconSize: [size, size],
      className: cx('cursor-pointer', this.props.mode, {
        small: size === this.context.config.stopsIconSize.small,
        selected: this.props.selected,
      }),
    });
  };

  getIconSize(zoom) {
    if (this.props.fakeLargeIcon) {
      return this.context.config.stopsIconSize.default;
    } else if (zoom <= this.context.config.stopsSmallMaxZoom) {
      return this.context.config.stopsIconSize.small;
    } else if (this.props.selected) {
      return this.context.config.stopsIconSize.selected;
    }
    return this.context.config.stopsIconSize.default;
  }

  getTerminalMarker() {
    return (
      <GenericMarker
        position={{
          lat: this.props.terminal.lat,
          lon: this.props.terminal.lon,
        }}
        getIcon={
           this.getModeIcon
        }
        id={this.props.terminal.gtfsId}
        renderName={this.props.renderName}
        name={this.props.terminal.name}
      >
        <Relay.RootContainer
          Component={StopMarkerPopup}
          route={new TerminalRoute({
            terminalId: this.props.terminal.gtfsId,
            date: this.context.getStore('TimeStore').getCurrentTime().format('YYYYMMDD'),
          })}
          renderLoading={() => (
            <div className="card" style={{ height: '12rem' }}><Loading /></div>
          )}
          renderFetched={data => (
            <StopMarkerPopupWithContext {...data} context={this.context} />
          )}
        />
      </GenericMarker>
    );
  }

  showCircle = () =>
    this.getIconSize(this.context.map.getZoom()) > this.context.config.stopsIconSize.small;

  render() {
    if (!isBrowser) {
      return '';
    }

    return (
      <div>
        <Circle
          center={{ lat: this.props.terminal.lat, lng: this.props.terminal.lon }}
          radius={getDistanceToFurthestStop(
            new L.LatLng(this.props.terminal.lat, this.props.terminal.lon),
            this.props.terminal.stops,
          ).distance}
          fillOpacity={0.05}
          weight={1}
          opacity={0.3}
          className={this.props.mode}
          fillColor="currentColor"
          color="currentColor"
        />
        {this.getTerminalMarker()}
      </div>
    );
  }
}

export default TerminalMarker;
