import React from 'react';
import { makeStyles } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Cloud, CloudOff, Layers, LayersClear } from '@material-ui/icons';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/core/SvgIcon/SvgIcon';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const useStyles = makeStyles(() => ({
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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem'
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
  const sliders = (
    <div className={classes.sliderContainer}>
      <div className={classes.slider}>
        <Typography align="center" id="discrete-slider" gutterBottom variant="overline">
          Blur
        </Typography>
        <Slider
          onChangeCommitted={(event, value) => props.blurChange(value)}
          color="secondary"
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
          color="secondary"
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
          color="secondary"
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
          color="secondary"
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
    <div className={classes.overlayContainer}>
      <div className={classes.buttonContainer}>
        <IconButton
          disabled={props.air}
          color="inherit"
          aria-label="toggle traffic"
          edge="end"
          onClick={props.toggleTraffic}
        >
          {props.traffic ? <LayersClear /> : <Layers />}
        </IconButton>
        <IconButton
          disabled={props.traffic}
          color="inherit"
          aria-label="toggle air"
          edge="end"
          onClick={props.toggleAir}
        >
          {props.air ? <CloudOff /> : <Cloud />}
        </IconButton>
        {/*<FormControlLabel*/}
          {/*control={<Switch className={classes.switch} checked={props.traffic} onChange={props.toggleTraffic} />}*/}
          {/*label="Traffic"*/}
        {/*/>*/}
        {/*<FormControlLabel*/}
          {/*control={<Switch className={classes.switch} checked={props.air} onChange={props.toggleAir} />}*/}
          {/*label="Emissions"*/}
        {/*/>*/}
      </div>
      <ExpansionPanel style={{backgroundColor: 'inherit !important'}} expanded={props.traffic || props.air} onChange={() => console.log("this changed")}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='content'
          id='header'>
          <Typography variant='h6'>HeatMap Settings</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {sliders}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}