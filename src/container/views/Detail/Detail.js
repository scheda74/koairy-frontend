import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import connect from 'react-redux/es/connect/connect';
import { CircularProgress, makeStyles, Typography, Divider, Button } from '@material-ui/core';
import bremickerBoxes from '../../../assets/data/bremickerBoxes';
import BremickerLineChart from '../../../components/Charts/BremickerLineChart';
import HawaDawaLineChart from '../../../components/Charts/HawaDawaLineChart';
import { airActions, predictionActions, trafficActions } from '../../../store/actions';
import { WarningButton } from '../../../styles/customComponents';


const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    [theme.breakpoints.down('sm')]: {
      overflow: 'hidden scroll',
    },
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1rem',
    marginRight: '1rem',
    width: '100%'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '0.5rem 0',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    },
  },
  button: {
    margin: '0.5rem 1rem',
    width: '128px',
    height: '70px'
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
          <Typography variant='body1' align='center'>
            You have selected an area. You can now start its simulation and prediction or adjust settings...
          </Typography>
          {bremickerChart()}
          <Divider />
          {airChart()}
        </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography variant='h5' align='center'>You can now start a full city simulation and prediction...</Typography>

          </React.Fragment>
        )
      }
      <div className={classes.buttonContainer}>
        {boxId && (
          <WarningButton
            size='small'
            className={classes.button}
            // color='warning'
            variant='contained'
            onClick={() => history.push('/detail')}>Cancel
          </WarningButton>
        )}
        <Button
          size='small'
          className={classes.button}
          color='secondary'
          variant='contained'
          onClick={() => history.push(settingsUrl)}>Adjust {boxId ? 'Single' : ''} Prediction Settings
        </Button>
        <Button
          size='small'
          onClick={() => handlePredictionStart()}
          className={classes.button}
          color='primary'
          variant='contained'>Start {boxId ? 'A Single' : ''} Prediction Using Default
        </Button>
      </div>
      {!boxId && (<Typography align='center' variant='h6'>... or select an area marked in the map to get more details!</Typography>)}
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