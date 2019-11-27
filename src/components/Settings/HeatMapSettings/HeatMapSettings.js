import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() => ({
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
    justifyContent: 'space-around',
    margin: '1rem 0.5rem',
    width: '100%'
  },
  sliderName: {
    flexBasis: '20%',
    marginRight: '8px'
  },
  singleSlider: {
    flexBasis: '80%',
    width: '200px'
  }
}));

export default function HeatMapSettings(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.sliderContainer}>
      <div className={classes.slider}>
        <Typography id="discrete-slider" gutterBottom variant="overline" className={classes.sliderName}>
          Blur
        </Typography>
        <Slider
          onChangeCommitted={(event, value) => props.blurChange(value)}
          color="primary"
          className={classes.singleSlider}
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
        <Typography id="discrete-slider" gutterBottom variant="overline" className={classes.sliderName}>
          Radius
        </Typography>
        <Slider
          onChangeCommitted={(event, value) => props.radiusChange(value)}
          color="primary"
          // style={{width: '200px'}}
          className={classes.singleSlider}
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
        <Typography id="discrete-slider" gutterBottom variant="overline" className={classes.sliderName}>
          Opacity
        </Typography>
        <Slider
          onChangeCommitted={(event, value) => props.opacityChange(value)}
          color="primary"
          // style={{width: '200px'}}
          className={classes.singleSlider}
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
        <Typography id="discrete-slider" gutterBottom variant="overline" className={classes.sliderName}>
          Maximum
        </Typography>
        <Slider
          onChangeCommitted={(event, value) => props.maximumChange(value)}
          color="primary"
          // style={{width: '200px'}}
          className={classes.singleSlider}
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
  )
}