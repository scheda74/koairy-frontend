import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
// import Slider from '@material-ui/core/Slider';
// import InputAdornment from '@material-ui/core/InputAdornment';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
}));

export default function Vehicles(props) {
  const classes = useStyles();


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
        <div>Hello</div>
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Typography variant="overline">%%%</Typography>
      </ExpansionPanelActions>
    </ExpansionPanel>
  )
};