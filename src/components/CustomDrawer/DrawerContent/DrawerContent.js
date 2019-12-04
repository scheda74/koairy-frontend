import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Button from '@material-ui/core/Button';
import Areas from '../../CustomModal/ModalContent/Areas/Areas';
import WeatherScenarios from '../../CustomModal/ModalContent/WeatherScenarios/WeatherScenarios';
import Vehicles from '../../CustomModal/ModalContent/Vehicles/Vehicles';
import Typography from '@material-ui/core/Typography';
import connect from 'react-redux/es/connect/connect';
import { predictionActions, simulationActions } from '../../../store/actions';
import General from '../../CustomModal/ModalContent/General/General';

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
    marginTop: theme.spacing(4)
  }
}));


// function subtractFromArea(areas, name, value) {
//   const filteredIndex = areas.findIndex(p => p.name !== name && p.value >= value);
//   console.log(filteredIndex);
//   if (filteredIndex === -1) {
//     return subtractFromArea(areas, name, value / 2);
//     // return areas;
//   }
//   areas[filteredIndex].value -= value;
//   return areas;
// }

// function calcWeightSum(weights) {
//   return weights.reduce((sum, area) => parseFloat(sum) + parseFloat(area.value), 0);
// }


// { srcWeights, dstWeights, setSimulationParameters, closeDrawer }
function DrawerContent(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    expanded: false
  });

  const handlePanelChange = panel => (event, isExpanded) => {
    setState({...state, expanded: isExpanded ? panel : false});
  };

  const handleWeightChange = (event, weightType, areaName) => {
    let weights = weightType === 'src' ? {...props.srcWeights} : {...props.dstWeights};

    weights[areaName] = event.target.value / 100.0;
    console.log("weights");
    console.log(weights);
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
      {/*{console.log(props)}*/}
      <div className={classes.drawerHeader}>
        <IconButton onClick={props.closeDrawer}>
          {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <Typography variant="caption">SIMULATION PARAMETERS</Typography>
      </div>
      <Divider />
      <Areas expanded={state.expanded}
             areas={props.params.srcWeights}
             weightType='src'
             id="srcPanel"
             handleWeightChange={handleWeightChange}
             handlePanelChange={handlePanelChange}
             title="Area Weights - Source"
             // sum={srcSum}
             sum={0}
      />
      <Divider/>
      <Areas expanded={state.expanded}
             areas={props.params.dstWeights}
             weightType='dst'
             id="dstPanel"
             handleWeightChange={handleWeightChange}
             handlePanelChange={handlePanelChange}
             title="Area Weights - Destination"
             // sum={dstSum}
             sum={0}
      />
      <Divider />
      <Vehicles expanded={state.expanded}
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
      <div className={classes.buttonContainer}>
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
      // weatherScenario: state.simulation.weatherScenario
    },
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSimulationParameters: (params) => dispatch(predictionActions.setSimulationParameter(params)),
    startSimulationWith: (params) => dispatch(simulationActions.startSimulation(params)),
    startPrediction: (params) => dispatch(predictionActions.fetchPrediction(params))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerContent);