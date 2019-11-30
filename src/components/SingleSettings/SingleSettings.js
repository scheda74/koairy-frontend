import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import connect from 'react-redux/es/connect/connect';

import {
  fetchSinglePrediction,
  setSingleSimulationParameter,
  startSimulation
} from '../../store/actions/simulationActions';

import SettingsIcon from '@material-ui/icons/Settings';
import CloudIcon from '@material-ui/icons/Cloud';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';


import StepConnector from '@material-ui/core/StepConnector';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import clsx from 'clsx';

import Stepper from '@material-ui/core/Stepper';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import General from '../Settings/General/General';
import Vehicles from '../Settings/Vehicles/Vehicles';
import WeatherScenarios from '../Settings/WeatherScenarios/WeatherScenarios';
import PredictionSettings from '../Settings/PredictionSettings/PredictionSettings';
import { WarningButton } from '../../styles/customComponents';
import CircularProgress from '@material-ui/core/CircularProgress';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      // backgroundImage:
      //   'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      backgroundImage:
        'linear-gradient( 136deg, rgb(83, 141, 26) 0%, rgb(130, 189, 75) 50%, rgb(226, 219, 172) 100%)',
    },
  },
  completed: {
    '& $line': {
      // backgroundImage:
      //   'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      backgroundImage:
        'linear-gradient( 136deg, rgb(83, 141, 26) 0%, rgb(130, 189, 75) 50%, rgb(226, 219, 172) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 32,
    height: 32,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    // backgroundImage:
    //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    backgroundImage:
      'linear-gradient( 136deg, rgb(83, 141, 26) 0%, rgb(130, 189, 75) 50%, rgb(226, 219, 172) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    // backgroundImage:
    //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    backgroundImage:
      'linear-gradient( 136deg, rgb(83, 141, 26) 0%, rgb(130, 189, 75) 50%, rgb(226, 219, 172) 100%)'
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon fontSize='small' />,
    2: <DriveEtaIcon fontSize='small' />,
    3: <CloudIcon fontSize='small' />,
    4: <DeveloperBoardIcon fontSize='small' />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  stepper: {
    padding: 12
  },
  buttonContainer: {
    width: '75%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    // position: 'absolute',
    // bottom: '2.5%',
    // left: '40%'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    'Select general simulation settings',
    'Select distribution of vehicles\' emission classes',
    'Select weather conditions',
    'Select general prediction settings'
  ];
}

function SingleSettings(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    expanded: false,
    srcSum: 100,
    dstSum: 100,
    activeStep: 0
  });

  // const { activeStep } = state;

  const steps = getSteps();

  const handleNext = () => setState({...state, activeStep: state.activeStep + 1});

  const handleBack = () => setState({...state, activeStep: state.activeStep - 1});

  const handleDefault = () => setState({...state, activeStep: steps.length});

  const handleReset = () => setState({...state, activeStep: 0});


  const handleDistChange = (event, vehicleClass) => {
    props.setSingleSimulationParameters({
      ...props,
      vehicleDistribution: {...props.vehicleDistribution, [vehicleClass]: event.target.value / 100}
    })
  };

  const handleDateChange = (name, date) => {
    let newDate = new Date();
    if (name === 'startDate' || name === 'endDate') {
      newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    } else {
      newDate = date.toLocaleString('DE-de', {hour: '2-digit', minute: '2-digit'})
      console.log(newDate)
    }
    props.setSingleSimulationParameters({...props, [name]: newDate});
  };

  const formatTimeToDate = time => {
    let [hour, minute] = time.split(':')
    return new Date().setHours(hour, minute, 0, 0);
  };

  const handleSingleChange = name => event => {
    props.setSingleSimulationParameters({
      ...props,
      [name]: event.target.value
    });
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <General handleSingleChange={handleSingleChange}
                   timeSteps={props.timeSteps}
                   vehicleNumber={props.vehicleNumber}
                   id="generalPanel" />
        );
      case 2:
        return (
          <Vehicles vehicles={props.vehicleDistribution}
                    handleDistChange={handleDistChange}
                    id="vehiclePanel" />
        );
      case 3:
        return (
          <WeatherScenarios />
        );
      case 4:
        return(
          <PredictionSettings predictionModel={props.predictionModel}
                              startDate={props.startDate}
                              endDate={props.endDate}
                              startHour={formatTimeToDate(props.startHour)}
                              endHour={formatTimeToDate(props.endHour)}
                              output_key={props.output_key}
                              handleSingleChange={handleSingleChange}
                              handleDateChange={handleDateChange} />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <div className={classes.root}>
      <Stepper className={classes.stepper} alternativeLabel activeStep={state.activeStep} connector={<ColorlibConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {state.activeStep === steps.length ? (
          props.isFetching ?
            <div style={{margin: '2rem', textAlign: 'center'}} >
              <CircularProgress color="primary" />
            </div>
            :
            <div>
              <Typography align='center' className={classes.instructions}>
                All steps completed - you&apos;re done!
              </Typography>
              <Typography align='center' className={classes.instructions}>
                Starting the simulation and prediction may take a while!
              </Typography>
              <div className={classes.buttonContainer}>
                <Button variant='contained' onClick={handleReset} className={classes.button}>
                  Reset
                </Button>
                <Button variant="contained"
                        color="primary"
                        onClick={() => props.startPrediction(props)}
                        className={classes.button}>
                  START
                </Button>
              </div>
            </div>
        ) : (
          <div className={classes.content}>
            {/*<Typography className={classes.instructions}>{getStepContent(state.activeStep)}</Typography>*/}
            <div className={classes.instructions}>{getStepContent(state.activeStep)}</div>
            <div className={classes.buttonContainer}>
              <Button color='secondary'
                      variant="contained"
                      disabled={state.activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
              <WarningButton onClick={handleDefault}>
                Use Default
              </WarningButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

{/*<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>*/}

const mapStateToProps = state => state.simulation;

const mapDispatchToProps = (dispatch) => {
  return {
    setSingleSimulationParameters: (params) => dispatch(setSingleSimulationParameter(params)),
    startSimulationWith: (params) => dispatch(startSimulation(params)),
    startSinglePrediction: (params) => dispatch(fetchSinglePrediction(params)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleSettings);