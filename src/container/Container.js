import React  from "react";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

import DeviceMap from '../components/Map/DeviceMap';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer';
import CustomToolbar from '../components/CustomToolbar/CustomToolbar';
import { caqiData } from '../assets/data/newCaqiData';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  //   transition: theme.transitions.create('margin', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   marginRight: -drawerWidth,
  // },
  // contentShift: {
  //   transition: theme.transitions.create('margin', {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginRight: 0,
  // },
}));

let points = [];
for ( const key in caqiData ) {
  points.push([caqiData[key].lng, caqiData[key].lat, caqiData[key].CAQI / 100]);
}

export default function Container() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const points = caqiData.keys().reduce((key) => [caqiData[key].lng, caqiData[key].lat, caqiData[key].CAQI]);
  // const points = caqiData.reduce((key, value) => [value.lng, value.lat, value.CAQI], []);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <CustomToolbar
          open={open}
          handleOpen={handleDrawerOpen} />
        <main>
          <DeviceMap points={points}/>
        </main>
        <CustomDrawer
          open={open}
          handleClose={handleDrawerClose} />
      </div>
    </MuiThemeProvider>
  )
}