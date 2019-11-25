import React from 'react';
import { makeStyles } from '@material-ui/core';
// import Slider from '@material-ui/core/Slider';
// import InputAdornment from '@material-ui/core/InputAdornment';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';

import Vehicle from './Vehicle/Vehicle';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  formControl: {
    margin: '0.5rem'
  }
}));

export default function Vehicles(props) {
  const classes = useStyles();
  const sum = parseInt(Object.values(props.vehicles).reduce((sum, val) => parseFloat(sum) + parseFloat(val), 0) * 100);

  return (
    <ExpansionPanel expanded={props.expanded === props.id} onChange={props.handlePanelChange(props.id)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${props.id}-content`}
        id={`${props.id}-header`}
      >
        <Typography className={classes.heading}>Vehicle Classes</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ExpansionPanelDetails className={classes.container}>
          <Vehicle vehicles={props.vehicles} handleDistChange={props.handleDistChange} />
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Typography variant="overline">Sum: {sum} %</Typography>
        </ExpansionPanelActions>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
};