import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Map, Polygon, Popup, TileLayer } from 'react-leaflet';
import { CircularProgress, Typography } from '@material-ui/core';

import './DeviceMap.css';
import bremickerBoxes from '../../assets/data/bremickerBoxes'
import { withRouter } from 'react-router';

export class DeviceMap extends PureComponent {
  state = {
    lat: 48.175189,
    lng: 11.755558,
    zoom: 14,
    isTraffic: false,
    isAir: false,
    blur: 4,
    opacity: 0.2,
    radius: 10,
    maximum: 1,
    polyOptions: {
      672: {opacity: 0.2, color: 'rgba(83, 141, 26, 1)', isActive: false},
      671: {opacity: 0.2, color: 'rgba(83, 141, 26, 1)', isActive: false},
      670: {opacity: 0.2, color: 'rgba(83, 141, 26, 1)', isActive: false},
      384: {opacity: 0.2, color: 'rgba(83, 141, 26, 1)', isActive: false}
    }
  };

  hoverPolgygon = (key) => {
   if (!this.state.polyOptions[key].isActive) {
     this.setState({
       ...this.state,
       polyOptions: {
         ...this.state.polyOptions,
         [key]: {...this.state.polyOptions[key], opacity: Math.abs(1 - this.state.polyOptions[key].opacity)}
       }
     })
   }
  };

  togglePolygon = key => {
    this.setState({
      ...this.state,
      polyOptions: {
        ...this.state.polyOptions,
        [key]: {
          ...this.state.polyOptions[key],
          isActive: !this.state.polyOptions[key].isActive,
          opacity: this.state.polyOptions[key].isActive ? 0.2 : 0.8}
      }
    });
  };


  render() {
    const { history } = this.props;

    const onPolygonClickHandler = key => {
      this.togglePolygon(key);
      history.push('/detail/' + key);
    };

    const popupCloseHandler = key => {
      this.togglePolygon(key);
      history.push('/detail');
    };

    console.log("[MAP] render");
    const position = [this.state.lat, this.state.lng];

    const sensorPolygons = Object.keys(bremickerBoxes).map(key => {
      let bremickerBox = bremickerBoxes[key];
      let bremickerData = this.props.traffic && this.props.traffic[key];
      return (
        <Polygon
                 key={key}
                 lineCap='round'
                 lineJoin='round'
                 positions={bremickerBox.polyList}
                 interactive={true}
                 fillColor={this.state.polyOptions[key].color}
                 stroke={false}
                 fillOpacity={this.state.polyOptions[key].opacity}
                 onMouseOver={() => this.hoverPolgygon(key)}
                 onMouseOut={() => this.hoverPolgygon(key)}
                 onClick={() => onPolygonClickHandler(key)}
        >
          <Popup onClose={() => popupCloseHandler(key)}>
            {this.props.traffic && this.props.traffic[key] ?
              (
                <div>
                  <Typography>Bremicker Box ID: {key}</Typography>
                  <Typography>Data fetched on: {Object.keys(this.props.traffic[key]).pop()}</Typography>
                  <Typography>Number of vehicles: {bremickerData[Object.keys(this.props.traffic[key]).pop()] || 0}</Typography>
                  {this.props.sensors ? (
                      <Typography>Current Air Quality Index: { this.props.sensors[bremickerBox['airSensor']] && this.props.sensors[bremickerBox['airSensor']]['aqi'] || 'Not defined'}</Typography>
                  ) : (<React.Fragment />)}

                </div>
              ) : (
                this.props.traffic.didInvalidate ? (<Typography>Something went wrong</Typography>) : (<CircularProgress />)
              )
            }
          </Popup>
        </Polygon>
      )
    });

    return (
      <div className="leaflet-container">
        <Map fadeAnimation={true} center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {sensorPolygons}
        </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      traffic: state.traffic,
      sensors: state.air.sensors,
    }
};

export default withRouter(connect(
  mapStateToProps,
  {}
)(DeviceMap));


// {/*<Overlay*/}
// {/*toggleTraffic={this.toggleTraffic.bind(this)}*/}
// {/*toggleAir={this.toggleAir.bind(this)}*/}
// {/*air={this.state.isAir}*/}
// {/*traffic={this.state.isTraffic}*/}
// {/*blurChange={this.onBlurChange.bind(this)}*/}
// {/*radiusChange={this.onRadiusChange.bind(this)}*/}
// {/*opacityChange={this.onOpacityChange.bind(this)}*/}
// {/*maximumChange={this.onMaximumChange.bind(this)}*/}
// {/*/>*/}

// {/*{this.props.simulation.prediction !== undefined && this.state.isAir ?*/}
// {/*this.heatMap*/}
// {/*: <React.Fragment /> }*/}
// {/*{this.isEmissionAvailable() && this.state.isAir ?*/}
// {/*<HeatMap*/}
// {/*// fitBoundsOnLoad*/}
// {/*// fitBoundsOnUpdate*/}
// {/*points={Object.values(this.props.emissions).map(value => {*/}
// {/*// console.log(value);*/}
// {/*return [value['lng'], value['lat'], value['CAQI'] / 100]*/}
// {/*})}*/}
// {/*longitudeExtractor={m => m[0]}*/}
// {/*latitudeExtractor={m => m[1]}*/}
// {/*intensityExtractor={m => parseFloat(m[2])}*/}
// {/*blur={this.state.blur}*/}
// {/*radius={this.state.radius}*/}
// {/*max={this.state.maximum}*/}
// {/*minOpacity={this.state.opacity}*/}
// {/*maxZoom={100}*/}
// {/*gradient={gradient}*/}
// {/*/> : <React.Fragment /> }*/}
// {/*{this.isTrafficAvailable() && this.state.isTraffic ?*/}
// {/*<HeatMap*/}
// {/*fitBoundsOnLoad*/}
// {/*fitBoundsOnUpdate*/}
// {/*points={Object.values(this.props.emissions).map(value => [value.lng, value.lat, value.CAQI / 100])}*/}
// {/*longitudeExtractor={m => m[0]}*/}
// {/*latitudeExtractor={m => m[1]}*/}
// {/*intensityExtractor={m => parseFloat(m[2])}*/}
// {/*blur={this.state.blur}*/}
// {/*radius={this.state.radius}*/}
// {/*max={this.state.maximum}*/}
// {/*minOpacity={this.state.opacity}*/}
// {/*maxZoom={100}*/}
// {/*gradient={gradient}*/}
// {/*/> : <React.Fragment /> }*/}