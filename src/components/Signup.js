import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './Singup.css';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Grid } from "@mui/material";
import instance from "../axiosConfig";



function Signup({ login }) {
    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e) {
        e.preventDefault();

        try {

            await instance.post("/register", {
                email, password
            })
                .then(res => {
                    console.log(res)
                    localStorage.setItem("token", res.data.user.token)
                    instance.defaults.headers.common['Authorization'] = "Bearer " + res.data.user.token;
                    login()
                    history("/home", { state: { id: email } })
                })
                .catch(e => {
                    alert(e.data.error)
                })

        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className>

            <div className="signup"></div>

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
                <Grid item xs={10} >
                    <div className="titlesignup"><h1>Water Quality Monitoring and Alum Dose Determining System </h1></div></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2} md={3}>
                </Grid>

                <Grid item xs={8} md={6} >
                    <div className="container">

                        <div className="header">

                            <div className="text"><h1>Signup</h1> </div></div>

                        <form action="POST">
                            <div className="input input"><div>
                                <TextField placeholder="Email" sx={{ input: { color: 'black' } }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    size="small"
                                />
                            </div></div><br></br>
                            <div className="input input"> <div>
                                <TextField placeholder="Password" sx={{ input: { color: 'black' } }}
                                    type="password"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    size="small"
                                />
                            </div></div>
                            <input className="submitbutton" type="submit" onClick={submit} />


                        </form>

                        <br />
                        <p>OR</p>
                        <br />

                        <Link to="/">Back to Login Page</Link>

                    </div></Grid>
                <Grid item xs={2} md={3}></Grid>
            </Grid>
        </div>
    )
}

export default Signup            