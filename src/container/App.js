import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Comparison from './views/Comparison/Comparison';
import MapContainer from './views/MapContainer/MapContainer';
import Analysis from './views/Analysis/Analysis';
import Prediction from './views/Prediction/Prediction';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  content: {
    width: '100vw',
    // height: '100vh',
    // marginTop: '64px'
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
      <Route exact path={`${process.env.PUBLIC_URL}/`} component={Prediction} />
      <Route exact path={`${process.env.PUBLIC_URL}/prediction`} component={Prediction} />
      <Route exact path={`${process.env.PUBLIC_URL}/map`} component={MapContainer} />
      <Route exact path={`${process.env.PUBLIC_URL}/compare`} component={Comparison} />
      <Route exact path={`${process.env.PUBLIC_URL}/analysis`} component={Analysis} />
      <Route render={() => <Redirect to={`${process.env.PUBLIC_URL}/`} />} />
    </Switch>
  );

  return(
    <div className={classes.root}>
      <CssBaseline />
      <Router basename={"/koairy"}>
        {/*<CustomToolbar*/}
          {/*open={open}*/}
          {/*handleOpen={handleDrawerOpen} />*/}
        <main className={classes.content}>
          {router}
        </main>
        {/*<CustomDrawer*/}
          {/*open={open}*/}
          {/*handleClose={handleDrawerClose} />*/}
          {/*<CustomModal open={open} handleClose={handleDrawerClose} handleOpen={handleDrawerOpen} />*/}
      </Router>
    </div>
  )
}