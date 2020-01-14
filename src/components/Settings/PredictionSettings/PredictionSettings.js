import React from 'react';
import {
  Divider,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  formControl: {
    margin: '1rem'
  }
}));

export default function PredictionSettings(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography align='center' variant="overline" className={classes.heading}>Prediction Settings - Training Data</Typography>
      <Divider />
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
            value={props.startDate}
            onChange={(date) => props.handleDateChange('startDate', date)}
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
            value={props.endDate}
            onChange={(date) => props.handleDateChange('endDate', date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker-start"
            label="Start Time picker"
            value={props.startHour}
            onChange={(date) => props.handleDateChange('startHour', date)}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker-end"
            label="End Time picker"
            value={props.endHour}
            onChange={(date) => props.handleDateChange('endHour', date)}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
          <FormControl className={classes.formControl}>
            <FormLabel component="legend">Prediction Model</FormLabel>
            <Select
              value={props.predictionModel || ''}
              onChange={props.handleSingleChange('predictionModel')}
              inputProps={{
                name: 'model',
                id: 'model-select'
              }}
            >
              {/*<MenuItem value='lstm'>Long Short Term Memory</MenuItem>*/}
              <MenuItem value='lin-reg'>Linear Regression</MenuItem>
              <MenuItem value='mlp'>Multi-Layer-Perceptron Regressor</MenuItem>
            </Select>
            <FormHelperText>Please select a model used to predict</FormHelperText>
          </FormControl>
        </FormGroup>
      </MuiPickersUtilsProvider>
    </div>
  )
};