import React, { useEffect, useState } from "react";
import '../App/App.css';
import {Paper, Typography} from '@mui/material';

const Weather = (temperature, weather, date) => {
  console.log('data', )
  return (
    <Paper className='paper'>
        <Typography variant="subtitle1" className="title">Test</Typography>
    </Paper>
  );
}

export default Weather;