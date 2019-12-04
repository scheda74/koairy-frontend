import { Card, Divider, makeStyles } from '@material-ui/core';
import DeviceMap from '../../../components/Map/DeviceMap';
import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import BambooIcon from '../../../Icons/Bamboo';
import { predictionActions, simulationActions } from '../../../store/actions';
import connect from 'react-redux/es/connect/connect';
import CircularProgress from '@material-ui/core/CircularProgress';
// import bremickerBoxes from '../../assets/data/bremickerBoxes'
import BoxArea from '../../../components/BoxArea/BoxArea'
import Analysis from '../Analysis/Analysis';
import Settings from '../../../components/Settings/Settings';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    // flexDirection: 'column',
    width: '100vw',
    height: '100vh'
  },
  subToolbar: {
    width: '100%',
    height: '64px'
  },
  introductionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexBasis: '40%'
    // justifyContent: 'center',
    // alignItems: 'center'
    // margin: '0.5rem auto',
  },
  introduction: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  mapContainer: {
    // width: '100vw'
    flexBasis: '60%',
    // display: 'flex',
    // justifyContent: 'space-between',
    margin: '0.5rem'
  },
  icon: {
    // margin: 'auto',
    height: '180px',
    width: '180px',
    [theme.breakpoints.down('md')]: {
      height: '90px',
      width: '90px'
    },
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
  textContainer: {
    display: 'flex',
    flexDirection: 'column',

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
    isActive: false,
    // isSingleActive: false
  });

  useEffect(function() {
    console.log('[PREDICTION] should rerender? selectedBox now: ' + props.selectedBox)
    // setState({...state, isSingleActive: false, isActive: false})
  }, [props.selectedBox]);

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
    console.log("active")
    setState({...state, isActive: !state.isActive })
  };
  //
  // const toggleSingleSettings = () => {
  //   setState({...state, isSingleActive: !state.isSingleActive })
  // };

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
        {/*<Card raised={true} className={classes.card}>*/}
          {/*<Button>*/}
            {/*<Typography variant="overline" align='center' className={classes.heading}>HeatMap Settings</Typography>*/}
          {/*</Button>*/}
          {/*<HeatMapSettings blurChange={onBlurChange}*/}
                           {/*radiusChange={onRadiusChange}*/}
                           {/*opacityChange={onOpacityChange}*/}
                           {/*maximumChange={onMaximumChange} />*/}
        {/*</Card>*/}
      </div>
      <Divider />
      <div className={classes.introductionContainer}>
        {props.selectedBox ? (
          <BoxArea boxID={props.selectedBox} />
        ) : (
          props.prediction ? (
              <Analysis isFetching={props.isFetching} prediction={props.prediction} outputKeys={props.outputKeys}/>
            ) : (
            <div className={classes.introduction}>
              {/*<Icon className={classes.icon}><KoalaOutlinedIcon /></Icon>*/}
              {/*<div className={classes.introduction}>*/}

              <div className={classes.textContainer}>
                <Typography variant="h4" align='center'>Welcome to Koairy!</Typography>
                <Typography style={{marginTop: '0.5rem'}} variant="subtitle1" align='center'>You can simulate emissions and predict air quality</Typography>
              </div>
              {props.isFetchingPred ?
                (
                  <CircularProgress color="primary" />
                ) : (
                  props.isActive ? (
                    <div className={classes.settingsContainer}>
                      <Settings />
                    </div>
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
                )
              }
              <Icon className={classes.icon}><BambooIcon /></Icon>
            </div>
          )
        )}
      </div>
    </div>
  )
}

// {state.isActive ? (
//   props.boxID ? (
//     <div className={classes.settingsContainer}>
//       {/*<Settings />*/}
//       <SingleSettings boxID={props.boxID}/>
//     </div> ) : (
//     <div>
//
//     </div> )
// ) : (

const mapStateToProps = (state) => {
    return {
      params: state.prediction,
      prediction: state.prediction.response || state.prediction.single,
      isFetchingPred: state.prediction.isFetching,
      selectedBox: state.traffic.selected,
      traffic: state.traffic,
      sensors: state.air.sensors,
      outputKeys: state.prediction.outputKeys
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSimulationParameters: (params) => dispatch(predictionActions.setSimulationParameter(params)),
    startSimulationWith: (params) => dispatch(simulationActions.startSimulation(params)),
    startPrediction: (params) => dispatch(predictionActions.fetchPrediction(params)),
    startSinglePrediction: (params) => dispatch(predictionActions.fetchSinglePrediction(params)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prediction);


// {/*<div className={classes.chartContainer}>*/}
// {/*<Typography align='center' variant='caption'>Vehicles per hour</Typography>*/}
// {/*<BremickerLineChart*/}
// {/*data={*/}
// {/*Object.keys(props.traffic[props.boxID]).map(key => {*/}
// {/*return {*/}
// {/*date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),*/}
// {/*value: props.traffic[props.boxID][key]*/}
// {/*}*/}
// {/*})*/}
// {/*}*/}
// {/*/>*/}
// {/*{props.sensors && props.sensors[bremickerBoxes[props.boxID][]]}*/}
// {/*<HawaDawaLineChart*/}
// {/*data={*/}
// {/*Object.keys()*/}
// {/*}*/}
//
// {/*/>*/}
// {/*</div>*/}

// {/*{props.isActive ? (*/}
// {/*<div className={classes.settingsContainer}>*/}
// {/*<Settings />*/}
// {/*</div>*/}
// {/*) : (*/}
// {/*state.isSingleActive ? (*/}
// {/*<div className={classes.settingsContainer}>*/}
// {/*<SingleSettings boxID={props.selectedBox}/>*/}
// {/*</div>*/}
// {/*) : (*/}
// {/*<div className={classes.introductionContainer}>*/}
// {/*{props.selectedBox ? (*/}
// {/*<div className={classes.introduction}>*/}
// {/*<div className={classes.buttonContainer}>*/}
// {/*<Button className={classes.button} color='secondary' variant='contained' onClick={toggleSingleSettings}>Adjust Prediction Settings</Button>*/}
// {/*<Typography variant="h5" align='center'>You have selected Bremicker Box {props.selectedBox}</Typography>*/}
// {/*<Button*/}
// {/*onClick={() => props.startSinglePrediction(props.params)}*/}
// {/*className={classes.button}*/}
// {/*color='primary'*/}
// {/*variant='contained'>*/}
// {/*Start Using Default!*/}
// {/*</Button>*/}
// {/*</div>*/}
// {/*/!*<Typography style={{marginTop: '0.5rem'}} variant="subtitle1" align='center'>*!/*/}
// {/*/!*Would you like to simulate and predict air quality for the selected area?*!/*/}
// {/*/!*</Typography>*!/*/}
// {/*{props.traffic && props.traffic[props.selectedBox] && props.sensors && props.sensors[bremickerBoxes[props.selectedBox]['airSensor']] ? (*/}
// {/*<Analysis boxID={props.selectedBox} traffic={props.traffic} sensors={props.sensors} />*/}
// {/*) : (*/}
// {/*<React.Fragment />*/}
// {/*)}*/}
// {/*/!*<div className={classes.buttonContainer}>*!/*/}
// {/*/!*<Button className={classes.button} color='secondary' variant='contained' onClick={toggleSingleSettings}>Adjust Settings</Button>*!/*/}
// {/*/!*<Button*!/*/}
// {/*/!*onClick={() => props.startSinglePrediction(props.params)}*!/*/}
// {/*/!*className={classes.button}*!/*/}
// {/*/!*color='primary'*!/*/}
// {/*/!*variant='contained'>*!/*/}
// {/*/!*Start Using Default!*!/*/}
// {/*/!*</Button>*!/*/}
// {/*/!*</div>*!/*/}
// {/*</div>*/}
// {/*) : (*/}
// {/*<React.Fragment>*/}
// {/*<Icon className={classes.icon}><KoalaOutlinedIcon /></Icon>*/}
// {/*<div className={classes.introduction}>*/}
//
// {/*<div className={classes.introduction}>*/}
// {/*<Typography variant="h3" align='center'>Welcome to Koairy!</Typography>*/}
// {/*<Typography style={{marginTop: '0.5rem'}} variant="h5" align='center'>You can simulate emissions and predict air quality</Typography>*/}
// {/*</div>*/}
// {/*{props.isFetching ?*/}
// {/*(*/}
// {/*<CircularProgress color="primary" />*/}
// {/*) : (*/}
// {/*<div className={classes.buttonContainer}>*/}
// {/*/!*<Button className={classes.button} color='secondary' variant='contained' onClick={toggleSettings}>Settings</Button>*!/*/}
// {/*<Button*/}
// {/*onClick={() => props.startPrediction(props.params)}*/}
// {/*className={classes.button}*/}
// {/*color='primary'*/}
// {/*variant='contained'>*/}
// {/*Start Predicting!*/}
// {/*</Button>*/}
// {/*</div>*/}
// {/*)*/}
// {/*}*/}
// {/*</div>*/}
// {/*<Icon className={classes.icon}><BambooIcon /></Icon>*/}
// {/*</React.Fragment>*/}
// {/*)}*/}
// {/*</div>*/}
// {/*))}*/}