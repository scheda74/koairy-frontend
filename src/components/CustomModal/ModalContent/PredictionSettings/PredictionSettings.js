import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';

import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  textField: {
    // flexBasis: '50%',
    // marginTop: '1rem'
  },
  formControl: {
    margin: '1rem'
  }
}));

export default function PredictionSettings(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    startDate: new Date('2019-08-01'),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
    startHour: new Date().setHours(0,0,0,0),
    endHour: new Date().setHours(23,0,0,0)
  });

  const handleDateChange = (name, event) => {
    setState({...state, [name]: event.target.value});
  };

  return (
    <ExpansionPanel expanded={props.expanded === props.id} onChange={props.handlePanelChange(props.id)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${props.id}-content`}
        id={`${props.id}-header`}
      >
        <Typography variant="overline" className={classes.heading}>General Prediction Settings</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.container}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <FormGroup className={classes.formContainer}>
              <KeyboardDatePicker
                className={classes.picker}
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                id="date-picker-inline"
                label="Start Date"
                value={state.startDate}
                onChange={(event) => handleDateChange('startDate', event)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                id="end-date"
                label="End Date"
                value={state.endDate}
                onChange={(event) => handleDateChange('endDate', event)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Start Time picker"
                value={state.startHour}
                onChange={(event) => handleDateChange('startHour', event)}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="End Time picker"
                value={state.endHour}
                onChange={(event) => handleDateChange('endHour', event)}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
              <FormControl className={classes.formControl}>
                <FormLabel component="legend">Prediction Model</FormLabel>
                <TextField
                  id='model'
                  value={props.predictionModel || ''}
                  onChange={props.handleSingleChange('predictionModel')}
                  type="text"
                  margin="none" />
                <FormHelperText>Please specify a prediction model</FormHelperText>
              </FormControl>
            </FormGroup>
          </MuiPickersUtilsProvider>
          {/*<FormControl className={classes.formControl}>*/}
            {/*<FormLabel component="legend">Simulation Time</FormLabel>*/}
            {/*<TextField*/}
              {/*id='time'*/}
              {/*value={props.timeSteps || ''}*/}
              {/*onChange={props.handleSingleChange('timeSteps')}*/}
              {/*type="number"*/}
              {/*margin="normal" />*/}
            {/*<FormHelperText>Please specify a simulation time in seconds</FormHelperText>*/}
          {/*</FormControl>*/}
          {/*<FormControl className={classes.formControl}>*/}
            {/*<FormLabel component="legend">Prediction Model</FormLabel>*/}
            {/*<TextField*/}
              {/*id='model'*/}
              {/*value={props.vehicleNumber || ''}*/}
              {/*onChange={props.handleSingleChange('predictionModel')}*/}
              {/*type="text"*/}
              {/*margin="normal" />*/}
            {/*<FormHelperText>Please specify a prediction model</FormHelperText>*/}
          {/*</FormControl>*/}

      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
};