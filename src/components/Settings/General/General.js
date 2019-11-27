import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  formContainer: {
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'space-around',
  },
  formControl: {
    margin: '0.5rem',
    // width: '30%'
  }
}));

export default function General(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="overline" align='center' className={classes.heading}>General Simulation Settings</Typography>
      <Divider />
      <div className={classes.formContainer}>
        <FormGroup >
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
      </div>
    </div>
  )
};