import React from "react"
import { Link } from 'react-router-dom';
import './Home.css'
import { Button } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { Grid } from "@mui/material";


function Home() {

    

    return (
        <div>
            <div className="homepage">
            </div>

            <Grid container spacing={1}>
                {}

            <Grid item xs={12}></Grid>
            <Grid item xs={12} sx={{
            "display":"flex",
            "flexDirection":"row",
            "alignContent":"end",
            "justifyContent":"end"
           }}> 
                
                <img src="/pic/logowhite.png" alt="logoa" style={{ width: '250px', height: 'auto' }} />
                
             </Grid> 
            <Grid item xs={1}></Grid></Grid>

            <div className="centered">
                <div className="title"> <h1>Water Quality Monitoring and Alum Dose Determining System</h1></div>
                <div className="title1"><h1>Ambathale Water Treatment Plant</h1></div>


                <div className="contained_buttons">
                
                    <Button variant="contained" sx={{
                        minHeight: "100px",
                        textTransform: "none",
                        height: "15vh",
                        margin: "10px",
                        width: "20vw",
                        minWidth: "300px",
                        borderRadius: "20px",
                        fontSize: "45px",
                        backgroundColor: "#87ceeb",
                    }}><Link to="/manual">Manual</Link></Button>
                    <Button variant="contained" sx={{
                        minHeight: "100px",
                        height: "15vh",
                        textTransform: "none",
                        margin: "10px",
                        width: "20vw",
                        minWidth: "300px",
                        borderRadius: "20px",
                        fontSize: "45px",
                        backgroundColor: "#87ceeb",
                    }}><Link to="/automatic">Automatic</Link></Button>
                </div>

            </div>
        </div>
    )
}

export default Home