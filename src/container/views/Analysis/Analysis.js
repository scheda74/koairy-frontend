import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import BremickerLineChart from '../../../components/Charts/BremickerLineChart';
import HawaDawaLineChart from '../../../components/Charts/HawaDawaLineChart';
import bremickerBoxes from '../../../assets/data/bremickerBoxes';
import PredictionChart from '../../../components/Charts/PredictionChart';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // [theme.breakpoints.down('md')]: {
    //   flexDirection: 'column',
    // },
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
    marginRight: '1rem'
  }
}));

export default function Analysis(props) {
  const classes = useStyles();

  const airData = () => {
    if (!props.sensors) return []
    let sensorData =  props.sensors[bremickerBoxes[props.boxID]['airSensor']]['values'];
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

  const bremickerData = () => {
    if (!props.traffic) return [];
    Object.keys(props.traffic[props.boxID]).map(key => {
    return {
      date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
      vehicles: props.traffic[props.boxID][key] || 0
    }
  })};

  return (
    <div className={classes.container}>
      {props.isFetching ? (
        <CircularProgress color='primary' />
      ) : (
        props.prediction ? (
          <React.Fragment>
            {/*<div className={classes.chartContainer}>*/}
            {/*<Typography align='center' variant='caption'>Simulated and Predicted NOx/NO2</Typography>*/}
            {/*<PredictionChart*/}
            {/*data={*/}
            {/*Object.keys(props.prediction).map(key => {*/}
            {/*return {*/}
            {/*date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),*/}
            {/*NOx: props.prediction[key]['NOx'] || 0,*/}
            {/*NO2_predicted: props.prediction[key]['no2_predicted'] || 0,*/}
            {/*}*/}
            {/*})*/}
            {/*}*/}
            {/*/>*/}
            {/*</div>*/}
            <div className={classes.chartContainer}>
              <Typography align='center' variant='caption'>Simulated and Predicted NOx/NO2</Typography>
              <PredictionChart
                data={
                  Object.keys(props.prediction).map(key => {
                    return {
                      date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
                      PM10_real: props.prediction[key]['pm10'] || 0,
                      PM10_predicted: props.prediction[key]['pm10_predicted'] || 0,
                      PM10_simulated: props.prediction[key]['pm10_simulated'] || 0,
                    }
                  })
                }
              />
            </div>
          </React.Fragment>
        ) : (
          props.traffic && props.sensors ? (
            <CircularProgress />
            ) : (
            <React.Fragment>
              <div className={classes.chartContainer}>
                <Typography align='center' variant='caption'>Vehicles per hour</Typography>
                <BremickerLineChart data={bremickerData()} />
              </div>
              <Divider />
              <div className={classes.chartContainer}>
                <Typography align='center' variant='caption'>Current Air Pollution</Typography>
                <HawaDawaLineChart data={airData()} />
              </div>
            </React.Fragment>
            )

        )
      )}
    </div>

  )
}