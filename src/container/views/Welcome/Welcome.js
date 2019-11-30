import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  }
}));


export default function Welcome() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <div>
      Hello
    </div>
  );
}