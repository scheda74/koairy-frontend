import React from 'react';
import './App.css';
import DeviceMap from './components/Map/DeviceMap';
import Overlay from './components/overlay/Overlay';
import NavBar from './components/NavBar';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';


class App extends React.Component {
    render() {
        return (
            <div className="main">
                {/*<CssBaseline />*/}
                <Grid container>
                    <Grid item xs={12}>
                        <NavBar />
                    </Grid>
                    <Grid item xs={12}>
                        <Overlay className="overlay" />
                        <DeviceMap />
                    </Grid>
                </Grid>

            </div>
        )
    }
}

export default App;