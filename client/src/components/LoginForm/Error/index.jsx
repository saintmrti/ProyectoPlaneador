import React from 'react';
import MuiAlert from '@mui/material/Alert';

import { Wrapper } from './styled';

export const Error = ({ message }) => (
    <Wrapper id="error_message">
        <MuiAlert severity="error" variant="filled">
            { message ? message : 'Ha ocurrido un error. Inténtelo de nuevo más tarde, si el problema persiste contacte a su administrador de sistemas.' }
        </MuiAlert>
    </Wrapper>
);

export const ScrollError = ({ message }) => {
    setTimeout(() => {
        window.scrollTo({
            top: document.getElementById('error_message').offsetTop, 
            behavior: 'smooth'
        });
    }, 0);
    return (
        <Error message={ message }/>
    )
};