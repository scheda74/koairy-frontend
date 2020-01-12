import React, { useState } from 'react';
import { makeStyles, Slider, Typography, IconButton, Popover, Tooltip } from '@material-ui/core';
import { Layers, LayersClear, Settings } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  settingsContainer: {
    position: 'fixed',
    zIndex: '1000 !important',
    // top: '20%',
    bottom: '5%',
    left: '2%',
    backgroundColor: '#424242',
    width: '3rem',
    borderRadius: '32px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      top: '3%',
      right: '1%',
      left: 'unset',
      bottom: 'unset'
    }
  },
  overlayContainer: {
    width: '400px',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    bottom: 0,
    right: 0,
    margin: '2rem',
    zIndex: '1000 !important',
    backgroundColor: '#424242',
    borderRadius: '8px'
  },
  buttonContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  switch: {
    margin: '0.5rem 1rem'
  },
  sliderContainer: {
    // width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '2rem 1rem 1rem 1rem',
  },
  slider: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem',
    width: '90%'
  },
  popover: {
    marginLeft: '1rem'
  },
  tool: {
    fontSize: '16px'
  }
}));

export default function Overlay(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const sliders = (
    <div className={classes.sliderContainer}>
      <div className={classes.slider}>
        <Typography align="center" id="discrete-slider" gutterBottom variant="overline">
          Blur
        </Typography>
        <Slider
          onChangeCommitted={(event, value) => props.blurChange(value)}
          color="primary"
          style={{width: '200px'}}
          defaultValue={20}
          // getAriaValueText={}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={1}
          marks
          min={0}
          max={40}
        />
      </div>
      <div className={classes.slider}>
        <Typography id="discrete-slider" gutterBottom variant="overline">
          Radius
        </Typography>
        <Slider
          onChangeCommitted={(event, value) => props.radiusChange(value)}
          color="primary"
          style={{width: '200px'}}
          defaultValue={15}
          // getAriaValueText={}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={1}
          marks
          min={0}
          max={30}
        />
      </div>
      <div className={classes.slider}>
        <Typography id="discrete-slider" gutterBottom variant="overline">
          Opacity
        </Typography>
        <Slider
          onChangeCommitted={(event, value) => props.opacityChange(value)}
          color="primary"
          style={{width: '200px'}}
          defaultValue={0.2}
          // getAriaValueText={}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={0.1}
          marks
          min={0}
          max={1}
        />
      </div>
      <div className={classes.slider}>
        <Typography id="discrete-slider" gutterBottom variant="overline">
          Maximum
        </Typography>
        <Slider
          onChangeCommitted={(event, value) => props.maximumChange(value)}
          color="primary"
          style={{width: '200px'}}
          defaultValue={100}
          // getAriaValueText={}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={1}
          marks
          min={0}
          max={400}
        />
      </div>
    </div>
  );


  return (
    <Tooltip disableFocusListener
             title="Here you can toggle and adjust a heat map showing simulated traffic"
             classes={{ tooltip: classes.tool }}>
      <div className={classes.settingsContainer}>
          <IconButton
            disabled={!props.isTrafficAvailable}
            color="inherit"
            aria-label="toggle heatmap"
            edge="end"
            onClick={props.toggleHeatMap}
          >
            {props.showHeatMap ? <LayersClear /> : <Layers />}
          </IconButton>
          <IconButton
            disabled={!props.showHeatMap}
            color="inherit"
            aria-label="toggle traffic"
            edge="end"
            onClick={handleClick}
          >
            <Settings />
          </IconButton>
          <Popover
            className={classes.popover}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {sliders}
          </Popover>
      </div>
    </Tooltip>
  );
}