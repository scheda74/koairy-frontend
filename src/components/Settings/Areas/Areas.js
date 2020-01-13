import React from 'react';
import { Divider, makeStyles, Typography } from '@material-ui/core';

import Area from './Area/Area';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
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