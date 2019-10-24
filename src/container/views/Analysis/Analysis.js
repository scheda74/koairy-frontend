import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import connect from 'react-redux/es/connect/connect';
import { DeviceMap } from '../../../components/Map/DeviceMap';

const useStyles = makeStyles(() => ({
  analysisContainer: {
    width: '100vw'
  }
}));

class Analysis extends Component {
  state = {
    data: [
      {name: 'NOx', value: 0},
      {name: 'PMx', value: 0},
      {name: 'CO', value: 0}
    ]
  };

  componentDidMount() {
    this.initializeData();
  }

  initializeData() {
    if (!this.props.emissions) return this.state.data;
    const maxNOx = Math.max(...Object.values(this.props.emissions).map(value => value.NOx));
    const maxPMx = Math.max(...Object.values(this.props.emissions).map(value => value.PMx));
    const maxCO = Math.max(...Object.values(this.props.emissions).map(value => value.CO));
    this.setState({data: [
        {name: 'NOx', value: maxNOx},
        {name: 'PMx', value: maxPMx},
        {name: 'CO', value: maxCO}
      ]});
    console.log("lol");
    console.log(this.state.data);
  }

  render() {
    return (
      <div style={{width: '100vw'}}>
        {this.props.emissions !== undefined ?
          <BarChart
            width={730}
            height={250}
            data={this.state.data}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="NOx" fill="#9c27b0"/>
            <Bar dataKey="PMx" fill="#e91e63"/>
            <Bar dataKey="CO" fill="#673ab7"/>
          </BarChart> : <React.Fragment />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    emissions: state.emissions.data,
    traffic: state.traffic.data
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analysis);