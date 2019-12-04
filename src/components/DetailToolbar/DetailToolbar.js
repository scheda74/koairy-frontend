import React from 'react';
import { IconButton, makeStyles, Slide, Toolbar, Tooltip } from '@material-ui/core';
import { ChevronLeft, MultilineChart, Settings, Timeline } from '@material-ui/icons'
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router';


const useStyles = makeStyles((theme) => ({
  toolBar: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

export default function DetailToolbar(props) {
  const classes = useStyles();
  let history = useHistory();
  let toolbarActive = !useRouteMatch('/').isExact;

  const handleNext = route => {
    history.push(route)
  };

  return (
    <Slide appear={false} direction="down" in={toolbarActive}>
      <Toolbar className={classes.toolBar}>
        <IconButton color="inherit" edge="start" onClick={() => history.goBack()}>
          <ChevronLeft />
        </IconButton>
        <Tooltip title="Single Area Prediction" placement="bottom">
          <IconButton color="inherit" onClick={() => handleNext('/prediction')}>
            <Timeline />
          </IconButton>
        </Tooltip>
        <Tooltip title="Full City Prediction" placement="bottom">
          <IconButton color="inherit" onClick={() => console.log('router here')}>
            <MultilineChart />
          </IconButton>
        </Tooltip>
        <Tooltip title="Adjust Prediction Settings" placement="bottom">
          <IconButton color="inherit" edge="end" onClick={() => handleNext('/settings')}>
            <Settings />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </Slide>
  )
}
//
// const mapStateToProps = state => {
//     return {
//       trigger: state.isToolbarActive
//     }
// };
//
//
// // export default withRouter(
// export default connect(
//     mapStateToProps
//   )(DetailToolbar)
// // );