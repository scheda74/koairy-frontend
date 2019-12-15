import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import connect from 'react-redux/es/connect/connect';
import BremickerLineChart from '../../../components/Charts/BremickerLineChart';
import Divider from '@material-ui/core/Divider';
import HawaDawaLineChart from '../../../components/Charts/HawaDawaLineChart';
import { useHistory, useParams } from 'react-router';
import bremickerBoxes from '../../../assets/data/bremickerBoxes';
import { airActions, predictionActions, trafficActions } from '../../../store/actions';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1rem',
    marginRight: '1rem'
  },
  buttonContainer: {
    display: 'flex',
    // [theme.breakpoints.down('md')]: {
    //   flexDirection: 'column',
    // },
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  button: {
    margin: '0.5rem 1rem'
  },
}));


function Detail(props) {
  const classes = useStyles();
  let { boxId } = useParams();
  let history = useHistory();
  const predictionUrl = boxId ? "/prediction/" + boxId : "/prediction";
  const settingsUrl = boxId ? "/settings/" + boxId : "/settings";

  useEffect(() => {
    if (boxId) {
      props.fetchCurrentAir();
      props.fetchCurrentBremickerByKey(boxId)
    }
  }, [boxId]);

  const airData = () => {
    // if (!props.air.sensors[bremickerBoxes[boxId]['airSensor']]) return [];
    let sensorData =  props.air.sensors[bremickerBoxes[boxId]['airSensor']]['values'];
    return Object.keys(sensorData).map(key => {
      return {
        date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
        pm10: sensorData[key]['pm10'],
        no2: sensorData[key]['no2']
      }
    });
  };

  const bremickerData = () => Object.keys(props.traffic[boxId]).map(key => {
      return {
        date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
        vehicles: props.traffic[boxId][key] || 0
      }
    });

  const bremickerChart = () => {
    if (props.traffic[boxId]) {
      console.log('bremicker data')
      console.log(bremickerData());
      return (
        <div key='traffic' className={classes.chartContainer}>
          <Typography align='center' variant='caption'>Vehicles per hour</Typography>
          <BremickerLineChart data={bremickerData()} />
        </div>
      )
    } else {
      return ( <CircularProgress style={{margin: '3rem'}} color="primary" /> )
    }
  };

  const airChart = () => {
    if (props.air.sensors && props.air.sensors[bremickerBoxes[boxId]['airSensor']]) {
      return (
        <div key='air' className={classes.chartContainer}>
          <Typography align='center' variant='caption'>Current Air Pollution</Typography>
          <HawaDawaLineChart data={airData()} />
        </div>
      )
    } else {
      return ( <CircularProgress style={{margin: '3rem'}} color="primary" /> )
    }
  };

  const handlePredictionStart = () => {
    if (boxId) {
      props.startSinglePrediction(props.params)
    } else {
      props.startPrediction(props.params)
    }
    history.push(predictionUrl);
  };

  return (
    <div className={classes.container}>
      {boxId ? (
        <React.Fragment>
          {bremickerChart()}
          <Divider />
          {airChart()}
        </React.Fragment>
        ) : (
        <Typography align='center' variant='h6'>Select an area marked in the map to get more details!</Typography>
      )}
      <div className={classes.buttonContainer}>
        <Button
          size='small'
          className={classes.button}
          color='secondary'
          variant='contained'
          onClick={() => history.push(settingsUrl)}>Adjust Prediction Settings
        </Button>
        <Button
          size='small'
          onClick={() => handlePredictionStart()}
          className={classes.button}
          color='primary'
          variant='contained'>Start Prediction Using Default!
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
    return {
      traffic: state.traffic,
      air: state.air,
      sensors: state.air.sensors,
      params: state.prediction
    }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentBremickerByKey: (key) => dispatch(trafficActions.fetchCurrentBremicker(key)),
    fetchCurrentAir: () => dispatch(airActions.fetchLatestAir()),
    startPrediction: (params) => dispatch(predictionActions.fetchPrediction(params)),
    startSinglePrediction: (params) => dispatch(predictionActions.fetchSinglePrediction(params)),
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);