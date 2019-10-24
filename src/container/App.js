import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

import DeviceMap from '../components/Map/DeviceMap';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer';
import CustomToolbar from '../components/CustomToolbar/CustomToolbar';
import Welcome from './views/Welcome/Welcome';
import Comparison from './views/Comparison/Comparison';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  content: {
    width: '100vw',
    height: '100vh',
    marginTop: '64px'
  }
}));


export default function App() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const router = (
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/map" component={DeviceMap} />
      <Route exact path="/compare"><Comparison /></Route>
      <Route exact path="/analysis" component={Comparison} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );

  return(
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <CustomToolbar
          open={open}
          handleOpen={handleDrawerOpen} />
        <main className={classes.content}>
          {router}
          {/*<DeviceMap points={points}/>*/}
        </main>
        <CustomDrawer
          open={open}
          handleClose={handleDrawerClose} />
      </Router>
    </div>
  )
}