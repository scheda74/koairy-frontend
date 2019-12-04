import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './views/Main';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  content: {
    width: '100vw',
  }
}));


export default function App() {
  const classes = useStyles();

  // const router = (
  //   <Switch>
  //     <Route path={`${process.env.PUBLIC_URL}/`} component={Main} />
  //     {/*<Route path={`${process.env.PUBLIC_URL}/prediction`} component={Prediction} />*/}
  //     {/*<Route path={`${process.env.PUBLIC_URL}/map`} component={MapContainer} />*/}
  //     {/*<Route path={`${process.env.PUBLIC_URL}/compare`} component={Comparison} />*/}
  //     {/*<Route path={`${process.env.PUBLIC_URL}/analysis`} component={Analysis} />*/}
  //     <Route render={() => <Redirect to={`${process.env.PUBLIC_URL}/`} />} />
  //   </Switch>
  // );

  return(
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Main />
      </main>
    </div>
  )
}