import { Button, styled } from '@material-ui/core';

export const WarningButton = styled(Button)({
    // background: 'linear-gradient(45deg, rgb(193, 78, 127) 0%, rgb(141, 26, 83) 50%, rgb(90, 0, 41, 1) 100%)',
    background: '#8d1a1a',
    // border: 0,
    // borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',

    // height: 48,
    // padding: '0 30px',
    '&:hover': {
        background: 'rgb(193, 78, 127)'
    }
});