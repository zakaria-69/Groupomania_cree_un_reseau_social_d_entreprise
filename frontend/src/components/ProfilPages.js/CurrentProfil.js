import React, { Component , useState,useEffect} from 'react';
import axios from 'axios';

const CurrentProfil= () => {
    let [userInfos,setUserInfos] = useState('');
    const userId=localStorage.getItem('userId');
    //console.log(userId)
    
    useEffect(() =>{
    const getUser = async() => {
        axios.get(`${process.env.REACT_APP_API_URL}api/users/`+userId,
        {headers : {authorization : 'bearer '+ localStorage.getItem('token')},
        Accept :  'application/json',
        'Content-Type': 'application/json',
        
      })
      .then((res) => {
       setUserInfos(res.data)
       // console.log('userInfos',userInfos);
            })
    .catch((err)=>console.log(err));
    
    };
    getUser();
},[])
    
    //console.log('userInfos2',userInfos.firstName)

        return (
            <div>
                <div className='update-container'>
                        <h3>Image de profil</h3>
                        <img id='update-profilPicture' src={userInfos.profilPicture} alt='user-profil-picture' />
                        <h4>Prénom</h4>
                        <p >{userInfos.firstName}</p>
                        <h4>Nom</h4>   
                        <p>{userInfos.lastName}</p>
                        <h4>Pseudo</h4>
                        <p>{userInfos.userName}</p>
                        <h4>Email</h4>
                        <p>{userInfos.email}</p>
                        <h4>Bio</h4>
                        <p id="current-bio">{userInfos.bio}</p>     
                    </div>
                        
</div>
        );
    }


export default CurrentProfil;