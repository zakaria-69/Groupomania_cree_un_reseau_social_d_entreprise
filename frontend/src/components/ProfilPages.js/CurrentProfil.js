import React, { Component , useState,useEffect} from 'react';
import axios from 'axios';

const CurrentProfil= () => {
    let [userInfos,setUserInfos] = useState('');
    const userId=localStorage.getItem('userId');
    console.log(userInfos)

    let image = (userInfos.profilPicture);
    console.log('img=====',image)

    //if(image === ''){
        //image =('../../img/empty-profil-user.png')
    //}
    
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



const handleDeleteProfilPicture =() => {
    if(userId == userInfos.id && image){  
        const deleteProfilPicture = async () => {
                       await axios.delete(`${process.env.REACT_APP_API_URL}api/users/`+ userId +`/image`,
                            {
                                headers: { authorization: 'bearer ' + localStorage.getItem('token') ,
                                Accept: 'application/json',
                                'Content-Type': 'application/json',           
                            }})
                            .then((res) => {
                                alert('vôtre image a été correctement supprimé')
                                window.location='./profil'
                            })
                            .catch((err) =>{console.log(err)
                             alert(`Désolé!vous n'êtes pas autorisé a supprimé cette image!`)});

                            
                    }; deleteProfilPicture();
           
        }else{
            alert(`Aucune image à supprimer`)

        };
}
    
    //console.log('userInfos2',userInfos.firstName)

        return (
            <div>
                <div className='update-container'>
                    <h3>Image de profil</h3>
                    {image ? (<div>
                        <img id='update-profilPicture' src={image} alt='user-profil-picture' />
                        <p>supprimer l'image</p>
                        <buton title='delete-image' onClick={handleDeleteProfilPicture}>
                            <i class="fa-solid fa-xmark fa-lg">
                            </i>
                        </buton>
                    </div>) :
                        (<img id='update-profilPicture' src='../../img/empty-profil-user.png' alt='user-profil-picture' />)}
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