import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';

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

export default function General(props) {
  const classes = useStyles();
  // const [state, setState] = React.useState({
  //   vehicleNumber: 9500,
  //   timeSteps: 10800
  // });

  // const handleChange = name => event => {
  //   setState({ ...state, [name]: event.target.value });
  // };

  return (
    <ExpansionPanel expanded={props.expanded === props.id} onChange={props.handlePanelChange(props.id)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${props.id}-content`}
        id={`${props.id}-header`}
      >
        <Typography className={classes.heading}>General Settings</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.container}>
        <FormGroup className={classes.formContainer}>
          <FormControl className={classes.formControl}>
            <FormLabel component="legend">Simulation Time</FormLabel>
            <TextField
              id='time'
              value={props.timeSteps || ''}
              onChange={props.handleSingleChange('timeSteps')}
              type="number"
              margin="normal" />
            <FormHelperText>Please specify a simulation time in seconds</FormHelperText>
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl className={classes.formControl}>
            <FormLabel component="legend">Vehicle Number</FormLabel>
            <TextField
              id='vehicles'
              value={props.vehicleNumber || ''}
              onChange={props.handleSingleChange('vehicleNumber')}
              type="number"
              margin="normal" />
            <FormHelperText>Please specify a number of simulated vehicles</FormHelperText>
          </FormControl>
        </FormGroup>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
};