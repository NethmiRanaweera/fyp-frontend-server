import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Manual from './components/Manual';
import Automatic from './components/Automatic';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState,useEffect } from 'react';
import instance from './axiosConfig';

function App() {
  const [user,setuser] = useState(null);

  const setloggedinuser = async () =>{
    const user = localStorage.getItem('token');
    if(user){
      await instance.get("/validate_token").then((res)=>{
      setuser(user);
    }).catch((e)=>{
      console.log(e);
      localStorage.removeItem('token');
    })
  }}
  useEffect(()=>{
    setloggedinuser();
  },[]);


  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {(!user)?<Login login = {setloggedinuser}/>:<Navigate to="/home"/> }/>
        <Route path='/signup' element = {(!user)?<Signup login = {setloggedinuser}/>:<Navigate to ="/home"/> }/>
        <Route path='/home' element = {(!user)?<Navigate to ="/"/>:<Home/> }/>
        <Route path='/manual' element = { (!user)?<Navigate to ="/"/>:<Manual/> }/>
        <Route path='/automatic' element = {(!user)?<Navigate to ="/"/>:<Automatic/> }/>
      </Routes>
    </div>
  );
}

export default App;
