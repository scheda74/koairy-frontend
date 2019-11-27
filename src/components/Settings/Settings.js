import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import connect from 'react-redux/es/connect/connect';

import { fetchPrediction, setSimulationParameter, startSimulation } from '../../store/actions/simulationActions';

import SettingsIcon from '@material-ui/icons/Settings';
import ExploreIcon from '@material-ui/icons/Explore';
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
import General from './General/General';
import Areas from './Areas/Areas';
import Vehicles from './Vehicles/Vehicles';
import WeatherScenarios from './WeatherScenarios/WeatherScenarios';
import PredictionSettings from './PredictionSettings/PredictionSettings';
import { WarningButton } from '../../styles/customComponents';

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
    width: 50,
    height: 50,
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
    1: <SettingsIcon />,
    2: <ExploreIcon />,
    3: <ExploreIcon />,
    4: <DriveEtaIcon />,
    5: <CloudIcon />,
    6: <DeveloperBoardIcon />
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
  content: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignContent: 'center'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
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
    'Select a distribution of vehicles\' source',
    'Select a distribution of vehicles\' destination',
    'Select distribution of vehicles\' emission classes',
    'Select weather conditions',
    'Select general prediction settings'
  ];
}

function Settings(props) {
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


  // const handlePanelChange = panel => (event, isExpanded) => {
  //   setState({...state, expanded: isExpanded ? panel : false});
  // };

  const handleDistChange = (event, vehicleClass) => {
    props.setSimulationParameters({
      ...props.params,
      vehicleDistribution: {...props.params.vehicleDistribution, [vehicleClass]: event.target.value / 100}
    })
  };

  const handleWeightChange = (event, weightType, areaName) => {
    let weights = weightType === 'src' ? {...props.params.srcWeights} : {...props.params.dstWeights};

    console.log('weight', weights)
    weights[areaName] = event.target.value / 100.0;
    console.log("weights new", weights);
    props.setSimulationParameters({
      ...props.params,
      srcWeights: weightType === 'src' ? weights : props.params.srcWeights,
      dstWeights: weightType === 'dst' ? weights : props.params.dstWeights,
    });
  };

  const handleSingleChange = name => event => {
    props.setSimulationParameters({
      ...props.params,
      [name]: event.target.value
    });
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <General handleSingleChange={handleSingleChange}
                   timeSteps={props.params.timeSteps}
                   vehicleNumber={props.params.vehicleNumber}
                   id="generalPanel" />
        );
      case 1:
        return (
          <Areas expanded={state.expanded}
                 areas={props.params.srcWeights}
                 weightType='src'
                 id="srcPanel"
                 handleWeightChange={handleWeightChange}
                 title="Area Weights - Source"
                 sum={state.srcSum}
          />
        );
      case 2:
        return (
          <Areas expanded={state.expanded}
                 areas={props.params.dstWeights}
                 weightType='src'
                 id="dstPanel"
                 handleWeightChange={handleWeightChange}
                 title="Area Weights - Source"
                 sum={state.srcSum}
          />
        );
      case 3:
        return (
          <Vehicles vehicles={props.params.vehicleDistribution}
                    handleDistChange={handleDistChange}
                    id="vehiclePanel" />
        );
      case 4:
        return (
          <WeatherScenarios />
        );
      case 5:
        return(
          <PredictionSettings predictionModel={props.params.predictionModel}
                              handleSingleChange={handleSingleChange} />
        );
      default:
        return 'Unknown step';
    }
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={state.activeStep} connector={<ColorlibConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {state.activeStep === steps.length ? (
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
                      onClick={() => props.startPrediction(props.params)}
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
              <Button type='reset' disabled={state.activeStep === 0} onClick={handleBack} className={classes.button}>
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
              <WarningButton onClick={handleDefault} error>
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

const mapStateToProps = (state) => {
  return {
    params: {
      srcWeights: state.simulation.srcWeights,
      dstWeights: state.simulation.dstWeights,
      vehicleNumber: state.simulation.vehicleNumber,
      vehicleDistribution: state.simulation.vehicleDistribution,
      timeSteps: state.simulation.timeSteps,
      weatherScenario: state.simulation.weatherScenario,
      predictionModel: state.simulation.predictionModel
    },
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSimulationParameters: (params) => dispatch(setSimulationParameter(params)),
    startSimulationWith: (params) => dispatch(startSimulation(params)),
    startPrediction: (params) => dispatch(fetchPrediction(params)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);