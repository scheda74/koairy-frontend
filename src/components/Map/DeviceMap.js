import React from 'react';
import { connect } from 'react-redux';
import { Map, Polygon, Popup, TileLayer } from 'react-leaflet';
import HeatMap from 'react-leaflet-heatmap-layer';
import { CircularProgress, Typography } from '@material-ui/core';

import './DeviceMap.css';
import bremickerBoxes from '../../assets/data/bremickerBoxes'
import { withRouter } from 'react-router';
import Overlay from './Overlay/Overlay'

export class DeviceMap extends React.Component {
  state = {
    lat: 48.175189,
    lng: 11.755558,
    zoom: 14,
    showHeatMap: false,
    isAir: false,
    blur: 20,
    opacity: 0.2,
    radius: 15,
    maximum: 300,
    polyOptions: {
      672: {opacity: 0.2, color: 'rgba(83, 141, 26, 1)', isActive: false},
      671: {opacity: 0.2, color: 'rgba(83, 141, 26, 1)', isActive: false},
      670: {opacity: 0.2, color: 'rgba(83, 141, 26, 1)', isActive: false},
      384: {opacity: 0.2, color: 'rgba(83, 141, 26, 1)', isActive: false}
    },
    gradient: {
      0.0: '#78bc6a',
      0.25: '#bbcf4c',
      0.5: '#edc20a',
      0.75: '#f29308',
      1.0: '#950019'
    },
    isTooltipActive: false
  };

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (this.isTrafficAvailable()) {
  //     this.handleTooltip()
  //   }
  // }
  //
  // handleTooltip() {
  //   this.setState({...this.state, isTooltipActive: true});
  //   setTimeout(() => this.setState({...this.state, isTooltipActive: false}), 5000)
  // }

  toggleHeatMap() {
    this.setState({ showHeatMap: !this.state.showHeatMap })
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
                      <Typography>Current Air Quality Index: { this.props.sensors[bremickerBox['airSensor']] && (this.props.sensors[bremickerBox['airSensor']]['aqi'] || 'Not defined')}</Typography>
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

    const renderHeatMap = () => {
      let max = 1;
      if (this.isTrafficAvailable()) {
        max = Math.max(Object.values(this.props.simulatedTraffic).map(val => val.count));
      }
      return (
        <React.Fragment>
          {this.isTrafficAvailable() && this.state.showHeatMap && (
            <HeatMap
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={Object.values(this.props.simulatedTraffic).map(value => [value.lng, value.lat, value.count / max])}
              longitudeExtractor={m => m[0]}
              latitudeExtractor={m => m[1]}
              intensityExtractor={m => parseFloat(m[2])}
              blur={this.state.blur}
              radius={15}
              max={this.state.maximum}
              minOpacity={this.state.opacity}
              // maxZoom={}
              // gradient={this.state.gradient}
            />)
          }
          <Overlay
            isTrafficAvailable={this.isTrafficAvailable()}
            // isTooltipActive={this.state.isTooltipActive}
            toggleHeatMap={this.toggleHeatMap.bind(this)}
            showHeatMap={this.state.showHeatMap}
            blurChange={this.onBlurChange.bind(this)}
            radiusChange={this.onRadiusChange.bind(this)}
            opacityChange={this.onOpacityChange.bind(this)}
            maximumChange={this.onMaximumChange.bind(this)}
          />
        </React.Fragment>
        )
    };

    return (
      <div className="leaflet-container">
        <Map fadeAnimation={true} center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {renderHeatMap()}
          {!this.state.showHeatMap && sensorPolygons}
        </Map>
      </div>
    );
  }

  isTrafficAvailable = () => typeof this.props.simulatedTraffic !== "undefined";
}

const mapStateToProps = (state) => {
    return {
      simulatedTraffic: state.prediction.traffic,
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
