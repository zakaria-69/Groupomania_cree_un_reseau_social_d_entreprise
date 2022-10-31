import React, { useEffect, useState } from "react";
import Routes from './components/Routes';
import axios from "axios";

const App = () => {

const userId = localStorage.getItem('userId');

useEffect(() =>{
  const getToken = async () =>{
   axios.get(`${process.env.REACT_APP_API_URL}api/users/`+userId,
    {headers : {authorization : 'bearer '+ localStorage.getItem('token')},
    Accept :  'application/json',
    'Content-Type': 'application/json',
    
  })
  .then((res) => {
    console.log('res01',res);
        })
.catch((err)=>console.log('No token',err));

};
getToken();
}, []);

  return (
    <Routes />
  );
}

export default App;
