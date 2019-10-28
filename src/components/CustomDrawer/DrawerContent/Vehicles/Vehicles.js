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
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

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

export default function Vehicles(props) {
  const classes = useStyles();
  // const [state, setState] = {
  //
  // }

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
        <ExpansionPanelDetails className={classes.container}>
          {/*<FormGroup className={classes.formContainer}>*/}
            {/*<FormControl className={classes.formControl}>*/}
              {/*<FormLabel component="legend">Simulation Time</FormLabel>*/}
              {/*<TextField*/}
                {/*id='time'*/}
                {/*value={state.timeSteps}*/}
                {/*onChange={handleChange('timeSteps')}*/}
                {/*type="number"*/}
                {/*margin="normal" />*/}
              {/*<FormHelperText>Please specify a simulation time in seconds</FormHelperText>*/}
            {/*</FormControl>*/}
          {/*</FormGroup>*/}
          {/*<FormGroup>*/}
            {/*<FormControl className={classes.formControl}>*/}
              {/*<FormLabel component="legend">Vehicle Number</FormLabel>*/}
              {/*<TextField*/}
                {/*id='vehicles'*/}
                {/*value={state.vehicleNumber}*/}
                {/*onChange={handleChange('vehicleNumber')}*/}
                {/*type="number"*/}
                {/*margin="normal" />*/}
              {/*<FormHelperText>Please specify a number of simulated vehicles</FormHelperText>*/}
            {/*</FormControl>*/}
          {/*</FormGroup>*/}
          <div>Hello</div>
        </ExpansionPanelDetails>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
};