import React from 'react';
import { InputAdornment, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    margin: '1rem',
    width: '5rem'
  },
  slider: {
    width: '150px'
  }
}));

export default function Vehicle(props) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete="off">
      {Object.keys(props.vehicles).map(vehicleName => {
        let splitted = vehicleName.split('_');
        let formattedName = splitted[splitted.length - 2]
          .replace('D', 'DIESEL')
          .replace('G', 'BENZIN') + ' ' + splitted.pop();

        return <TextField
          className={classes.textField}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
            inputProps: { min: "0", max: "100", step: "1" }
          }}
          key={vehicleName}
          id={vehicleName}
          helperText={formattedName}
          value={Number(props.vehicles[vehicleName] * 100).toFixed(2).toString()}
          onChange={event => props.handleDistChange(event, vehicleName)}
          type="number"
          margin="normal" />
      })}
    </form>
  )
};