import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Areas from './Areas/Areas';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

const useStyles = makeStyles(theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }
}));

function subtractFromArea(areas, name, value) {
  const changedAreaIndex = areas.findIndex(p => p.name === name);
  const filtered = areas.filter(p => p.name !== name);

  filtered.forEach(area => {
    const newVal = area.value - value;
    area.value = newVal > 0 ? newVal : area.value;
  });
  filtered.push(areas[changedAreaIndex]);
  return filtered;
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
    if (event.target.value > 1) return;
    const areaIndex = state.srcWeights.findIndex(p => p.name === name);
    const areaWeight = {
      ...state.srcWeights[areaIndex]
    };

    areaWeight.value = event.target.value;

    let weights = [...state.srcWeights];
    weights[areaIndex] = areaWeight;

    const sum = weights.reduce((sum, area) => parseFloat(sum) + parseFloat(area.value), 0);
    console.log("sum: " + sum);

    if (sum > 1) {
      weights = subtractFromArea(weights, name, event.target.value / 10);
      console.log(weights)
    }

    setState({ ...state, srcWeights: weights })
  };

  const handleDstWeightChange = (event, name) => {
    if (event.target.value > 1) return;
    const areaIndex = state.dstWeights.findIndex(p => p.name === name);
    const areaWeight = {
      ...state.dstWeights[areaIndex]
    };

    areaWeight.value = event.target.value;

    const weights = [...state.dstWeights];
    weights[areaIndex] = areaWeight;
    setState({...state, dstWeights: weights })
  };

  return (
    <div>
      <div className={classes.drawerHeader}>
        <IconButton onClick={props.closeDrawer}>
          {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>

      <Divider />

      <ExpansionPanel expanded={state.expanded === 'srcPanel'} onChange={handlePanelChange('srcPanel')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Area Weights - Source</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Areas areas={state.srcWeights} handleWeightChange={handleSrcWeightChange} />
        </ExpansionPanelDetails>
      </ExpansionPanel>


      <Divider />

      <ExpansionPanel expanded={state.expanded === 'dstPanel'} onChange={handlePanelChange('dstPanel')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Area Weights - Destination</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Areas areas={state.dstWeights} handleWeightChange={handleDstWeightChange} />
        </ExpansionPanelDetails>
      </ExpansionPanel>


      {/*<List>*/}
        {/*{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
          {/*<ListItem button key={text}>*/}
            {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
            {/*<ListItemText primary={text} />*/}
          {/*</ListItem>*/}
        {/*))}*/}
      {/*</List>*/}

      {/*<Divider />*/}

      {/*<List>*/}
        {/*{['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
          {/*<ListItem button key={text}>*/}
            {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
            {/*<ListItemText primary={text} />*/}
          {/*</ListItem>*/}
        {/*))}*/}
      {/*</List>*/}
    </div>
  );
}