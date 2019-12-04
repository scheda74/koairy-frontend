import { Button, Icon, makeStyles } from '@material-ui/core';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import BambooIcon from '../../../Icons/Bamboo';
import KoalaOutlinedIcon from '../../../Icons/KoalaOutlined';
import connect from 'react-redux/es/connect/connect';
import { triggerToolbar } from '../../../store/reducers/rootReducer';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%'
  },
  icon: {
    height: '180px',
    width: '180px',
    // [theme.breakpoints.down('md')]: {
    //   height: '90px',
    //   width: '90px'
    // },
  },
  textContainer: {
    textAlign: 'center'
  }
}));


function Welcome(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Icon className={classes.icon}><KoalaOutlinedIcon /></Icon>
      <div className={classes.textContainer}>
        <Typography variant="h4" align='center'>Welcome to Koairy!</Typography>
        <Typography style={{marginTop: '0.5rem'}} variant="subtitle1" align='center'>You can simulate emissions and predict air quality</Typography>
        {/*<Button onClick={() => props.triggerToolbar()}>Toggle Toolbar</Button>*/}
        <Link to="/settings"><Button color="primary" variant="contained" onClick={() => props.triggerToolbar()}>Get Started</Button></Link>
      </div>
      <Icon className={classes.icon}><BambooIcon /></Icon>
    </div>
  );
}

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {triggerToolbar: () => dispatch(triggerToolbar(true))}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);