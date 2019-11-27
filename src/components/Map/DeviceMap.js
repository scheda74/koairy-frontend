import React, { PureComponent } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import HeatMap from 'react-leaflet-heatmap-layer';
import './DeviceMap.css';
import Typography from '@material-ui/core/Typography';


export class DeviceMap extends PureComponent {
  state = {
    lat: 48.175189,
    lng: 11.755558,
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

  isPredictionAvailable() {
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
    // const sensorMarkers = this.props.sensors.map(sensor => {
    //   console.log(sensor);
    //   return (
    //     <Marker position={[sensor.lat, sensor.lng]}>
    //       <Popup>
    //       <span>Bremicker sensor in street <br/> Street</span>
    //       </Popup>
    //     </Marker>
    //   )
    // });

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
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={[48.159129, 11.755278]}>
            <Popup>
              <Typography>Heimstetten Residential</Typography>
              <Typography>142 Fahrzeuge/h</Typography>
            </Popup>
          </Marker>
          {this.props.sensors !== undefined ?
            this.props.sensors.map(sensor => {
              console.log(sensor);
              return (
                <Marker position={[sensor.lat, sensor.lng]}>
                  <Popup>
                    <span>Bremicker sensor in street <br/> Street</span>
                  </Popup>
                </Marker>
              )
            }) : <div />}
          {this.props.simulation.prediction !== undefined && this.state.isAir ?
            <HeatMap
              // fitBoundsOnLoad
              // fitBoundsOnUpdate
              points={
                [[48.175689, 11.765065, this.props.simulation.prediction.no2_predicted[0]],
                [48.158607, 11.754464, this.props.simulation.prediction.pm10_predicted[0]]]
              }
              longitudeExtractor={m => m[1]}
              latitudeExtractor={m => m[0]}
              intensityExtractor={m => parseFloat(m[2])}
              blur={this.state.blur}
              radius={this.state.radius}
              max={this.state.maximum}
              minOpacity={this.state.opacity}
              maxZoom={100}
              gradient={gradient} />
            : <React.Fragment /> }
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
      traffic: state.traffic.data,
      sensors: state.traffic.sensors,
      simulation: state.simulation
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

