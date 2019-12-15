// import React from 'react';
// import { CircularProgress, makeStyles } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';
// import BremickerLineChart from '../../../components/Charts/BremickerLineChart';
// import HawaDawaLineChart from '../../../components/Charts/HawaDawaLineChart';
// import bremickerBoxes from '../../../assets/data/bremickerBoxes';
// import PredictionChart from '../../../components/Charts/PredictionChart';
// import Divider from '@material-ui/core/Divider';
//
// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//     // [theme.breakpoints.down('md')]: {
//     //   flexDirection: 'column',
//     // },
//   },
//   chartContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginTop: '1rem',
//     marginRight: '1rem'
//   }
// }));
//
// export default function Analysis(props) {
//   console.log(props.prediction);
//   const classes = useStyles();
//
//   const predictionCharts = props.prediction && props.prediction.map(response => {
//     let mea = response['mea'];
//     let outputKey = response['key']
//     let prediction = response['prediction']
//     return (
//       <div key={outputKey} className={classes.chartContainer}>
//         <Typography align='center' variant='caption'>Simulated and Predicted {outputKey.toUpperCase()}</Typography>
//         <Typography align='center' variant='overline'>Mean Absolute Error: {mea}</Typography>
//         <PredictionChart
//           maxKey={prediction['maxKey']}
//           data={
//             Object.keys(prediction).map(key => {
//               return {
//                 date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
//                 [outputKey + "_real"]: prediction[key][outputKey] || 0,
//                 [outputKey + "_predicted"]: prediction[key][outputKey + "_predicted"] || 0,
//                 [outputKey + "_simulated"]: prediction[key][outputKey + "_simulated"] || 0,
//               }})}
//         />
//       </div>
//     )
//   });
//
//   const airData = () => {
//     if (!props.sensors) return []
//     let sensorData =  props.sensors[bremickerBoxes[props.boxID]['airSensor']]['values'];
//     let result = Object.keys(sensorData).map(key => {
//       return {
//         date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
//         pm10: sensorData[key]['pm10'],
//         no2: sensorData[key]['no2']
//       }
//     })
//     console.log(result);
//     return result
//   };
//
//   const bremickerData = () => {
//     if (!props.traffic) return [];
//     Object.keys(props.traffic[props.boxID]).map(key => {
//     return {
//       date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
//       vehicles: props.traffic[props.boxID][key] || 0
//     }
//   })};
//
//   return (
//     <div className={classes.container}>
//       {props.prediction ? (
//         props.isFetching ? (
//             <CircularProgress color='primary' />
//           ) : (
//             {predictionCharts}
//           )
//         ) : (
//           !props.traffic && !props.sensors ? (
//             <CircularProgress />
//             ) : (
//             <React.Fragment>
//               <div className={classes.chartContainer}>
//                 <Typography align='center' variant='caption'>Vehicles per hour</Typography>
//                 <BremickerLineChart data={bremickerData()} />
//               </div>
//               <Divider />
//               <div className={classes.chartContainer}>
//                 <Typography align='center' variant='caption'>Current Air Pollution</Typography>
//                 <HawaDawaLineChart data={airData()} />
//               </div>
//             </React.Fragment>
//           )
//       )}
//     </div>
//   )
// }