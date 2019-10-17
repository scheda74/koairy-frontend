import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '5rem'
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

function valueText(value) {
  return `${value}%`;
}

export default function Areas(props) {
  const classes = useStyles();

  const sliders = props.areas.map(area => {
    const formattedName = area.name
      .replace(/_/g, ' ')
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return (
      <div className={classes.sliderContainer}>
        <Typography id="discrete-slider" gutterBottom variant="overline">
          {formattedName}
        </Typography>
        <Slider
          className={classes.slider}
          defaultValue={parseInt(area.value * 100)}
          getAriaValueText={valueText}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={1}
          marks
          min={0}
          max={100}
        />
      </div>
    )
  });

  return (
    <form className={classes.container} noValidate autoComplete="off">
      {/*{sliders}*/}
      {props.areas.map(area => {
        const formattedName = area.name
          .replace(/_/g, ' ')
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');

        return <TextField
          className={classes.textField}
          InputProps={ {inputProps: { min: "0", max: "100", step: "1" }} }
          key={area.name}
          id={area.name}
          helperText={formattedName}
          value={parseInt(area.value * 100).toString()}
          onChange={event => props.handleWeightChange(event, area.name)}
          type="number"
          margin="normal" />
      })}
    </form>
  )
};