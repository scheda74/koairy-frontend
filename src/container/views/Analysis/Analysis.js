import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import BremickerLineChart from '../../../components/Charts/BremickerLineChart';
import HawaDawaLineChart from '../../../components/Charts/HawaDawaLineChart';
import bremickerBoxes from '../../../assets/data/bremickerBoxes';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

export default function Analysis(props) {
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
    <div className={classes.container}>
      <div className={classes.chartContainer}>
        <Typography align='center' variant='caption'>Vehicles per hour</Typography>
        <BremickerLineChart
          data={
            Object.keys(props.traffic[props.selectedBox]).map(key => {
              return {
                date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
                vehicles: props.traffic[props.selectedBox][key] || 0
              }
            })
          }
        />
      </div>
      <div className={classes.chartContainer}>
        <Typography align='center' variant='caption'>Current Air Pollution</Typography>
        <HawaDawaLineChart data={airData()} />
      </div>
    </div>

  )
}