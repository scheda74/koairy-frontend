import React from 'react';
import {
  Divider,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  formControl: {
    margin: '0.5rem',
  }
}));

export default function General(props) {
  const classes = useStyles();
  // TODO: add selection of vehicle number: either default --> bremicker or user selects a few hours.. needs backend too though
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
      </div>
    </div>
  )
};