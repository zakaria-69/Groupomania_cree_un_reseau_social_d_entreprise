import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
//import DeletePost from './DeletePost';
//import {handleDeletePost} from './DeletePost'

const Card = (data) => {
    const [myPost,setMyPost] = useState('');
    const [userInfos, setUserInfos] = useState('');
    const [allPostsDatas, setAllPostsDatas] = useState('');
    let [createdAt,setCreatedAt] = useState('');
    let [updatedAt,setUpdatedAt] = useState('');
    let [uid,setUid] = useState('');
    let [postId,setPostId] = useState('');
    let [image,setImage] = useState('');
    let [postLikeNumber,setPostLikeNumber] = useState('');
    let [text,setText] = useState('');
    let [title,setTitle] = useState('');
    const [isUpdated,setIsUpdated] = useState(false)

    const userId = localStorage.getItem('userId')
 
    const post = data.post;
    //console.log(post)
    
   // JSON.parse(post)
    //console.log('jsonPaarse ==',JSON.parse(post))
    //setMyPost(post);

    //get user pour recuperer les data du user connecter

    useEffect(() => {
        const getUser = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}api/users/` + post.UserId,
                {
                    headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                })
                .then((res) => {
                    setUserInfos(res.data)
                  // console.log('userInfos', userInfos);
                })
                .catch((err) => console.log(err));

        };
        getUser();
    }, [Card])


    //get all posts pour recuperer un tableau de tout les posts

    useEffect(() => {
        const getAllPosts = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}api/posts`,
                {
                    headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                })
                .then((res) => {
                    setAllPostsDatas(res.data)
                    //console.log('AllPostsDatas', allPostsDatas)
                })
                .catch((err) => console.log(err));
        }; getAllPosts()
    }, [Card])


    //fonction de suppression de post 
        const handleDeletePost= () =>{
           if(userId == post.UserId){  
        const deleteOnePost = async () => {
                       await axios.delete(`${process.env.REACT_APP_API_URL}api/posts/` + post.id,
                            {
                                headers: { authorization: 'bearer ' + localStorage.getItem('token')} ,
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
            
                            })
                            .then((res) => {
                               // setAllPostsDatas(res.data)
                                alert('vôtre post a été correctement supprimé')
                                window.location.reload();
                                //alert(res.response.data.message)
                                 //console.log('AllPostsDatas', allPostsDatas)
                            })
                           // console.log(res.response.data.message)
                            .catch((err) =>{console.log(err)
                             alert(`Désolé!vous n'êtes pas autorisé a supprimé ce message!`)});

                            
                    }; deleteOnePost()
           
        }else{
            alert(`Désolé!vous n'êtes pas autorisé a supprimé ce message!`)

        };
    }

//fonction de modification de post 
    const handleUpdateOnePost = () => {
       // JSON.stringify(userId)
       if(userId == post.UserId){  
            const updateOnePost = async () => {

                await axios({
                method : 'patch',
                url : `${process.env.REACT_APP_API_URL}api/users/` + post.id,
                data: {
                    image,
                    title,
                    text
                },
                      headers: { authorization: 'bearer ' + localStorage.getItem('token'),
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        
                    }})
                 .then((res) => {
                    setAllPostsDatas(res.data)
                    alert('vôtre post a été correctement modifié')
                    setIsUpdated(false)
                   // window.location.reload();
                     console.log('AllPostsDatas from patch post', res)
                    })
                    .catch((err) => {console.log(err)
                        alert("Désolé!Vous n'êtes pas autorisé à modifié ce post!")
                      
                    })
            };updateOnePost();
    }else{
        alert("Désolé!Vous n'êtes pas autorisé à modifié ce post!")
    }
}
                          /* await axios.patch(`${process.env.REACT_APP_API_URL}api/posts/` + post.id,
                            data : {
                                    title,
                                    image,
                                    text
                                },
                                    headers: { authorization: 'bearer ' + localStorage.getItem('token'),
                                    Accept: 'application/json',
                                    'Content-Type': 'multipart/form-data'
                
                                })
                                .then((res) => {
                                    setAllPostsDatas(res.data)
                                    alert('vôtre post a été correctement modifié')
                                   // window.location.reload();
                                    alert(res.response.data.message)
                                     console.log('AllPostsDatas from patch post', allPostsDatas)
                                }).catch((err) => console.log(err))
                                //alert(`Désolé!vous n'êtes pas autorisé a modifié ce message!`));
    
                                
                        }; updateOnePost()
                    }else{
                       // alert(`vous n'êtes pas autorisé a supprimé ce message`)
                        console.log('dans le else')
                    }
               
            };*/
    




    
    
//fonction pour attribuer les data d'un post a des variables ou verifier si des posts existe
    useEffect(() => {
    const handleCardDisplay = () => {
       // console.log(allPostsDatas[0].UserId)
       setCreatedAt(post.createdAt);
       //  console.log('createdAt',createdAt)
        setUpdatedAt(post.updatedAt);
       //  console.log('updatedAt',updatedAt)
        setUid(post.UserId);
       //  console.log('uid',uid);
        setPostId(post.id);
       //  console.log('postId',postId);
        setImage(post.imageUrl);
        // console.log('image',image);
        setPostLikeNumber(post.like);
       //  console.log('postLikeNumber',postLikeNumber);
        setText(post.text);
       //  console.log('text',text)
       setTitle(post.title);
         console.log('title',title);
  
    };return  handleCardDisplay();
},[userInfos])

//conversion des date et heures en jours lettre entier date 2 digit année 4 chiffres + heures minutes secondes
const timeStampHandler = (num) =>{
    let options = {
        hour: '2-digit',
        minute:'2-digit' ,
         second: '2-digit',
         weekday:'long',
         year:'numeric',
         month:'short',
        day:'numeric'
        };
        let timeStamp = Date.parse(num);
        let date = new Date(timeStamp).toLocaleDateString('fr-FR',options)

        return date.toString();

}

return (
    
    <div className='card'>
        <div className='header-card'>
            <h3 className="userName-card" >
                {userInfos.firstName} {userInfos.lastName}
            </h3>
            <div className='date-style-handler'>
                <span className='creation-date'>{timeStampHandler(createdAt)}</span>
                <span className='udpated-date'>{timeStampHandler(updatedAt)}</span>
            </div>
        </div>
        <div className='post-title'>
         {isUpdated === false &&  <h3>{title}</h3>}
         {isUpdated && (
            <div className='post-title'>
                <input 
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}/>
                <div className='title-edit'>
                    <button className='title-btn-edit' onClick={handleUpdateOnePost}>Validez modifications
                    </button>
                </div>
            </div>
            

         )}
        </div>
        <div class="textContent-card">{text}</div>
        {image ? (<div className='body-card'>
            <img src={image} alt='post-picture' className='post-imageUrl'></img>
        </div>) : (
            <div className='body-card' style={{display:'none'}}></div>
          // <nav className='footer-card' style={{display:'none'}}></nav>
        


        )}
        {image ? ( <nav className='footer-card'>
            {userId == post.UserId ? (
                <ul>
                    <li><button title='delete' onClick={() => {
                        if (window.confirm('voulez vous vraiment supprimer vôtre publication?')) { handleDeletePost(); }
                    }}><i class="fa-regular fa-trash-can"></i></button></li>
                    <li><button title='update' onClick={() => setIsUpdated(!isUpdated)}><i class="fa-regular fa-pen-to-square"></i></button></li>
                    <li id='like-item'><button title='like'><i class="fa-regular fa-heart"><span id={postLikeNumber ? 'post-like-number' : null}>{postLikeNumber}</span></i></button></li>
                </ul>
            ) : (
                     <ul>
                    <li id='like-item'><button title='like'><i class="fa-regular fa-heart"><span id={postLikeNumber ? 'post-like-number' : null}>{postLikeNumber}</span></i></button></li>
                    </ul>
    
            )}
            
        </nav>) : (
             <nav className='footer-card' style={{borderTop:'none'}}>
             {userId == post.UserId ? (
                 <ul>
                     <li><button title='delete' onClick={() => {
                         if (window.confirm('voulez vous vraiment supprimer vôtre publication?')) { handleDeletePost(); }
                     }}><i class="fa-regular fa-trash-can"></i></button></li>
                     <li><button title='update' onClick={() => setIsUpdated(!isUpdated)}><i class="fa-regular fa-pen-to-square"></i></button></li>
                     <li id='like-item'><button title='like'><i class="fa-regular fa-heart"><span id={postLikeNumber ? 'post-like-number' : null}>{postLikeNumber}</span></i></button></li>
                 </ul>
             ) : (
                
                <ul>
                <li id='like-item'><button title='like'><i class="fa-regular fa-heart"><span id={postLikeNumber ? 'post-like-number' : null}>{postLikeNumber}</span></i></button></li>
                </ul>
             )}
             
         </nav>


        )}

        <div className='comments'>
            commentaires
            <span><button title='comment'><i class="fa-regular fa-comment"></i></button></span>

        </div>
    </div>
);

}
export default Card;
