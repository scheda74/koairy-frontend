import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import { Link } from 'react-router-dom';
import { Map, Compare, Timeline } from '@material-ui/icons';

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
    color: 'inherit',
    textDecoration: 'none'
  },
  hide: {
    display: 'none',
  },
}));

export default function CustomToolbar(props) {
  const classes = useStyles();

  return (
    <AppBar
      color="secondary"
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.open,
      })}
    >
      <Toolbar>
        <Link to="/" className={classes.title}>
          <Typography variant="h6" noWrap>
            EM-ViZ
          </Typography>
        </Link>
        <Link to="/map" className={classes.title}>
          <IconButton
            color="inherit"
            aria-label="map"
            edge="end"
            // onClick={() => console.log("routes should go here")}
          >
            <Map />
          </IconButton>
        </Link>
        <Link to="/compare" className={classes.title}>
          <IconButton
            color="inherit"
            aria-label="compare"
            edge="end"
            // onClick={() => console.log("routes should go here")}
          >
            <Compare />
          </IconButton>
        </Link>
        <Link to="/analysis" className={classes.title}>
          <IconButton
            color="inherit"
            aria-label="analysis"
            edge="end"
            // onClick={() => console.log("routes should go here")}
          >
            <Timeline />
          </IconButton>
        </Link>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={props.handleOpen}
          className={clsx(props.open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}