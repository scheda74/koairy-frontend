import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import connect from 'react-redux/es/connect/connect';
import { CustomLink } from '../../../styles/customComponents';
import BremickerLineChart from '../../../components/Charts/BremickerLineChart';
import Divider from '@material-ui/core/Divider';
import HawaDawaLineChart from '../../../components/Charts/HawaDawaLineChart';
import { useParams } from 'react-router';
import bremickerBoxes from '../../../assets/data/bremickerBoxes';
import { airActions, trafficActions } from '../../../store/actions';


const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));


function Detail(props) {
  const classes = useStyles();
  let { boxId } = useParams();

  useEffect(() => {
    if (boxId) {
      props.fetchCurrentAir();
      props.fetchCurrentBremickerByKey(boxId)
    }
  }, [boxId]);

  const airData = () => {
    if (!props.air.sensors) return [];
    let sensorData =  props.air.sensors[bremickerBoxes[boxId]['airSensor']]['values'];
    return Object.keys(sensorData).map(key => {
      return {
        date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
        pm10: sensorData[key]['pm10'],
        no2: sensorData[key]['no2']
      }
    });
  };

  const bremickerData = () => {
    if (!props.traffic[boxId]) return [];
    Object.keys(props.traffic[boxId]).map(key => {
      return {
        date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
        vehicles: props.traffic[boxId][key] || 0
      }
    })};

  return (
    <div className={classes.container}>
      {props.air.isFetching || props.traffic.isFetching ? (
        <CircularProgress color="primary" />
      ) : (
        props.traffic && props.air && boxId ? (
          <React.Fragment>
            <div className={classes.chartContainer}>
              <Typography align='center' variant='caption'>Vehicles per hour</Typography>
              <BremickerLineChart data={bremickerData()} />
            </div>
            <Divider />
            <div className={classes.chartContainer}>
              <Typography align='center' variant='caption'>Current Air Pollution</Typography>
              <HawaDawaLineChart data={airData()} />
            </div>
          </React.Fragment>
        ) : (
          <Typography>Select an area marked in the map to get more details!</Typography>
        )
      )}
    </div>
  );
}

const mapStateToProps = state => {
    return {
      traffic: state.traffic,
      air: state.air,
      sensors: state.air.sensors,
    }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentBremickerByKey: (key) => dispatch(trafficActions.fetchCurrentBremicker(key)),
    fetchCurrentAir: () => dispatch(airActions.fetchLatestAir())
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);