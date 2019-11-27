// https://www.schemecolor.com/green-bamboo-color-scheme.php

import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    // palette: {
    //     type: 'dark',
    // },
    palette: {
        type: 'dark',
        primary: {
            main: '#000000',
            light: '#333333'
        },
        secondary: {
            main: '#518c19',
            light: '#E2DBAC'
        },
    },
});

export const darkGreenTheme = createMuiTheme({
    palette: {
        common: {
            black: "#000",
            white: "#fff"
        },
        background: {
            // paper: "rgba(59, 59, 59, 1)",
            // default: "rgba(0, 0, 0, 1)"
            paper: "#424242",
            default: "rgba(59, 59, 59, 1)"
        },
        primary: {
            light: "rgba(130, 189, 75, 1)",
            main: "rgba(83, 141, 26, 1)",
            dark: "rgba(30, 94, 0, 1)",
            contrastText: "rgba(255, 255, 255, 1)"
        },
        secondary: {
            light: "rgba(255, 255, 222, 1)",
            main: "rgba(226, 219, 172, 1)",
            dark: "rgba(176, 169, 125, 1)",
            // contrastText: "rgba(0, 0, 0, 1)"
            contrastText: "rgba(255, 255, 255, 1)"
        },
        error: {
            light: "rgba(193, 78, 127, 1)",
            main: "#8d1a1a",
            dark: "rgba(90, 0, 41, 1)",
            contrastText: "#fff"
        },
        text: {
            primary: "rgba(255, 255, 255, 1)",
            secondary: "rgba(223, 223, 223, 1)",
            disabled: "rgba(255, 255, 255, 0.54)",
            hint: "rgba(255, 255, 255, 1)"
        }
    },
    overrides: {
        MuiIconButton: {
            root: {
                color: "rgba(255, 255, 255, 0.54)"
            }
        },
        MuiButton: {
            root: {
                "&$disabled": {
                    color: "rgba(255, 255, 255, 0.54)"
                }
            }
        },
        MuiDivider: {
            root: {
                backgroundColor: 'rgba(255, 255, 255, 0.25)'
            }
        }
    }
});