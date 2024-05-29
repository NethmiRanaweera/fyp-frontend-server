import React, { useEffect, useState } from "react"
import './Manual.css'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import { Grid } from "@mui/material";
import axios from "axios";
import instance from "../axiosConfig";

function Manual() {

    const [turbidity, setTurbidity] = useState(0)
    const [ph, setPh] = useState(0)
    const [conductivity, setCondcutivity] = useState(0)
    const [result, setResult] = useState("")
    const [error, setError] = useState(["", "", ""])



    // async function submit(e) {
    //     e.preventDefault();

    //     try {


    //     }
    //     catch (e) {
    //         console.log(e);


    //     }

    // }

    function setErrors(index, value) {
        const current = [...error]
        current[index] = value
        setError(current)

    }
    async function submit(e) {
        e.preventDefault()



        if (error[0].length == 0 && error[1].length == 0 && error[2].length == 0) {
            await instance.post("/predict", {
                "data": {
                    "turbidity": Number(turbidity),
                    "ph": Number(ph),
                    "conductivity": Number(conductivity)
                }
            }).then((res) => {
                setResult(res.data.prediction)
            })
        } else {
            setResult("")
        }
    }

    return (
        <div>
            <div className="manualpage"></div>



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
                    <div className="titlemanualbox">
                        <div className="titlemanual"> <h1>Water Quality Monitoring and Alum Dose Determining System</h1></div></div>
                </Grid>
                <Grid item xs={2} md={3} >

                </Grid>
                <Grid item xs={12} md={6} >
                    <div className="container">

                        <div className="header">

                            <div className="text"> <h1>Manual Alum Dose Calculator</h1></div></div>


                        <form>

                            <div className="input input"><div>
                                <h3>Turbidity value (NTU):</h3>{" "}
                                <TextField placeholder="Enter only value here" sx={{ input: { color: 'black' } }}
                                    error={error[0].length > 0}
                                    helperText={error[0]}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">

                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => {

                                        if (Number(e.target.value) > 1000) {
                                            setErrors(0, "Turbidity should be in the range 0-1000 NTU")
                                        } else {
                                            setTurbidity(e.target.value)
                                            setErrors(0, "")
                                        }
                                    }}
                                    size="small"
                                />
                            </div></div>
                            <div className="input input"> <div>
                                <h3>pH value:</h3>{" "}

                                <TextField placeholder="Enter only value here" sx={{ input: { color: 'black' } }}
                                    error={error[1].length > 0}
                                    helperText={error[1]}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">

                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => {
                                        if (Number(e.target.value) > 7.1 || Number(e.target.value) < 5.9) {
                                            setErrors(1, "pH should be in the range 6-7")
                                        } else {
                                            setPh(e.target.value)
                                            setErrors(1, "")
                                        }
                                    }}
                                    size="small"
                                />
                            </div></div>
                            <div className="input input"> <div>
                                <h3>Conductivity value (microS/cm):</h3>{" "}

                                <TextField placeholder="Enter only value here" sx={{ input: { color: 'black' } }}
                                    error={error[2].length > 0}
                                    helperText={error[2]}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">

                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => {
                                        if (Number(e.target.value) > 1000) {
                                            setErrors(2, "Counductivity should be in the range 0-1000 microS/cm")
                                        } else {
                                            setCondcutivity(e.target.value)
                                            setErrors(2, "")

                                        }
                                    }}
                                    size="small"
                                />
                            </div></div>

                            <input className="submitbutton" type="submit" onClick={submit} />

                            <br></br><br></br>
                            
                            <h3>Predicted Alum dosage (PPM):</h3>{" "}
                            <div className="Alumdose">
                                {result == "-1" ? "Out of the Limit" : result}
                            </div>


                        </form>
                        <br />

                        <Link to="/home">Back to Home Page</Link><div className="or">OR</div><Link to="/">Log out</Link>
                    </div>
                </Grid>
                <Grid item xs={2} md={3} >
                </Grid>
            </Grid>

        </div>
    )
}

export default Manual