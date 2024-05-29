import React, { useEffect, useState } from "react"
import './Automatic.css'
import { Link } from 'react-router-dom'
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import instance from "../axiosConfig";



function Automatic() {

    const color = red[900];
    const theme = createTheme({
        palette: {
            primary: {
                light: '#b71c1c',
                main: '#b71c1c',
                dark: '#b71c1c',
                contrastText: '#b71c1c',
            },
        },
    });

    const [turbidity, setTurbidity] = useState("")
    const [ph, setPh] = useState("")
    const [conductivity, setCondcutivity] = useState("")
    const [temp, setTemp] = useState("")
    const [result, setResult] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    const getData = async ()=>{
        try{
            const res = await instance.get("/get_readings?sensor_id=IotSensorData");
            setCondcutivity(res.data.readings.conductivity);
            setPh(res.data.readings.ph);
            setTurbidity(res.data.readings.turbidity);
            setTemp(res.data.readings.temp);
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString();
            setDate(formattedDate);
            const formattedTime = currentDate.toLocaleTimeString();
            setTime(formattedTime);

            await instance.post("/predict", {
                "data": {
                    "turbidity": Number(turbidity),
                    "ph": Number(ph),
                    "conductivity": Number(conductivity)
                }
            }).then((res) => {
                setResult(res.data.prediction)
            })

        }catch(e){
            console.log(e);
        }
    }


    return (
        <div>

            <div className="automaticpage"></div>

            <Grid container spacing={1}>


            <Grid item xs={12}></Grid>
           
           <Grid item xs={12} sx={{
            "display":"flex",
            "flexDirection":"row",
            "alignContent":"end",
            "justifyContent":"end"
           }}> 
                
                <img src="/pic/logowhite.png" alt="logoa" style={{ width: '250px', height: 'auto' }} />
                
             </Grid> 



                <Grid item xs={12}  >
                    <div className="titleautomatic"> <h1>Water Quality Monitoring and Alum Dose Determining System</h1></div>
                </Grid>
                <Grid item xs={1} md ={3} lg={1} ></Grid>
                <Grid item xs={10} md={6} lg={5} >

                    <br /><br /><br /><br /><br />

                    <div className="container1">


                        <div className="contained_buttons">
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" sx={{
                                    minHeight: "100px",
                                    textTransform: "none",
                                    height: "15vh",
                                    margin: "10px",
                                    width: "20vw",
                                    minWidth: "300px",
                                    borderRadius: "20px",
                                    fontSize: "35px",

                                }} onClick={getData}><div className="link">Click here to update</div></Button></ThemeProvider></div><br />


                        <h3>Date:</h3>{" "}
                        <div className="boxesd">{date}</div>

                        <h3>Time:</h3>{" "}
                        <div className="boxesd">{time}</div>

                        <br/><br/>

                        <Link to="/home">Back to Home Page</Link><div className="or">OR</div><Link to="/">Log out</Link>

                    </div>
                    
                    <br />

                </Grid>


                <Grid item xs={12} lg={5} >
                    <div className="container">

                        <div className="header">
                            <div className="text">
                                <h1>Automatic Alum Dose Calculator</h1></div></div>

                        <h3>Turbidity value (NTU):</h3>
                        <div className="boxes">{turbidity}</div>
                    

                        <h3>pH value:</h3>
                        <div className="boxes">{ph}</div>
                        

                        <h3>Conductivity value (microS/cm):</h3>
                        <div className="boxes">{conductivity}</div>

                        <h3>Temperature value (°C):</h3>
                        <div className="boxes">{temp}</div>

                        <br />
                        <h3>Predicted Alum dosage (PPM):</h3>
                        <div className="Alumdose">{result}</div>

                        <br />

                        

                    </div>
                </Grid>

                <Grid item xs={1} md ={3}></Grid>
            </Grid>


        </div>
    )
}

export default Automatic