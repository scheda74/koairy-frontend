import { CircularProgress, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { predictionActions } from '../../store/actions';
import connect from 'react-redux/es/connect/connect';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import bremickerBoxes from '../../assets/data/bremickerBoxes';
import Analysis from '../OldStuff/Analysis/Analysis';
import SingleSettings from '../OldStuff/SingleSettings/SingleSettings';

const useStyles = makeStyles((theme) => ({
  introductionContainer: {
    // display: 'flex',
    // justifyContent: 'space-between'
    flexBasis: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    // margin: '0.5rem auto',
  },
  icon: {
    margin: 'auto',
    height: '180px',
    width: '180px',
    // color: 'white'
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
  introduction: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 'auto'
  },
  settingsContainer: {
    flexBasis: '40%',
    display: 'flex',
    justifyContent: 'start',
    margin: '0.5rem auto',
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
    marginRight: '1.5rem'

  }
}));

function BoxArea(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    isActive: false
  });

  useEffect(function() {
    console.log('[BoxArea] should rerender? selectedBox now: ' + props.boxID);
    setState({...state, isActive: false})
  }, [props.boxID]);

  const toggleSettings = () => {
    setState({...state, isActive: !state.isActive})
  };

  return (
    <div className={classes.introduction}>
      <Typography variant="h6" align='center'>You have selected Bremicker Box {props.boxID}</Typography>
      {state.isActive ? (
        <div className={classes.settingsContainer}>
          <SingleSettings boxID={props.selectedBox}/>
        </div>
      ) : (
        props.traffic && props.traffic[props.boxID] && props.sensors && props.sensors[bremickerBoxes[props.boxID]['airSensor']] ? (
          <Analysis isFetching={props.isFetching} prediction={props.prediction} boxID={props.boxID} traffic={props.traffic} sensors={props.sensors} />
        ) : (
          <CircularProgress color="primary" />
        )
      )}
      <div className={classes.buttonContainer}>
        <Button
          size='small'
          className={classes.button}
          color='secondary'
          variant='contained'
          disabled={state.isActive}
          onClick={toggleSettings}>Adjust Prediction Settings
        </Button>
        <Button
          size='small'
          onClick={() => props.startSinglePrediction(props.params)}
          className={classes.button}
          color='primary'
          variant='contained'>Start Prediction Using Default!
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    // params: state.prediction[ownProps.boxID] || {...state.prediction, boxID: ownProps.boxID},
    // prediction: state.prediction[ownProps.boxID] && state.prediction[ownProps.boxID].prediction,
    params: state.prediction,
    prediction: state.prediction.single,
    isFetching: state.prediction.isFetching,
    traffic: state.traffic,
    sensors: state.air.sensors
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // startSimulationWith: (params) => dispatch(simulationActions.startSimulation(params)),
    startSinglePrediction: (params) => dispatch(predictionActions.fetchSinglePrediction(params)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoxArea);