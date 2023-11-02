import React, { useState } from 'react';
import { Typography } from "@material-ui/core";

const Title = ({children}) => {
 

    return (
        <Typography
            variant="h2"
            style={{
                textAlign: 'center',
                margin:20,
                background: 'linear-gradient(45deg, #1976d2, #ff5722, #009688, #673ab7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'changeColor 8s linear infinite',
                cursor: 'pointer',
                fontSize:"60px"
            }}
        >
            {children}
        </Typography>
    );
};

export default Title


