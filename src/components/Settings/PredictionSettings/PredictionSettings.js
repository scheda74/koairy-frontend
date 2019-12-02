import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';

import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
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
  // const [state, setState] = React.useState({
  //   startDate: new Date('2019-08-01'),
  //   endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
  //   startHour: new Date().setHours(0,0,0,0),
  //   endHour: new Date().setHours(23,0,0,0)
  // });

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
            value={new Date(props.startDate)}
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
            value={new Date(props.endDate)}
            onChange={(date) => props.handleDateChange('endDate', date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Start Time picker"
            value={props.startHour}
            onChange={(date) => props.handleDateChange('startHour', date)}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
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
              <MenuItem value='lstm'>Long Short Term Memory</MenuItem>
              <MenuItem value='lin-reg'>Linear Regression</MenuItem>
              <MenuItem value='mlp'>Multi-Layer-Perceptron Regressor</MenuItem>
            </Select>
            <FormHelperText>Please select a wind level</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormLabel component="legend">What to predict?</FormLabel>
            <Select
              value={props.output_key || ''}
              onChange={props.handleSingleChange('output_key')}
              inputProps={{
                name: 'pollutant',
                id: 'pollutant-select'
              }}
            >
              <MenuItem value='pm10'>PM10</MenuItem>
              <MenuItem value='pm2.5'>PM2.5</MenuItem>
              <MenuItem value='no2'>NO2</MenuItem>
            </Select>
            <FormHelperText>Please select a wind level</FormHelperText>
          </FormControl>
        </FormGroup>
      </MuiPickersUtilsProvider>
    </div>
  )
};
{/*<FormControl className={classes.formControl}>*/}
  {/*<FormLabel component="legend">Prediction Model</FormLabel>*/}
  {/*<TextField*/}
    {/*id='model'*/}
    {/*value={props.predictionModel || ''}*/}
    {/*onChange={props.handleSingleChange('predictionModel')}*/}
    {/*type="text"*/}
    {/*margin="none" />*/}
  {/*<FormHelperText>Please specify a prediction model</FormHelperText>*/}
{/*</FormControl>*/}