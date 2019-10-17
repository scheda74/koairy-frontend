import React from 'react';
import clsx from 'clsx';
import './SwitchGroup.css';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { createMuiTheme, createStyles, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '1rem',
            color: 'white'
        },
        button: {
            margin: '2rem auto'
        },
        label: {
            fontSize: '2rem'
        },
        switches: {
            color: 'white',
            padding: theme.spacing(1),
            margin: '0 2rem'
        },
        textFields: {
            width: '20%',
            margin: 'auto'
        }
    })
);

export default function SwitchesGroup() {
    const [state, setState] = React.useState({
        traffic: false,
        emission: false,
        vehicleType: [
            { type: 'gas', value: 50 },
            { type: 'diesel', value: 45 },
            { type: 'electric', value: 5 }
        ]
    });

    const handleSwitchChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [name]: event.target.checked });
    };

    const handleFieldChange =  (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        const vehicleType = state.vehicleType.find(v => v.type === name);
        if (vehicleType) {
            vehicleType.value = parseInt(event.target.value) || 0
        }

    };

    const theme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });

    const classes = useStyles();

    return (
        <MuiThemeProvider theme={theme}>
            <FormControl className={classes.root} component="fieldset">
                <span className={classes.label}>Simulation Parameters</span>
                <hr/>
                <FormGroup>
                    <FormControlLabel
                        className={classes.switches}
                        control={
                            <Switch
                                checked={state.traffic}
                                onChange={handleSwitchChange('traffic')}
                                value="traffic" />
                            }
                        label="Traffic Heat Map"
                    />
                    <FormControlLabel
                        className={classes.switches}
                        control={
                            <Switch
                                checked={state.emission}
                                onChange={handleSwitchChange('emission')}
                                value="emission" />
                            }
                    label="Emission Heat Map"
                    />
                    <FormControlLabel
                        className={classes.switches}
                        control={
                            <Switch
                                checked={state.emission}
                                onChange={handleSwitchChange('emission')}
                                value="emission" />
                            }
                        label="Calibrate Weather"
                    />
                    <FormGroup row className={classes.root}>
                        <FormControlLabel
                            className={classes.textFields}
                            control={
                                <TextField
                                    onChange={handleFieldChange('gas')}
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    value="50%"
                                    label="Gasoline" />
                                }
                            label=""
                        />
                        <FormControlLabel
                            className={classes.textFields}
                            control={
                                <TextField
                                    onChange={handleFieldChange( 'diesel')}
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    value="45%"
                                    label="Diesel" />
                                }
                            label=""
                        />
                        <FormControlLabel
                            className={classes.textFields}
                            control={
                                <TextField
                                    onChange={handleFieldChange( 'electric')}
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    value="5%"
                                    label="Electric" />
                                }
                            label=""
                        />
                    </FormGroup>
                </FormGroup>
                <Button variant="contained" color="primary" className={classes.button}>
                    Start new simulation
                </Button>
            </FormControl>
        </MuiThemeProvider>
    );
}