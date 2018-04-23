import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { MarkerComponent } from '../events/MapMarker/MapMarker';

class MapComponent extends Component {
  render() {
    const { coordinates, address, loading } = this.props;

    if (loading) {
      return (
        <h2>Loading....</h2>
      );
    }
    return (
      <div style={{ height: 350, borderRadius: 20 }} >
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD2VmJLaKQpTdow188zsahY20a-bZ0pnAw' }}
          center={coordinates}
          defaultZoom={15}
        >
          <MarkerComponent
            lat={(coordinates ? coordinates.lat : 0)}
            lng={coordinates ? coordinates.lng : 0}
            text={address}
          />
        </GoogleMapReact>
      </div>

    );
  }
}

MapComponent.propTypes = {
  coordinates: PropTypes.object,
  address: PropTypes.string,
  loading: PropTypes.bool,
};

export default MapComponent;
