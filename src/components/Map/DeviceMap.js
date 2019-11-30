import React, { PureComponent } from 'react';
import { Map, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import './DeviceMap.css';
import bremickerBoxes from '../../assets/data/bremickerBoxes'
import { fetchCurrentBremicker } from '../../store/actions/trafficActions';
import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

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
      672: {opacity: 0.8, color: 'rgba(83, 141, 26, 1)'},
      671: {opacity: 0.8, color: '#ccc'},
      670: {opacity: 0.8, color: 'rgba(193, 78, 127, 1)'},
      384: {opacity: 0.8, color: 'rgba(83, 141, 26, 1)'}
    }
  };


  sensorMarkers = Object.keys(bremickerBoxes).map(key => {
    let sensor = bremickerBoxes[key];
    return (
      <Marker position={[sensor.lat, sensor.lng]}>
        <Popup>
          <span>Bremicker sensor in street <br/> Street</span>
        </Popup>
      </Marker>
    )
  })

  setPolyOpacity = (key, opacity) => {
    this.setState({
      ...this.state,
      polyOptions: {
        ...this.state.polyOptions,
        [key]: {...this.state.polyOptions[key], opacity: opacity}
      }
    })
    console.log(this.state.polyOptions)
  };

  onPolygonClickHandler = key => {
    this.setPolyOpacity(key, 0.8)
    this.props.fetchCurrentBremickerByKey(key)
  };


  render() {
    console.log("[MAP] render");
    const position = [this.state.lat, this.state.lng];

    const sensorPolygons = Object.keys(bremickerBoxes).map(key => {
      let sensor = bremickerBoxes[key];
      let bremickerData = this.props.traffic && this.props.traffic[key];
      console.log(this.state.polyOptions[key].opacity)
      return (
        <Polygon className={'leaflet-fade'}
                 key={key}
                 lineCap='round'
                 lineJoin='round'
                 positions={sensor.polyList}
                 interactive={true}
                 fillColor={this.state.polyOptions[key].color}
                 stroke={false}
                 fillOpacity={this.state.polyOptions[key].opacity}
                 // onMouseOver={() => this.setPolyOpacity(key, 0.8)}
                 // onMouseOut={() => this.setPolyOpacity(key, 0.0)}
                 onClick={() => this.onPolygonClickHandler(key)}
        >
          <Popup>
            {this.props.traffic && this.props.traffic[key] ?
              (
                <div>
                  <Typography>Bremicker Box ID: {key}</Typography>
                  <Typography>Data fetched on: {Object.keys(this.props.traffic[key]).pop()}</Typography>
                  <Typography>Number of vehicles: {bremickerData[Object.keys(this.props.traffic[key]).pop()]}</Typography>
                </div>

              ) : (
                <CircularProgress />
              )
            }
          </Popup>
        </Polygon>
      )
    })

    return (
      <div className="leaflet-container">
        {/*<Overlay*/}
          {/*toggleTraffic={this.toggleTraffic.bind(this)}*/}
          {/*toggleAir={this.toggleAir.bind(this)}*/}
          {/*air={this.state.isAir}*/}
          {/*traffic={this.state.isTraffic}*/}
          {/*blurChange={this.onBlurChange.bind(this)}*/}
          {/*radiusChange={this.onRadiusChange.bind(this)}*/}
          {/*opacityChange={this.onOpacityChange.bind(this)}*/}
          {/*maximumChange={this.onMaximumChange.bind(this)}*/}
        {/*/>*/}
        <Map fadeAnimation={true} center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />

          {sensorPolygons}
          {/*{this.props.simulation.prediction !== undefined && this.state.isAir ?*/}
              {/*this.heatMap*/}
            {/*: <React.Fragment /> }*/}
          {/*{this.isEmissionAvailable() && this.state.isAir ?*/}
            {/*<HeatMap*/}
              {/*// fitBoundsOnLoad*/}
              {/*// fitBoundsOnUpdate*/}
              {/*points={Object.values(this.props.emissions).map(value => {*/}
                {/*// console.log(value);*/}
                {/*return [value['lng'], value['lat'], value['CAQI'] / 100]*/}
              {/*})}*/}
              {/*longitudeExtractor={m => m[0]}*/}
              {/*latitudeExtractor={m => m[1]}*/}
              {/*intensityExtractor={m => parseFloat(m[2])}*/}
              {/*blur={this.state.blur}*/}
              {/*radius={this.state.radius}*/}
              {/*max={this.state.maximum}*/}
              {/*minOpacity={this.state.opacity}*/}
              {/*maxZoom={100}*/}
              {/*gradient={gradient}*/}
            {/*/> : <React.Fragment /> }*/}
          {/*{this.isTrafficAvailable() && this.state.isTraffic ?*/}
            {/*<HeatMap*/}
              {/*fitBoundsOnLoad*/}
              {/*fitBoundsOnUpdate*/}
              {/*points={Object.values(this.props.emissions).map(value => [value.lng, value.lat, value.CAQI / 100])}*/}
              {/*longitudeExtractor={m => m[0]}*/}
              {/*latitudeExtractor={m => m[1]}*/}
              {/*intensityExtractor={m => parseFloat(m[2])}*/}
              {/*blur={this.state.blur}*/}
              {/*radius={this.state.radius}*/}
              {/*max={this.state.maximum}*/}
              {/*minOpacity={this.state.opacity}*/}
              {/*maxZoom={100}*/}
              {/*gradient={gradient}*/}
            {/*/> : <React.Fragment /> }*/}
        </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      emissions: state.emissions.data,
      traffic: state.traffic,
      sensors: state.traffic.sensors,
      simulation: state.simulation
    }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentBremickerByKey: (key) => dispatch(fetchCurrentBremicker(key)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceMap);

