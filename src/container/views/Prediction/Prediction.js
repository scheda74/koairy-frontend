import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router';
import connect from 'react-redux/es/connect/connect';
import { Backdrop, CircularProgress, Fade, makeStyles, Modal, Typography } from '@material-ui/core';
import PredictionChart from '../../../components/Charts/PredictionChart';
import { WarningButton } from '../../../styles/customComponents'


const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1rem',
    marginRight: '1rem'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  warningButton: {

  }
}));

function Prediction(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { boxId } = useParams();

  const toggleModal = (modalState) => setOpen(modalState);

  useEffect(() => toggleModal(props.didInvalidate), [props.didInvalidate]);

  const predictionCharts = () => {
    if (props.didInvalidate) {
      return [];
    }
    let data = [];
    if (boxId && props.prediction[boxId]) {
      data = props.prediction[boxId];
    } else if (props.prediction.full) {
      if (props.prediction.full.error || props.prediction.full.detail) {
        // console.log('im here')
        data = []
      } else {
        data = props.prediction.full;
      }
      // console.log('data', data);
    }
    return data.map(response => {
      let mea = response['mea'] || 'not defined';
      let outputKey = response['key'];
      let simKey = outputKey === "no2" ? "NOx" : "PMx";
      let prediction = response['prediction'];
      return (
        <div key={outputKey} className={classes.chartContainer}>
          <Typography align='center' variant='caption'>Simulated and Predicted {outputKey.toUpperCase()}</Typography>
          <Typography align='center' variant='overline'>Mean Absolute Error: {mea}</Typography>
          <PredictionChart
            maxKey={prediction['maxKey']}
            data={
              Object.keys(prediction).map(key => {
                return {
                  date: new Date(key).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
                  [outputKey + "_real"]: prediction[key][outputKey] || 0,
                  [outputKey + "_predicted"]: prediction[key][outputKey + "_predicted"] || 0,
                  [simKey + "_simulated"]: prediction[key][simKey + "_simulated"] || 0,
                }})}
          />
        </div>
      )
    });
  };

  return (
      <div className={classes.container}>
        {props.isFetching && <CircularProgress style={{margin: '3rem'}} color="primary" />}
        {props.didInvalidate ? (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={() => toggleModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <Typography align="center" variant="h5">Something went wrong!</Typography>
                <Typography variant="subtitle1">{props.detail || props.error.message}</Typography>
                <WarningButton className={classes.warningButton} onClick={() => toggleModal(false)}>Okay</WarningButton>
              </div>
            </Fade>
          </Modal>
        ) : ((boxId && props.prediction[boxId]) || props.prediction.full) && (typeof props.prediction.full.detail === 'undefined') && (
          predictionCharts())
        }
      </div>
  )
}

const mapStateToProps = (state) => {
    return {
      params: state.prediction,
      prediction: state.prediction,
      isFetching: state.prediction.isFetching,
      outputKeys: state.prediction.outputKeys,
      didInvalidate: state.prediction.didInvalidate,
      detail: state.prediction.detail,
      error: state.prediction.error
    }
};

export default connect(
  mapStateToProps,
  {}
)(Prediction);