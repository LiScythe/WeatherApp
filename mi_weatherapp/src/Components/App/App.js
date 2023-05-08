import React, { useEffect, useState } from "react";
import { Grid, Typography, Stack, Paper, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchForecastData } from "../../redux/epicAction";
import moment from "moment";
import './App.css';

function App() {
  const [viewScreen, setView_Screen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');

  let currentDate = new Date().toLocaleDateString();

  currentDate = moment(currentDate).format("yyyy-MM-DD");

  const dispatch = useDispatch();
  const forecastData = useSelector((state) => state.forecastData);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(fetchForecastData({latitude:position.coords.latitude, longitude:position.coords.longitude}))
    });
  }, [dispatch]);


  const view_Basic = () => {
    const button_Handler = (data) => {
        setView_Screen(!viewScreen)
        setSelectedDay(data)
    }
    return(
        forecastData.map((dailyData) => (
          <Grid item xs={12} sm={6}  md={4} key={dailyData.date}>
            <Paper className={`paper ${dailyData.date === currentDate ? 'today_day' : 'other_day'}`}>
              <Stack direction="column" spacing={2} style={{ padding: "4%" }}>
                <Typography variant="h6">{moment(dailyData.date).format("Do MMMM YYYY")}</Typography>
                {dailyData.list.map((item, index) => (
                  index === 0 &&
                  <Stack key={item.dt} direction="column" spacing={1}>
                    <Typography>{item.weather[0].main}</Typography>
                    <Typography>
                      {item.main.temp} &deg;C
                    </Typography>
                    <Button variant="contained" color="primary" onClick={()=>button_Handler(dailyData)}>View Detail</Button>
                  </Stack>
                ))}
               
              </Stack>
              
            </Paper>
          </Grid>
        ))
    )
  }

  const render_WeatherImg = (weather) => {
    let img_Link = ""
    switch(weather){
      case 'Clouds':
        img_Link = require('../../assets/graphic/Podcast_DrawKit_Vector_Illustrations.png');
        break;
      case 'Rain':
        img_Link = require('../../assets/graphic/undraw_Raining_re_4b55.png');
        break
      default:
        img_Link = require('../../assets/graphic/Shopping call_DrawKit_Vector_Illustrations.png');
        break;

    }
    return img_Link;
  }

  const view_Detail = () => {
    
    return(

        <Grid item xs={12} sm={12}>
          <Paper className="paper">
          <Grid item container spacing={2} style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}} >
            <Grid item xs={12} sm={12}>
              <Typography variant="h4" className="title">{moment(selectedDay.date).format("Do MMMM YYYY")}</Typography>
            </Grid>
              {selectedDay.list.map((hourly, idx)=>(
                  <Grid item xs={12} sm={4} id={idx}>
                    <Grid item container spacing={2} className="centerItem">
                      <Grid item xs={12} sm={4} md={4}>
                        <img src={render_WeatherImg(hourly.weather[0].main).toString()} style={{width:"100%", height:'auto'}} alt="img"/>
                      </Grid>
                      <Grid item xs={12} sm={8} md={8}>
                        <Typography variant="subtitle1" >Time: {moment(hourly.dt_txt).format("h:mm A")} </Typography>
                        <Typography variant="body1" >Weather: {hourly.weather[0].main}</Typography>
                        <Typography variant="body1" >Temperature: {hourly.main.temp}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  
                   ))}
                   <Grid item xs={12} sm={12} className="centerItem">
                      <Button variant="contained" color="primary" onClick={()=>setView_Screen(!viewScreen)}>Return to Main Page</Button>
                   </Grid>
              </Grid>
          </Paper>
        </Grid>
    )
  }


  return (
    <Grid container spacing={2} className="container">
      <Grid item xs={12} sm={4} md={4}>
        <Typography variant="h3" className={`main_title topText_color`}>MI Weather Forecast</Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={8}>
          <Typography variant="h5" className={`sub_title topText_color`}>Sunny or Rainy, Better Bring Your Umbrella</Typography>
      </Grid>
      {viewScreen === false ?
      <>
       <Grid item xs={12} sm={4} md={4}>
        <img src={require("../../assets/graphic/Coffe call_DrawKit_Vector_Illustrations.png")} style={{width:"100%", height:'auto'}} alt="img"/>
      </Grid>
      <Grid item xs={12} sm={8} md={8} className="centerItem">
        <Grid item container spacing={2} >
        {forecastData.length > 0  ?
          view_Basic()
          :
          <Grid item xs={12} sm={12} md={12} className="centerItem">
              <CircularProgress/>
          </Grid>
         } 
        </Grid>
      </Grid>
     
      </>
      :
      view_Detail()
      }
    </Grid>
  );
}

export default App;
