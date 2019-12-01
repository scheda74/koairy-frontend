import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import BremickerLineChart from '../../../components/Charts/BremickerLineChart';
import HawaDawaLineChart from '../../../components/Charts/HawaDawaLineChart';
import bremickerBoxes from '../../../assets/data/bremickerBoxes';

const useStyles = makeStyles(() => ({
  chartContainer: {
    display: 'flex',
    // flexDirection: 'column'
    justifyContent: 'space-around'
  }
}));

export default function Analysis(props) {
  // state = {
  //   data: [
  //     {name: 'NOx', value: 0},
  //     {name: 'PMx', value: 0},
  //     {name: 'CO', value: 0}
  //   ]
  // };
  const classes = useStyles();

  const airData = () => {
    console.log(props.sensors)
    let sensorData =  props.sensors[bremickerBoxes[props.selectedBox]['airSensor']]['values']
    let result = Object.keys(sensorData).map(key => {
      return {
        date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
        pm10: sensorData[key]['pm10'],
        no2: sensorData[key]['no2']
      }
    })
    console.log(result);
    return result
  };

  return (
    <div className={classes.chartContainer}>
      <Typography align='center' variant='caption'>Vehicles per hour</Typography>
      <BremickerLineChart
        data={
          Object.keys(props.traffic[props.selectedBox]).map(key => {
            return {
              date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
              value: props.traffic[props.selectedBox][key]
            }
          })
        }
      />
      <Typography align='center' variant='caption'>Current Air Pollution</Typography>
      <HawaDawaLineChart data={airData()} />
    </div>
  )
}