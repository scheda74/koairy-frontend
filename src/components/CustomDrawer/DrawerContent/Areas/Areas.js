import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/core/Slider';
// import InputAdornment from '@material-ui/core/InputAdornment';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Area from './Area/Area';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    margin: '2rem',
    width: '5rem'
  },
  sliderContainer: {
    width: '350px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem 0'
  },
  slider: {
    width: '150px'
  }
}));

export default function Areas(props) {
  const classes = useStyles();

  return (
    <ExpansionPanel expanded={props.expanded === props.id} onChange={props.handlePanelChange(props.id)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${props.id}-content`}
        id={`${props.id}-header`}
      >
        <Typography className={classes.heading}>{props.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Area areas={props.areas} handleWeightChange={props.handleWeightChange} />
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Typography variant="overline">Sum: {props.sum} %</Typography>
      </ExpansionPanelActions>
    </ExpansionPanel>
  )
};