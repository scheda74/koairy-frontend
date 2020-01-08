import { Button, makeStyles, Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@material-ui/core';
import General from './General/General';
import Areas from './Areas/Areas';
import Vehicles from './Vehicles/Vehicles';
import WeatherScenarios from './WeatherScenarios/WeatherScenarios';
import PredictionSettings from './PredictionSettings/PredictionSettings';
import React from 'react';
import { predictionActions } from '../../store/actions';
import connect from 'react-redux/es/connect/connect';
import { useHistory, useParams } from 'react-router';
import { WarningButton } from '../../styles/customComponents';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
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

  let history = useHistory()
  const { boxId } = useParams();
  const predictionUrl = boxId ? "/prediction/" + boxId : "/prediction";

  // skip step 1 and 2 if it's a single setting
  let steps = getSteps();
  if (boxId) {
    steps = steps.filter((step, index) => index !== 1 && index !== 2);
  }


  const handleNext = () => setState({...state, activeStep: state.activeStep + 1});

  const handleBack = () => setState({...state, activeStep: state.activeStep - 1});

  const handleDefault = () => setState({...state, activeStep: steps.length});

  const handleReset = () => setState({...state, activeStep: 0});


  const handleDistChange = (event, vehicleClass) => {
    props.setSimulationParameters({
      ...props,
      vehicleDistribution: {...props.vehicleDistribution, [vehicleClass]: event.target.value / 100}
    })
  };

  const handleDateChange = (name, date) => {
    let newDate = new Date();
    if (name === 'startDate' || name === 'endDate') {
      newDate = date.toISOString().substr(0, 10);
      // console.log(newDate)
    } else {
      newDate = date.toLocaleString('DE-de', {hour: '2-digit', minute: '2-digit'})
    }
    props.setSimulationParameters({...props, [name]: newDate});
  };

  const formatTimeToDate = time => {
    let [hour, minute] = time.split(':')
    return new Date().setHours(hour, minute, 0, 0);
  };

  const handleWeightChange = (event, weightType, areaName) => {
    let weights = weightType === 'src' ? {...props.srcWeights} : {...props.dstWeights};
    weights[areaName] = event.target.value / 100.0;
    props.setSimulationParameters({
      ...props,
      srcWeights: weightType === 'src' ? weights : props.srcWeights,
      dstWeights: weightType === 'dst' ? weights : props.dstWeights,
    });
  };

  const handleSingleChange = name => event => {
    props.setSimulationParameters({
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
      case 1:
        return (
          <Areas expanded={state.expanded}
                 areas={props.srcWeights}
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
                 areas={props.dstWeights}
                 weightType='src'
                 id="dstPanel"
                 handleWeightChange={handleWeightChange}
                 title="Area Weights - Source"
                 sum={state.srcSum}
          />
        );
      case 3:
        return (
          <Vehicles vehicles={props.vehicleDistribution}
                    handleDistChange={handleDistChange}
                    id="vehiclePanel" />
        );
      case 4:
        return (
          <WeatherScenarios />
        );
      case 5:
        return(
          <PredictionSettings predictionModel={props.predictionModel}
                              startDate={new Date(props.startDate)}
                              endDate={new Date(props.endDate)}
                              startHour={formatTimeToDate(props.startHour)}
                              endHour={formatTimeToDate(props.endHour)}
                              handleSingleChange={handleSingleChange}
                              handleDateChange={handleDateChange} />
        );
      default:
        return 'Unknown step';
    }
  };

  const handlePredictionStart = () => {
    if (boxId) {
      props.startSinglePrediction(props)
    } else {
      props.startPrediction(props)
    }
    history.push(predictionUrl);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={state.activeStep} orientation="vertical">
        {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {getStepContent(index)}
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={state.activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
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
                  </div>
                </div>
              </StepContent>
            </Step>
          )
        )}
      </Stepper>
      {state.activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - You&apos;re now able to start the prediction!</Typography>
          <WarningButton onClick={() => history.push('/detail')} className={classes.button}>
            Back To Details
          </WarningButton>
          <Button color="secondary" variant="contained" onClick={handleReset} className={classes.button}>
            Reset
          </Button>
          <Button
            onClick={() => handlePredictionStart()}
            className={classes.button}
            color='primary'
            variant='contained'>Start Prediction
          </Button>
        </Paper>
      )}
    </div>
  );
}

const mapStateToProps = state => state.prediction;

const mapDispatchToProps = (dispatch) => {
  return {
    setSimulationParameters: (params) => dispatch(predictionActions.setSimulationParameter(params)),
    startPrediction: (params) => dispatch(predictionActions.fetchPrediction(params)),
    startSinglePrediction: (params) => dispatch(predictionActions.fetchSinglePrediction(params)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);