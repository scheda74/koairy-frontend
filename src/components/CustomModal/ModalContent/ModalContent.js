import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import connect from 'react-redux/es/connect/connect';

import { fetchPrediction, setSimulationParameter, startSimulation } from '../../../store/actions/simulationActions';

import Areas from './Areas/Areas';
import WeatherScenarios from './WeatherScenarios/WeatherScenarios';
import Vehicles from './Vehicles/Vehicles';
import General from './General/General';
import PredictionSettings from './PredictionSettings/PredictionSettings';

const useStyles = makeStyles(theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  input: {
    display: 'none',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(4)
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

function ModalContent(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    expanded: false,
    srcSum: 100,
    dstSum: 100
  });



  const handlePanelChange = panel => (event, isExpanded) => {
    setState({...state, expanded: isExpanded ? panel : false});
  };

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

    // vehicleNumber: props.vehicleNumber,
    //   vehicleDistribution: props.vehicleDistribution,
    //   weatherScenario: props.weatherScenario,
    //   timesteps: props.timesteps
  };

  const handleSingleChange = name => event => {
    props.setSimulationParameters({
      ...props.params,
      [name]: event.target.value
    });
  };

  return (
    <div>
      <Areas expanded={state.expanded}
             areas={props.params.srcWeights}
             weightType='src'
             id="srcPanel"
             handleWeightChange={handleWeightChange}
             handlePanelChange={handlePanelChange}
             title="Area Weights - Source"
             // sum={srcSum}
             sum={state.srcSum}
      />
      <Divider/>
      <Areas expanded={state.expanded}
             areas={props.params.dstWeights}
             weightType='dst'
             id="dstPanel"
             handleWeightChange={handleWeightChange}
             handlePanelChange={handlePanelChange}
             title="Area Weights - Destination"
             sum={state.dstSum}
      />
      <Divider />
      <Vehicles expanded={state.expanded}
                vehicles={props.params.vehicleDistribution}
                handleDistChange={handleDistChange}
                handlePanelChange={handlePanelChange}
                id="vehiclePanel" />
      <Divider />

      <WeatherScenarios expanded={state.expanded}
                        handlePanelChange={handlePanelChange}
                        id="weatherPanel" />
      <Divider />
      <General expanded={state.expanded}
               handlePanelChange={handlePanelChange}
               handleSingleChange={handleSingleChange}
               timeSteps={props.params.timeSteps}
               vehicleNumber={props.params.vehicleNumber}
               id="generalPanel" />
      <PredictionSettings
        predictionModel={props.params.predictionModel}
        expanded={state.expanded}
        handlePanelChange={handlePanelChange}
        handleSingleChange={handleSingleChange} />
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          className={classes.margin}
          // onClick={() => props.startSimulationWith(props.params)}
          onClick={() => props.closeModal()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.margin}
          // onClick={() => props.startSimulationWith(props.params)}
          onClick={() => props.startPrediction(props.params)}
        >
          Start Simulation
        </Button>
      </div>
    </div>
  );
}

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
)(ModalContent);