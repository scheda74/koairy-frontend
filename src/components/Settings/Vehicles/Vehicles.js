import React from 'react';
import { makeStyles } from '@material-ui/core';
// import Slider from '@material-ui/core/Slider';
// import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';

import Vehicle from './Vehicle/Vehicle';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
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
  const sum = parseInt(Object.values(props.vehicles).reduce((sum, val) => parseFloat(sum) + parseFloat(val), 0) * 100);

  return (
    <div className={classes.container}>
      <Typography align='center' variant="overline" className={classes.heading}>Vehicle Classes</Typography>
      <Divider />
      <div>
        <Vehicle vehicles={props.vehicles} handleDistChange={props.handleDistChange} />
      </div>
      <Typography align='center' variant="overline">Sum: {sum} %</Typography>
    </div>
  )
};