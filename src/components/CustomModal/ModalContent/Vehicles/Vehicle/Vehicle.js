import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    // flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    flexBasis: '25%',
    margin: '1rem',
    width: '5rem'
  },
  slider: {
    width: '150px'
  }
}));

function valueText(value) {
  return `${value}%`;
}

export default function Vehicle(props) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete="off">
      {/*{sliders}*/}
      {Object.keys(props.vehicles).map(vehicleName => {
        let splitted = vehicleName.split('_');
        let formattedName = splitted[splitted.length - 2]
          .replace('D', 'DIESEL')
          .replace('G', 'BENZIN') + ' ' + splitted.pop()

          // .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          // .join(' ');

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