import React, { PureComponent } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import HeatMap from 'react-leaflet-heatmap-layer';
// import { heatMapPoints } from '../../assets/data/scen_heat_map';
import './DeviceMap.css';
// import { emissionPoints } from '../../assets/data/emission_cycle'
// import { caqiData } from '../../assets/data/caqi_data';
import { caqiData } from '../../assets/data/newCaqiData';
// import caqiData from '../../assets/data/caqiDataJson';

export class DeviceMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lat: 48.169071,
      lng: 11.756942,
      zoom: 15,
      points: props.points
    };
  }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
      console.log("[MAP] shouldComponentUpdate");
      return false;
    }

  render() {
    console.log("[MAP] render");
    const position = [this.state.lat, this.state.lng];
    // const points = heatMapPoints.Map(elem => {
    //     console.log(elem['value'] * 10000);
    //     return [elem['lng'], elem['lat'], elem['value'] * 10000]
    // });
    // console.log(emissionPoints);
    // let points = [];
    // for ( let key in caqiData ) {
    //   // console.log(key);
    //   points.push([caqiData[key]['lng'], caqiData[key]['lat'], caqiData[key]['CAQI'] / 100])
    // }
    //   console.log(points);

      const gradient = {
          0.0: '#78bc6a',
          0.25: '#bbcf4c',
          0.5: '#edc20a',
          0.75: '#f29308',
          1.0: '#950019'
      };
      // console.log(points);
      return (
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
              <HeatMap
                  points={this.state.points}
                  longitudeExtractor={m => m[0]}
                  latitudeExtractor={m => m[1]}
                  intensityExtractor={m => parseFloat(m[2])}
                  blur={4}
                  radius={10}
                  max={1}
                  maxZoom={100}
                  minOpacity={0.2}
                  gradient={gradient}
              />
          </Map>
      );
    }
}
export default DeviceMap;

