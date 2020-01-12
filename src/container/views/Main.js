import { Card, Divider, makeStyles } from '@material-ui/core';
import React from 'react';
import DetailToolbar from '../../components/DetailToolbar/DetailToolbar';
import Settings from '../../components/Settings/Settings'
import DeviceMap from '../../components/Map/DeviceMap';

import { Redirect, Route, Switch } from 'react-router-dom';

import Welcome from './Welcome/Welcome';
import Detail from './Detail/Detail';
import Prediction from './Prediction/Prediction';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: 'unset'
    }
  },
  mapCard: {
    flexBasis: '60%',
    marginRight: '0.5rem',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 0.7 * window.screen.height + 'px',
    }
  },
  detailCard: {
    flexBasis: '40%',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      minHeight: 0.3 * window.screen.height + 'px',
    }
  }
}));

const detailRouter = (
  <Switch>
    <Route exact path={'/'} component={Welcome} />
    <Route exact path={'/settings'} component={Settings} />
    <Route exact path={'/settings/:boxId'} component={Settings} />
    <Route exact path={'/detail'} component={Detail} />
    <Route exact path={'/detail/:boxId'} component={Detail} />
    <Route exact path={'/prediction'} component={Prediction} />
    <Route exact path={'/prediction/:boxId'} component={Prediction} />
    <Route exact render={() => <Redirect to={'/koairy'} />} />
  </Switch>
);

export default function Main(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card raised={true} className={classes.mapCard}>
        <DeviceMap />
      </Card>
      <Divider />
      <Card raised={true} className={classes.detailCard}>
          <DetailToolbar className={classes.toolBar} />
          {detailRouter}
      </Card>
    </div>
  )
}