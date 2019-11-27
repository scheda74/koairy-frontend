import { Card, Divider, makeStyles } from '@material-ui/core';
import DeviceMap from '../../../components/Map/DeviceMap';
import React from 'react';
import Settings from '../../../components/Settings/Settings';
import HeatMapSettings from '../../../components/Settings/HeatMapSettings/HeatMapSettings';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';


const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh'
  },
  subToolbar: {
    width: '100%',
    height: '64px'
  },
  introduction: {

  },
  mapContainer: {
    // width: '100vw'
    flexBasis: '40%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem 0',
  },
  mapCard: {
    // display: 'flex',
    // margin: 'auto',
    marginLeft: '1rem',
    width: '80%',
    height: '100%'
  },
  card: {
    // width: '20%',
    margin: '0 1rem'
  },
  settingsContainer: {
    flexBasis: '60%',
    display: 'flex',
    justifyContent: 'start',
    margin: '0.5rem auto',
    // width: '80%'
    // alignItems: 'center'
  },
}));

export default function Prediction() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    blur: 4,
    opacity: 0.2,
    radius: 10,
    maximum: 1,
    isActive: false
  });

  const onBlurChange = (value) => {
    setState({...state, blur: value })
  };

  const onRadiusChange = (value) => {
    setState({...state, radius: value })
  };

  const onOpacityChange = (value) => {
    setState({...state, opacity: value })
  };

  const onMaximumChange = (value) => {
    setState({...state, maximum: value / 100 })
  };

  const toggleSettings = () => {
    setState({...state, isActive: !state.isActive })
  };

  return (
    <div className={classes.mainContainer}>
      {/*<div className={classes.subToolbar}>*/}
        {/*<span>second toolbar</span>*/}
      {/*</div>*/}
      <div className={classes.mapContainer}>
        <Card raised={true} className={classes.mapCard}>
          <DeviceMap />
          {/*<span>hello</span>*/}
        </Card>
        <Card raised={true} className={classes.card}>
          <Button>
            <Typography variant="overline" align='center' className={classes.heading}>HeatMap Settings</Typography>
          </Button>
          <HeatMapSettings blurChange={onBlurChange}
                           radiusChange={onRadiusChange}
                           opacityChange={onOpacityChange}
                           maximumChange={onMaximumChange} />
        </Card>
      </div>
      <Divider />
      <div className={classes.settingsContainer}>
        {state.isActive ? (
          <Settings />
          ) : (
          <div className={classes.introduction}>
            <Typography variant="h4" align='center'>Welcome to Koairy!</Typography>
            <Typography variant="subtitle1" align='center'>You can simulate emissions and predict air quality</Typography>
            <Button color='primary' variant='contained'>Start Predicting!</Button>
            <Button>Start Simulating!</Button>
            <IconButton><SettingsIcon /></IconButton>
          </div>
        )}

      </div>
    </div>
  )
}