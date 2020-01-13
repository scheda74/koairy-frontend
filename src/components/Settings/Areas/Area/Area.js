import React from 'react';
import { InputAdornment, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  textField: {
    margin: '0.5rem 0.75rem',
    width: '3.5rem'
  },
  sliderContainer: {
    width: '350px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem 0'
  },
  slider: {
    width: '150px'
  }
}));


export default function Area(props) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete="off">
      {Object.keys(props.areas).map(areaName => {
        const formattedName = areaName
          .replace(/_/g, ' ')
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');

        return <TextField
          className={classes.textField}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
            inputProps: { min: "0", max: "100", step: "1" }
          }}
          key={areaName}
          id={areaName}
          helperText={formattedName}
          value={parseInt(props.areas[areaName] * 100).toString()}
          onChange={event => props.handleWeightChange(event, props.weightType, areaName)}
          type="number"
          margin="normal" />
      })}
    </form>
  )
};