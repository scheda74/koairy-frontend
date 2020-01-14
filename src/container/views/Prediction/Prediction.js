import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import connect from 'react-redux/es/connect/connect';
import { Backdrop, CircularProgress, Fade, makeStyles, Modal, Snackbar, Typography } from '@material-ui/core';
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
    marginRight: '1rem',
    width: '100%'
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '600px',
    height: '400px'
  },
  warningButton: {

  }
}));

function Prediction(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    open: false,
    snackBarOpen: false
  });
  const { boxId } = useParams();
  let history = useHistory();

  const toggleModal = (modalState) => setState({...state, open: modalState});

  const handleSnackbarClose = () => setState({ ...state, snackBarOpen: !state.snackBarOpen });

  useEffect(() => toggleModal(props.didInvalidate), [props.didInvalidate]);

  const predictionCharts = () => {

    let data = [];
    if (boxId && props.prediction[boxId]) {
      if (props.prediction[boxId].detail || props.prediction[boxId].error) {
        return (
          <React.Fragment>
            <Typography align="center" variant="h5">Something went wrong!</Typography>
            <WarningButton className={classes.warningButton} onClick={() => history.push('/detail')}>Okay</WarningButton>
          </React.Fragment>
        )
      } else {
        data = props.prediction[boxId].prediction;
      }
    } else if (props.prediction.full) {
      if (props.prediction.full.error || props.prediction.full.detail) {
        return (
          <React.Fragment>
            <Typography align="center" variant="h5">Something went wrong!</Typography>
            <WarningButton className={classes.warningButton} onClick={() => history.push('/detail')}>Okay</WarningButton>
          </React.Fragment>
        )
      } else {
        data = props.prediction.full;
      }
    }
    console.log(data);
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
          <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            autoHideDuration={4000}
            open={state.snackBarOpen}
            onClose={handleSnackbarClose}
            message="You can now toggle a heat map showing simulated traffic..."
          />
        </div>
      )
    });
  };

  if (props.isFetching) {
    return (
      <div className={classes.container}>
        <CircularProgress style={{margin: '3rem'}} color="primary" />
      </div>
    )
  }

  if (props.didInvalidate) {
    return (
      <div className={classes.container}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={state.open}
            onClose={() => toggleModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={state.open}>
              <div className={classes.paper}>
                <Typography align="center" variant="h5">Something went wrong!</Typography>
                <Typography variant="subtitle1">Server Response: {props.detail || props.error.message || ""}</Typography>
                <WarningButton className={classes.warningButton} onClick={() => toggleModal(false)}>Okay</WarningButton>
              </div>
            </Fade>
          </Modal>
          <Typography variant="overline">
            Apparently something went wrong... Sorry...
          </Typography>
          <WarningButton onClick={() => history.push('/detail/')}>
            Go Back
          </WarningButton>
        </div>
    )
  }

  return (
      <div className={classes.container}>
        {((boxId && props.prediction[boxId]) || (props.prediction.full && typeof props.prediction.full.detail === 'undefined')) ?
          predictionCharts() : (
            <React.Fragment>
              <Typography align="center" variant="h5">Something went wrong!</Typography>
              <WarningButton className={classes.warningButton} onClick={() => history.push('/detail')}>Okay</WarningButton>
            </React.Fragment>
          )
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
      detail: state.prediction && state.prediction.detail,
      error: state.prediction && state.prediction.error
    }
};

export default connect(
  mapStateToProps,
  {}
)(Prediction);