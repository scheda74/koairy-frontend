import React from 'react';
import DeviceMap from '../../../components/Map/DeviceMap';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  mapContainer: {
    width: '100vw'
  }
}));

export default function MapContainer() {
  const classes = useStyles();
  return (
    <div className={classes.mapContainer}>
      <DeviceMap />
    </div>
  )
}