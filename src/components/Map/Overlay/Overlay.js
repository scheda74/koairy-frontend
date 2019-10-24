import React from 'react';
import { makeStyles } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(() => ({
  overlayContainer: {
    width: '20%',
    height: '10%',
    position: 'absolute',
    left: '0',
    margin: '5rem',
    zIndex: '500',
    backgroundColor: 'rgba(33, 33, 33, 0.75)',
    borderRadius: '8px'
  },
  switch: {
    margin: '0.5rem 1rem'
  }
}));

export default function Overlay(props) {
  const classes = useStyles();
  const [switches, setChecked] = React.useState({traffic: false, air: false});

  return (
    <div className={classes.overlayContainer}>
      <FormGroup>
        <FormControlLabel
          control={<Switch className={classes.switch} checked={props.traffic} onChange={props.toggleTraffic} />}
          label="Traffic"
        />
        <FormControlLabel
          control={<Switch className={classes.switch} checked={props.air} onChange={props.toggleAir} />}
          label="Emissions"
        />
      </FormGroup>
    </div>
  )
}