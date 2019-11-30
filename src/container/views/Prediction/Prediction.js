import { Card, Divider, makeStyles } from '@material-ui/core';
import DeviceMap from '../../../components/Map/DeviceMap';
import React from 'react';
import HeatMapSettings from '../../../components/Settings/HeatMapSettings/HeatMapSettings';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import BambooIcon from '../../../Icons/Bamboo';
import KoalaOutlinedIcon from '../../../Icons/KoalaOutlined';
import { simulationActions } from '../../../store/actions';
import connect from 'react-redux/es/connect/connect';
import CircularProgress from '@material-ui/core/CircularProgress';
import BremickerLineChart from '../../../components/Charts/BremickerLineChart';

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh'
  },
  subToolbar: {
    width: '100%',
    height: '64px'
  },
  introductionContainer: {
    // display: 'flex',
    // justifyContent: 'space-between'
    flexBasis: '60%',
    display: 'flex',
    justifyContent: 'space-between',
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
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  button: {
    margin: '0.5rem 1rem'
  },
  introduction: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  mapContainer: {
    // width: '100vw'
    flexBasis: '60%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem 0',
  },
  mapCard: {
    // display: 'flex',
    // margin: 'auto',
    flexBasis: '80%',
    marginLeft: '1rem',
    width: '100%',
    height: '100%'
  },
  card: {
    // width: '20%',
    flexBasis: '20%',
    margin: '0 1rem'
  },
  settingsContainer: {
    flexBasis: '40%',
    display: 'flex',
    justifyContent: 'start',
    margin: '0.5rem auto',
    // width: '80%'
    // alignItems: 'center'
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

function Prediction(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    blur: 4,
    opacity: 0.2,
    radius: 10,
    maximum: 1,
    isActive: false
  });

  const onBlurChange = (value) => {
    setState({...state, blur: value })
  };

  const onRadiusChange = (value) => {
    setState({...state, radius: value })
  };

  const onOpacityChange = (value) => {
    setState({...state, opacity: value })
  };

  const onMaximumChange = (value) => {
    setState({...state, maximum: value / 100 })
  };

  const toggleSettings = () => {
    setState({...state, isActive: !state.isActive })
  };

  return (
    <div className={classes.mainContainer}>
      {/*<div className={classes.subToolbar}>*/}
        {/*<span>second toolbar</span>*/}
      {/*</div>*/}
      <div className={classes.mapContainer}>
        <Card raised={true} className={classes.mapCard}>
          <DeviceMap />
          {/*<span>hello</span>*/}
        </Card>
        <Card raised={true} className={classes.card}>
          <Button>
            <Typography variant="overline" align='center' className={classes.heading}>HeatMap Settings</Typography>
          </Button>
          <HeatMapSettings blurChange={onBlurChange}
                           radiusChange={onRadiusChange}
                           opacityChange={onOpacityChange}
                           maximumChange={onMaximumChange} />
        </Card>
      </div>
      <Divider />
      <div className={classes.introductionContainer}>
        <Icon className={classes.icon}><KoalaOutlinedIcon /></Icon>
          {props.selectedBox ? (
            <div className={classes.introduction}>
              <Typography variant="h3" align='center'>You have selected Bremicker Box {props.selectedBox}</Typography>
              <Typography style={{marginTop: '0.5rem'}} variant="h5" align='center'>
                Would you like to simulate and predict air quality for the selected area?
              </Typography>
              {props.traffic && props.traffic[props.selectedBox] ? (
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
                </div>
              ) : (
                <React.Fragment />
              )}

              <div className={classes.buttonContainer}>
                <Button
                  onClick={() => props.startSinglePrediction(props.params)}
                  className={classes.button}
                  color='primary'
                  variant='contained'>
                  Start Using Default!
                </Button>
                <Button className={classes.button} color='secondary' variant='contained' onClick={toggleSettings}>Adjust Settings</Button>
              </div>
            </div>
          ) : (
            <div className={classes.introduction}>
              <div className={classes.buttonContainer}>
                <Typography variant="h3" align='center'>Welcome to Koairy!</Typography>
                <Typography style={{marginTop: '0.5rem'}} variant="h5" align='center'>You can simulate emissions and predict air quality</Typography>
              </div>
              {props.isFetching ?
                (
                  <CircularProgress color="primary" />
                ) : (
                  <div className={classes.buttonContainer}>
                    <Button
                      onClick={() => props.startPrediction(props.params)}
                      className={classes.button}
                      color='primary'
                      variant='contained'>
                      Start Predicting!
                    </Button>
                    <Button className={classes.button} color='secondary' variant='contained' onClick={toggleSettings}>Settings</Button>
                  </div>
                )
              }
            </div>
          )}
        <Icon className={classes.icon}><BambooIcon /></Icon>
      </div>
    </div>
  )
}

// {state.isActive ? (
//   props.selectedBox ? (
//     <div className={classes.settingsContainer}>
//       {/*<Settings />*/}
//       <SingleSettings boxId={props.selectedBox}/>
//     </div> ) : (
//     <div>
//
//     </div> )
// ) : (

const mapStateToProps = (state) => {
    return {
      params: state.simulation,
      prediction: state.prediction,
      isFetching: state.simulation.isFetching,
      selectedBox: state.traffic.selected,
      traffic: state.traffic,
      air: state.air
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSimulationParameters: (params) => dispatch(simulationActions.setSimulationParameter(params)),
    startSimulationWith: (params) => dispatch(simulationActions.startSimulation(params)),
    startPrediction: (params) => dispatch(simulationActions.fetchPrediction(params)),
    startSinglePrediction: (params) => dispatch(simulationActions.fetchSinglePrediction(params)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prediction);