import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Settings } from '@material-ui/icons';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles(() => ({
  settingsContainer: {
    position: 'fixed',
    zIndex: '1000 !important',
    top: '20%',
    left: '2%',
    backgroundColor: '#424242',
    width: '3rem',
    borderRadius: '32px'
  },
  overlayContainer: {
    width: '400px',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    bottom: 0,
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
          defaultValue={4}
          // getAriaValueText={}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={1}
          marks
          min={0}
          max={20}
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
          defaultValue={10}
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
          max={200}
        />
      </div>
    </div>
  );


  return (
    <div className={classes.settingsContainer}>
      <IconButton
        disabled={props.air}
        color="inherit"
        aria-label="toggle traffic"
        edge="end"
        onClick={handleClick}
      >
        <Settings />
      </IconButton>
      <Popover
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
  );

  // return (
    {/*<div className={classes.overlayContainer}>*/}
      {/*<div className={classes.buttonContainer}>*/}
        {/*<IconButton*/}
          {/*disabled={props.air}*/}
          {/*color="inherit"*/}
          {/*aria-label="toggle traffic"*/}
          {/*edge="end"*/}
          {/*onClick={props.toggleTraffic}*/}
        {/*>*/}
          {/*{props.traffic ? <LayersClear /> : <Layers />}*/}
        {/*</IconButton>*/}
        {/*<IconButton*/}
          {/*disabled={props.traffic}*/}
          {/*color="inherit"*/}
          {/*aria-label="toggle air"*/}
          {/*edge="end"*/}
          {/*onClick={props.toggleAir}*/}
        {/*>*/}
          {/*{props.air ? <CloudOff /> : <Cloud />}*/}
        {/*</IconButton>*/}
        {/*<IconButton*/}
          {/*disabled={props.air}*/}
          {/*color="inherit"*/}
          {/*aria-label="toggle traffic"*/}
          {/*edge="end"*/}
          {/*onClick={togglePopOver}*/}
        {/*>*/}
          {/*{props.traffic ? <Settings /> : <Settings />}*/}
        {/*</IconButton>*/}
        {/*<Popover*/}
          {/*anchorOrigin={{*/}
            {/*vertical: 'top',*/}
            {/*horizontal: 'right',*/}
          {/*}}*/}
          {/*transformOrigin={{*/}
            {/*vertical: 'top',*/}
            {/*horizontal: 'left',*/}
          {/*}}*/}
        {/*>*/}
          {/*{sliders}*/}
        {/*</Popover>*/}
        {/*<FormControlLabel*/}
          {/*control={<Switch className={classes.switch} checked={props.traffic} onChange={props.toggleTraffic} />}*/}
          {/*label="Traffic"*/}
        {/*/>*/}
        {/*<FormControlLabel*/}
          {/*control={<Switch className={classes.switch} checked={props.air} onChange={props.toggleAir} />}*/}
          {/*label="Emissions"*/}
        {/*/>*/}
      {/*</div>*/}
      {/*<ExpansionPanel style={{backgroundColor: 'inherit !important'}} expanded={props.traffic || props.air} onChange={() => console.log("this changed")}>*/}
        {/*<ExpansionPanelSummary*/}
          {/*expandIcon={<ExpandMoreIcon />}*/}
          {/*aria-controls='content'*/}
          {/*id='header'>*/}
          {/*<Typography variant='h6'>HeatMap Settings</Typography>*/}
        {/*</ExpansionPanelSummary>*/}
        {/*<ExpansionPanelDetails>*/}
          {/*{sliders}*/}
        {/*</ExpansionPanelDetails>*/}
      {/*</ExpansionPanel>*/}
    {/*</div>*/}
  // )
}