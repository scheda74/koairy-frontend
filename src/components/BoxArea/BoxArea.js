import { CircularProgress, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { simulationActions } from '../../store/actions';
import connect from 'react-redux/es/connect/connect';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import bremickerBoxes from '../../assets/data/bremickerBoxes';
import Analysis from '../../container/views/Analysis/Analysis';
import SingleSettings from '../SingleSettings/SingleSettings';

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
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
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
    flexDirection: 'column'
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
      {state.isActive ? (
        <div className={classes.settingsContainer}>
          <SingleSettings boxID={props.selectedBox}/>
        </div>
      ) : (
        props.traffic && props.traffic[props.boxID] && props.sensors && props.sensors[bremickerBoxes[props.boxID]['airSensor']] ? (
          <Analysis boxID={props.boxID} traffic={props.traffic} sensors={props.sensors} />
        ) : (
          <CircularProgress color="primary" />
        )
      )}
      <div className={classes.buttonContainer}>
        <Button className={classes.button} color='secondary' variant='contained' disabled={state.isActive} onClick={toggleSettings}>Adjust Prediction Settings</Button>
        <Typography variant="h5" align='center'>You have selected Bremicker Box {props.boxID}</Typography>
        <Button
          onClick={() => props.startSinglePrediction(props.params)}
          className={classes.button}
          color='primary'
          variant='contained'>
          Start Using Default!
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    params: state.simulation[ownProps.boxID] || {...state.simulation, boxID: ownProps.boxID},
    prediction: state.prediction,
    isFetching: state.simulation.isFetching,
    traffic: state.traffic,
    sensors: state.air.sensors
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // startSimulationWith: (params) => dispatch(simulationActions.startSimulation(params)),
    startSinglePrediction: (params) => dispatch(simulationActions.fetchSinglePrediction(params)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoxArea);