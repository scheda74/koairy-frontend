import React from 'react';
import DrawerContent from './DrawerContent/DrawerContent';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core';

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function CustomDrawer(props) {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <DrawerContent closeDrawer={props.handleClose} />
    </Drawer>
  )
};