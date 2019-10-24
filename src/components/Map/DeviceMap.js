import React, { PureComponent } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import HeatMap from 'react-leaflet-heatmap-layer';
import './DeviceMap.css';
import Overlay from './Overlay/Overlay';


export class DeviceMap extends PureComponent {
  state = {
    lat: 48.169071,
    lng: 11.756942,
    zoom: 15,
    isTraffic: false,
    isAir: false,
    blur: 4,
    opacity: 0.2,
    radius: 10,
    maximum: 1
  };

  isEmissionAvailable() {
    return this.props.emissions !== null && this.props.emissions !== undefined;
  }

  isTrafficAvailable() {
    return this.props.traffic !== null && this.props.traffic !== undefined;
  }

  toggleTraffic() {
    this.setState({ isTraffic: !this.state.isTraffic })
  }

  toggleAir() {
    this.setState({ isAir: !this.state.isAir })
  }

  onBlurChange(value) {
    this.setState({ blur: value })
  }

  onRadiusChange(value) {
    this.setState({ radius: value })
  }

  onOpacityChange(value) {
    this.setState({ opacity: value })
  }

  onMaximumChange(value) {
    this.setState({ maximum: value / 100 })
  }

  render() {
    console.log("[MAP] render");
    const position = [this.state.lat, this.state.lng];

      const gradient = {
          0.0: '#78bc6a',
          0.25: '#bbcf4c',
          0.5: '#edc20a',
          0.75: '#f29308',
          1.0: '#950019'
      };
      // console.log(points);
      return (
        <div>
          <Overlay
            toggleTraffic={this.toggleTraffic.bind(this)}
            toggleAir={this.toggleAir.bind(this)}
            air={this.state.isAir}
            traffic={this.state.isTraffic}
            blurChange={this.onBlurChange.bind(this)}
            radiusChange={this.onRadiusChange.bind(this)}
            opacityChange={this.onOpacityChange.bind(this)}
            maximumChange={this.onMaximumChange.bind(this)}
          />
          <Map className="leaflet-container" center={position} zoom={this.state.zoom}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            {/*<Marker position={position}>*/}
            {/*<Popup>*/}
            {/*<span>A pretty CSS3 popup. <br/> Easily customizable.</span>*/}
            {/*</Popup>*/}
            {/*</Marker>*/}
            {this.isEmissionAvailable() && this.state.isAir ?
              <HeatMap
                // fitBoundsOnLoad
                // fitBoundsOnUpdate
                points={Object.values(this.props.emissions).map(value => [value.lng, value.lat, value.CAQI / 100])}
                longitudeExtractor={m => m[0]}
                latitudeExtractor={m => m[1]}
                intensityExtractor={m => parseFloat(m[2])}
                blur={this.state.blur}
                radius={this.state.radius}
                max={this.state.maximum}
                minOpacity={this.state.opacity}
                maxZoom={100}
                gradient={gradient}
              /> : <React.Fragment /> }
            {this.isTrafficAvailable() && this.state.isTraffic ?
              <HeatMap
                fitBoundsOnLoad
                fitBoundsOnUpdate
                points={Object.values(this.props.emissions).map(value => [value.lng, value.lat, value.CAQI / 100])}
                longitudeExtractor={m => m[0]}
                latitudeExtractor={m => m[1]}
                intensityExtractor={m => parseFloat(m[2])}
                blur={this.state.blur}
                radius={this.state.radius}
                max={this.state.maximum}
                minOpacity={this.state.opacity}
                maxZoom={100}
                gradient={gradient}
              /> : <React.Fragment /> }
          </Map>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
    return {
      emissions: state.emissions.data,
      traffic: state.traffic.data
    }
};

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceMap);

