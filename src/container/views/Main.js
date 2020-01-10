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
    height: '100vh'
  },
  mapCard: {
    flexBasis: '60%',
    marginRight: '0.5rem',
    width: '100%',
    height: '100%'
  },
  detailCard: {
    flexBasis: '40%',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  toolBar: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',

  }
}));

// const detailRouter = (
//   <Switch>
//     <Route exact path={`${process.env.PUBLIC_URL}/`} component={Welcome} />
//     <Route exact path={`${process.env.PUBLIC_URL}/settings`} component={Settings} />
//     <Route exact path={`${process.env.PUBLIC_URL}/settings/:boxId`} component={Settings} />
//     <Route exact path={`${process.env.PUBLIC_URL}/detail`} component={Detail} />
//     <Route exact path={`${process.env.PUBLIC_URL}/detail/:boxId`} component={Detail} />
//     <Route exact path={`${process.env.PUBLIC_URL}/prediction`} component={Prediction} />
//     <Route exact path={`${process.env.PUBLIC_URL}/prediction/:boxId`} component={Prediction} />
//     <Route exact render={() => <Redirect to={`${process.env.PUBLIC_URL}/`} />} />
//   </Switch>
// );

const detailRouter = (
  <Switch>
    <Route exact path={'/'} component={Welcome} />
    <Route exact path={'/settings'} component={Settings} />
    <Route exact path={'/settings/:boxId'} component={Settings} />
    <Route exact path={'/detail'} component={Detail} />
    <Route exact path={'/detail/:boxId'} component={Detail} />
    <Route exact path={'/prediction'} component={Prediction} />
    <Route exact path={'/prediction/:boxId'} component={Prediction} />
    <Route exact render={() => <Redirect to={'/'} />} />
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
        {/*<Router>*/}
          <DetailToolbar />
          {detailRouter}
        {/*</Router>*/}
      </Card>
    </div>
  )
}