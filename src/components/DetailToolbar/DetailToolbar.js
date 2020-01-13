import React from 'react';
import { IconButton, makeStyles, Slide, Toolbar, Tooltip } from '@material-ui/core';
import { ChevronLeft, Settings, Timeline } from '@material-ui/icons'
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router';


const useStyles = makeStyles((theme) => ({
  toolBar: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));

export default function DetailToolbar() {
  const classes = useStyles();
  let history = useHistory();
  let toolbarActive = !useRouteMatch('/').isExact;

  const handleNext = route => {
    history.push(route)
  };

  return (
    <Slide appear={false} direction="down" in={toolbarActive}>
      <Toolbar className={classes.toolBar}>
        <IconButton color="inherit" edge="start" onClick={() => history.goBack()}>
          <ChevronLeft />
        </IconButton>
        <Tooltip title="Traffic and air quality details" placement="bottom">
          <IconButton color="inherit" onClick={() => handleNext('/detail')}>
            <Timeline />
          </IconButton>
        </Tooltip>
        <Tooltip title="Adjust Prediction Settings" placement="bottom">
          <IconButton color="inherit" edge="end" onClick={() => handleNext('/settings')}>
            <Settings />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </Slide>
  )
}