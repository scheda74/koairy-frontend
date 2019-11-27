import { Card, Divider, makeStyles } from '@material-ui/core';
import DeviceMap from '../../../components/Map/DeviceMap';
import React from 'react';
import Settings from '../../../components/Settings/Settings';
import HeatMapSettings from '../../../components/Settings/HeatMapSettings/HeatMapSettings';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import BambooIcon from '../../../Icons/Bamboo';
import KoalaOutlinedIcon from '../../../Icons/KoalaOutlined';
import { fetchPrediction, setSimulationParameter, startSimulation } from '../../../store/actions/simulationActions';
import connect from 'react-redux/es/connect/connect';

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
    justifyContent: 'space-around'
  },
  mapContainer: {
    // width: '100vw'
    flexBasis: '40%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem 0',
  },
  mapCard: {
    // display: 'flex',
    // margin: 'auto',
    marginLeft: '1rem',
    width: '80%',
    height: '100%'
  },
  card: {
    // width: '20%',
    margin: '0 1rem'
  },
  settingsContainer: {
    flexBasis: '60%',
    display: 'flex',
    justifyContent: 'start',
    margin: '0.5rem auto',
    // width: '80%'
    // alignItems: 'center'
  },
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
      {state.isActive ? (
        <div className={classes.settingsContainer}>
          <Settings />
        </div>
        ) : (
        <div className={classes.introductionContainer}>
          <Icon className={classes.icon}><KoalaOutlinedIcon /></Icon>
          <div className={classes.introduction}>
            <div className={classes.buttonContainer}>
              <Typography variant="h3" align='center'>Welcome to Koairy!</Typography>
              <Typography style={{marginTop: '0.5rem'}} variant="h5" align='center'>You can simulate emissions and predict air quality</Typography>
            </div>
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
          </div>
          <Icon className={classes.icon}><BambooIcon /></Icon>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
      params: state.simulation,
      prediction: state.prediction
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSimulationParameters: (state) => dispatch(setSimulationParameter(state.simulation)),
    startSimulationWith: (state) => dispatch(startSimulation(state.simulation)),
    startPrediction: (state) => dispatch(fetchPrediction(state.simulation)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prediction);