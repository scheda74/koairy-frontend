import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './views/Main';
import ErrorBoundary from './views/ErrorBoundary';


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

  return(
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <ErrorBoundary>
          <Main />
        </ErrorBoundary>
      </main>
    </div>
  )
}