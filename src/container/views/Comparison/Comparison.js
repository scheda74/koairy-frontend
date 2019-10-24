import React from 'react';
import { makeStyles, Divider } from '@material-ui/core';
import DeviceMap from '../../../components/Map/DeviceMap';


const useStyles = makeStyles(() => ({
  splitContainer: {
    display: 'flex',
    width: 'inherit',
    height: 'inherit'
  },
  side: {
    width: '50%',
    height: '100%'
  },
  divider: {
    border: 'solid 2px white'
  }
}));

export default function Comparison() {
  const classes = useStyles();
  return (
    <div className={classes.splitContainer}>
      <div className={classes.side}>
        <DeviceMap />
      </div>
      <Divider orientation="vertical" className={classes.divider} />
      <div className={classes.side}>
        <DeviceMap />
      </div>
    </div>
  )
}