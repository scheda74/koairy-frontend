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

export default function DrawerContent(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    srcWeights: [
      {name: 'aschheim_west', value: 0.1},
      {name: 'ebersberg_east', value: 0.37},
      {name: 'feldkirchen_west', value: 0.1},
      {name: 'heimstetten_industrial_1', value: 0.01},
      {name: 'heimstetten_industrial_2', value: 0.01},
      {name: 'heimstetten_residential', value: 0.18},
      {name: 'kirchheim_industrial_east', value: 0.01},
      {name: 'kirchheim_industrial_west', value: 0.01},
      {name: 'kirchheim_residential', value: 0.16},
      {name: 'unassigned_edges', value: 0.05}
    ],
    dstWeights: [
      {name: 'aschheim_west', value: 0.16},
      {name: 'ebersberg_east', value: 0.07},
      {name: 'feldkirchen_west', value: 0.16},
      {name: 'heimstetten_industrial_1', value: 0.14},
      {name: 'heimstetten_industrial_2', value: 0.14},
      {name: 'heimstetten_residential', value: 0.06},
      {name: 'kirchheim_industrial_east', value: 0.06},
      {name: 'kirchheim_industrial_west', value: 0.11},
      {name: 'kirchheim_residential', value: 0.05},
      {name: 'unassigned_edges', value: 0.05}
    ],
    expanded: false
  });

  const handlePanelChange = panel => (event, isExpanded) => {
    setState({...state, expanded: isExpanded ? panel : false});
  };

  const handleSrcWeightChange = (event, name) => {
    if (event.target.value > 100) return;
    const areaIndex = state.srcWeights.findIndex(p => p.name === name);
    const areaWeight = {
      ...state.srcWeights[areaIndex]
    };

    areaWeight.value = event.target.value / 100.0;

    let weights = [...state.srcWeights];
    weights[areaIndex] = areaWeight;

    const sum = calcWeightSum(weights);
    console.log("sum: " + sum);

    if (sum > 1) {
      weights = subtractFromArea(weights, name, sum - 1);
      console.log(weights)
    }

    setState({ ...state, srcWeights: weights })
  };

  const handleDstWeightChange = (event, name) => {
    if (event.target.value > 100) return;
    const areaIndex = state.dstWeights.findIndex(p => p.name === name);
    const areaWeight = {
      ...state.dstWeights[areaIndex]
    };

    areaWeight.value = event.target.value / 100.0;

    let weights = [...state.dstWeights];
    weights[areaIndex] = areaWeight;

    const sum = calcWeightSum(weights);
    console.log("sum: " + sum);

    if (sum > 1) {
      weights = subtractFromArea(weights, name, sum - 1);
      console.log(weights)
    }

    setState({...state, dstWeights: weights })
  };

  const srcSum = parseInt(state.srcWeights.reduce((sum, area) => parseFloat(sum) + parseFloat(area.value), 0) * 100);
  const dstSum = parseInt(state.dstWeights.reduce((sum, area) => parseFloat(sum) + parseFloat(area.value), 0) * 100);

  return (
    <div>
      <div className={classes.drawerHeader}>
        <IconButton onClick={props.closeDrawer}>
          {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <Typography variant="caption">SIMULATION PARAMETERS</Typography>
      </div>
      <Divider />
      <Areas expanded={state.expanded}
             areas={state.srcWeights}
             id="srcPanel"
             handleWeightChange={handleSrcWeightChange}
             handlePanelChange={handlePanelChange}
             title="Area Weights - Source"
             sum={srcSum} />
      <Divider/>
      <Areas expanded={state.expanded}
             areas={state.dstWeights}
             id="dstPanel"
             handleWeightChange={handleDstWeightChange}
             handlePanelChange={handlePanelChange}
             title="Area Weights - Destination"
             sum={dstSum} />
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
        <Button variant="contained" size="large" color="primary" className={classes.margin}>
          Start Simulation
        </Button>
      </div>

      {/*<ExpansionPanel>*/}
        {/*<ExpansionPanelSummary>*/}
          {/*<div>*/}
            {/*<Typography variant="h6">Upload Road Network File</Typography>*/}
            {/*<Typography variant="caption">Default: Kirchheim OSM</Typography>*/}
          {/*</div>*/}
          {/*<div>*/}
            {/*<input*/}
              {/*accept="application/*"*/}
              {/*className={classes.input}*/}
              {/*id="contained-button-file"*/}
              {/*multiple*/}
              {/*type="file"*/}
            {/*/>*/}
            {/*<label htmlFor="contained-button-file">*/}
              {/*<Button variant="contained" component="span" className={classes.button}>*/}
                {/*Choose*/}
              {/*</Button>*/}
            {/*</label>*/}
          {/*</div>*/}
        {/*</ExpansionPanelSummary>*/}
      {/*</ExpansionPanel>*/}



    </div>
  );
}