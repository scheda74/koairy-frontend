import React from 'react';
import {
  Divider,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputAdornment,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  selectContainer: {
    display: 'flex',
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

export default function WeatherScenarios(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    sun: 'mild',
    wind: 'normal',
    humidity: 90,
    pressure: 'normal',
    temperature: 15
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  return (
    <div className={classes.container}>
      <Typography align='center' variant="overline" className={classes.heading}>Meteorology</Typography>
      <Divider />
      <FormGroup className={classes.formContainer}>
        <FormControl className={classes.formControl}>
          <FormLabel component="legend">Sun Level</FormLabel>
          <Select
            value={state.sun}
            onChange={handleChange('sun')}
            inputProps={{
              name: 'sun',
              id: 'sun-select',
            }}
          >
            <MenuItem value='strong'>Strong</MenuItem>
            <MenuItem value='mild'>Mild</MenuItem>
            <MenuItem value='cloudy'>Cloudy</MenuItem>
            <MenuItem value='night'>Night</MenuItem>
          </Select>
          <FormHelperText>Please select a sun level</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel component="legend">Temperature</FormLabel>
          <TextField
            className={classes.textField}
            InputProps={{
              endAdornment: <InputAdornment position="end">°C</InputAdornment>,
              inputProps: { min: "0", max: "100", step: "1" }
            }}
            id='temperature'
            value={state.temperature}
            onChange={handleChange('temperature')}
            type="number"
            margin="none" />
          <FormHelperText>Please specify a temperature</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel component="legend">Wind Level</FormLabel>
          <Select
            value={state.sun}
            onChange={handleChange('wind')}
            inputProps={{
              name: 'wind',
              id: 'wind-select'
            }}
          >
            <MenuItem value='strong'>Strong</MenuItem>
            <MenuItem value='mild'>Mild</MenuItem>
            <MenuItem value='still'>Still</MenuItem>
          </Select>
          <FormHelperText>Please select a wind level</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel component="legend">Relative Humidity</FormLabel>
          <TextField
            className={classes.textField}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
              inputProps: { min: "0", max: "100", step: "1" }
            }}
            id='humidity'
            value={state.humidity}
            onChange={handleChange('humidity')}
            type="number"
            margin="none" />
          <FormHelperText>Please specify a relative humidity</FormHelperText>
        </FormControl>
      </FormGroup>
    </div>
  )
};