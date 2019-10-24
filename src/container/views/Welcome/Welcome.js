import { makeStyles } from '@material-ui/core';
import React from 'react';
import { caqiData } from '../../../assets/data/newCaqiData';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  }
}));

let points = [];
for ( const key in caqiData ) {
  points.push([caqiData[key].lng, caqiData[key].lat, caqiData[key].CAQI / 100]);
}

export default function Welcome() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <div>
      Hello
    </div>
  );
}