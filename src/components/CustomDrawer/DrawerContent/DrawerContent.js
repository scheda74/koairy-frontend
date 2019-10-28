import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Button from '@material-ui/core/Button';
import Areas from './Areas/Areas';
import WeatherScenarios from './WeatherScenarios/WeatherScenarios';
import Vehicles from './Vehicles/Vehicles';
import Typography from '@material-ui/core/Typography';
import connect from 'react-redux/es/connect/connect';
import { DeviceMap } from '../../Map/DeviceMap';
import { setSimulationParameter, startSimulation } from '../../../store/actions/simulationActions';

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

function subtractFromArea(areas, name, value) {
  const filteredIndex = areas.findIndex(p => p.name !== name && p.value >= value);
  console.log(filteredIndex);
  if (filteredIndex === -1) {
    return subtractFromArea(areas, name, value / 2);
    // return areas;
  }
  areas[filteredIndex].value -= value;
  return areas;
}

function calcWeightSum(weights) {
  return weights.reduce((sum, area) => parseFloat(sum) + parseFloat(area.value), 0);
}


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
      srcWeights: weightType === 'src' ? weights : props.srcWeights,
      dstWeights: weightType === 'dst' ? weights : props.dstWeights,
      vehicleNumber: 9500,
      vehicleDistribution: [],
      weatherScenario: 0,
      timesteps: 10800
    })

    // const areaIndex = props.srcWeights.findIndex(p => p.name === name);
    // const areaWeight = { ...props.srcWeights[areaIndex] };
    //
    // areaWeight.value = event.target.value / 100.0;
    //
    // let weights = [...props.srcWeights];
    // weights[areaIndex] = areaWeight;
    //
    // props.setSimulationParameters({
    //   srcWeights: weights,
    //   dstWeights: props.dstWeights,
    //   vehicleNumber: 9500,
    //   vehicleDistribution: [],
    //   weatherScenario: 0
    // })

    // const weights = {...props.dstWeights};
    // weights[areaName] = event.target.value / 100.0;
    // console.log("weights");
    // console.log(weights);
    // props.setSimulationParameters({
    //   srcWeights: props.srcWeights,
    //   dstWeights: weights,
    //   vehicleNumber: 9500,
    //   vehicleDistribution: [],
    //   weatherScenario: 0,
    //   timesteps: 10800
    // })
  };

  // const srcSum = parseInt(srcWeights.reduce((sum, area) => parseFloat(sum) + parseFloat(area.value), 0) * 100);
  // const dstSum = parseInt(dstWeights.reduce((sum, area) => parseFloat(sum) + parseFloat(area.value), 0) * 100);

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
             areas={props.srcWeights}
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
             areas={props.dstWeights}
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

      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.margin}
          onClick={() => props.startSimulationWith({
            srcWeights: props.srcWeights,
            dstWeights: props.dstWeights,
            vehicleNumber: 9500,
            vehicleDistribution: [],
            weatherScenario: 0,
            timesteps: 10800
          })}
        >
          Start Simulation
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    srcWeights: state.simulation.srcWeights,
    dstWeights: state.simulation.dstWeights
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSimulationParameters: (params) => dispatch(setSimulationParameter(params)),
    startSimulationWith: (params) => dispatch(startSimulation(params))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerContent);