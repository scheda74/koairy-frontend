import React from 'react'
import { makeStyles } from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';


const useStyles = makeStyles(theme => ({
 container: {

 }
}));

function PredictionAnalysis(props) {
  const classes = useStyles();

  return (
    <div>
      hello
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    prediction: state.simulation.prediction,
    isFetching: state.simulation.isFetching,
    didInvalidate: state.simulation.didInvalidate
  }
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setSimulationParameters: (params) => dispatch(setSimulationParameter(params)),
//     startSimulationWith: (params) => dispatch(startSimulation(params)),
//     startPrediction: (params) => dispatch(fetchPrediction(params)),
//   }
// };

export default connect(
  mapStateToProps,
  {}
)(PredictionAnalysis);