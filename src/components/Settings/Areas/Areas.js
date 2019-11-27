import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/core/Slider';
// import InputAdornment from '@material-ui/core/InputAdornment';
import Area from './Area/Area';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center'
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    margin: '2rem',
    width: '5rem'
  },
  slider: {
    width: '150px'
  }
}));

export default function Areas(props) {
  const classes = useStyles();
  const sum = Object.values(props.areas).reduce((sum, val) => parseFloat(sum) + parseFloat(val), 0) * 100;
  return (
    <div className={classes.container}>
      <Typography align='center' variant="overline" className={classes.heading}>{props.title}</Typography>
      <Divider />
      <div>
        <Area areas={props.areas} weightType={props.weightType} handleWeightChange={props.handleWeightChange} />
      </div>
      <Typography align='center' variant="overline">Sum: {sum} %</Typography>
    </div>
  )
};