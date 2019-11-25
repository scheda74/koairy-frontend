import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
// import Slider from '@material-ui/core/Slider';
// import InputAdornment from '@material-ui/core/InputAdornment';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  selectContainer: {
    display: 'flex',
    // justifyContent: 'space-around',
  },
  formContainer: {
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: '0.5rem'
  },
  // textField: {
  //   width: '20%'
  // }
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
    <ExpansionPanel expanded={props.expanded === props.id} onChange={props.handlePanelChange(props.id)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${props.id}-content`}
        id={`${props.id}-header`}
      >
        <Typography className={classes.heading}>Meteorology</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.selectContainer}>
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
              margin="normal" />
            <FormHelperText>Please specify a temperature</FormHelperText>
          </FormControl>
        {/*</FormGroup>*/}
        {/*<FormGroup className={classes.formContainer}>*/}
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
            <FormLabel component="legend">Humidity</FormLabel>
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
              margin="normal" />
            <FormHelperText>Please specify a relative humidity</FormHelperText>
          </FormControl>
        </FormGroup>
      </ExpansionPanelDetails>
      {/*<ExpansionPanelActions>*/}
        {/*<Typography variant="overline">%%%</Typography>*/}
      {/*</ExpansionPanelActions>*/}
    </ExpansionPanel>
  )
};