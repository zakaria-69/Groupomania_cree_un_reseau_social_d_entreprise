import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import CommentCard from './CommentCard';
//import DeletePost from './DeletePost';
//import {handleDeletePost} from './DeletePost'

const Card = (data) => {
    const [allCommentsDatas,setAllCommentsDatas] = useState('');
    const [displayComments,setDisplayComments] = useState(false);
    const [myPost,setMyPost] = useState('');
    const [userInfos, setUserInfos] = useState('');
    const [allPostsDatas, setAllPostsDatas] = useState('');
    let [createdAt,setCreatedAt] = useState('');
    let [updatedAt,setUpdatedAt] = useState('');
    let [uid,setUid] = useState('');
    let [postId,setPostId] = useState('');
    let [image,setImage] = useState('');
    let [like,setLike] = useState('');
    let [text,setText] = useState('');
    let [title,setTitle] = useState('');
    const [isUpdated,setIsUpdated] = useState(false)
    const [isLiked,setIsLiked] = useState(false);
    const [content,setContent] = useState('');
    const[isAdmin,setIsAdmin] = useState(false);

    const userId = localStorage.getItem('userId')
 
    const post = data.post;
    //console.log('data.post',post)
    

   

    

    //get user pour recuperer les data du user de chaque post

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
           if(userInfos.id === post.UserId || userInfos.isAdmin){  
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
                                console.log('userInfos admin',userInfos.isAdmin)
                                console.log('userId',userId)
                                console.log('post.UserId',post.UserId)
                             alert(`Désolé!vous n'êtes pas autorisé a supprimé ce message!`)});
                            

                            
                    }; deleteOnePost()
           
        }else{
            alert(`Désolé!vous n'êtes pas autorisé a supprimé ce message!`)

        };
    }

//fonction de modification de post 
    const handleUpdateOnePost = () => {
       if(userInfos.id === post.UserId || userInfos.isAdmin){  
            const updateOnePost = async () => {
                if(title || text || image ){
                    console.log('**START HANDLE UPDATE POST**');
                    console.log('title :', title);
                    console.log('post title :', post.title);
                    console.log('image :', image);
                    console.log('post image :' , post.imageUrl);
                    console.log(' text :'  , text);
                    // console.log('lastName :' + lastName);
                    // console.log('userName :' + userName);
                    // console.log('bio :' + bio);
                    console.log('**END HANDLE UPDATE POST**');
            await axios({
                method : 'patch',
                url : `${process.env.REACT_APP_API_URL}api/posts/` + post.id,
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
                    console.log('title 4',title)
                    setAllPostsDatas(res.data)
                    alert('vôtre post a été correctement modifié')
                    setIsUpdated(false)
                   // window.location.reload();
                     console.log('AllPostsDatas from patch post', res)
                    })
                    .catch((err) => {console.log(err)
                        alert("Désolé!Vous n'êtes pas autorisé à modifié ce post!")
                  })
                     }else{
                alert('rien à modifié')
            }
    };updateOnePost();
}else{
        alert("Désolé!Vous n'êtes pas autorisé à modifié ce post!")
    }
}  


//fonction de suppression d'image sur un post
const handleDeletePostPicture =() => {
    if(userId == post.UserId || userInfos.isAdmin && image){  
        const deleteOnePostPicture = async () => {
                       await axios.delete(`${process.env.REACT_APP_API_URL}api/posts/`+ post.id +`/image`,
                            {
                                headers: { authorization: 'bearer ' + localStorage.getItem('token') ,
                                Accept: 'application/json',
                                'Content-Type': 'application/json',           
                            }})
                            .then((res) => {
                                alert('vôtre image a été correctement supprimé')
                                window.location='./'
                            })
                            .catch((err) =>{console.log(err)
                             alert(`Désolé!vous n'êtes pas autorisé a supprimé cette image!`)});

                            
                    }; deleteOnePostPicture()
           
        }else{
            alert(`Aucune image à supprimer ou vous n'avez pas les droits.`)

        };


}




//fonction de gestion des likes sur les posts
 /*   const handleLikePost = async () => {
        if(post.userId !== userId && !isLiked ){
            console.log('veut liker')
           // console.log(like)
        }
        
await axios.post(`${process.env.REACT_APP_API_URL}api/posts/`+ post.id +'/like',
       
            {
            data: {
             like,

            },
                headers: { authorization: 'bearer ' + localStorage.getItem('token') ,
                Accept: 'application/json',
                'Content-Type': 'application/json',

            }})
            .then((res) => {
                setLike(res.data)
                console.log('postlikeNumber', like)
            })
            .catch((err) => console.log(err));
    }; handleLikePost()*/

    //get all comments
    useEffect(() => {
        const getAllComments = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}api/comments`,
                {
                    headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
    
                })
                .then((res) => {
                    setAllCommentsDatas(res.data)
                    console.log('AllcommentsDatas', allCommentsDatas)
                })
                .catch((err) => console.log(err));
        }; getAllComments()
    }, [CommentCard])


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
        setLike(post.like);
       //  console.log('like',like);
        setText(post.text);
       //  console.log('text',text)
       setTitle(post.title);
       //  console.log('title',title);
  
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
        <form action='' className='form-update' onSubmit={handleUpdateOnePost}>
        <div className='post-title'>
         {isUpdated === false &&  <h3>{title}</h3>}
         {isUpdated && (
             <div className='post-title'>
                 <label htmlFor='title-field-edit' className='title-update'>modification du titre</label> 
                <input 
                type='text'
                id='title-field-edit'
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}/>
                </div>
         )}
         </div>       
         {isUpdated === false && <div class="textContent-card" >{text}</div> }
       {isUpdated && <div class="textContent-card" >
       <label htmlFor='text-update' className='text-update'>modification du text</label>
            <textarea type='text'
            name='text-update'
            id='text-update'
            defaultValue={text}
            onChange={(e) =>setText(e.target.value)}></textarea>
        </div>}
            {isUpdated === false && image ? (<div className='body-card' id='test2'>
            <img src={image} alt='post-picture' className='post-imageUrl'></img>
        </div>) : (<div className='body-card' style={{display:'none'}}></div>)}              
        {isUpdated && 
        <div >
            <label htmlFor='image-update' className='image-update'>modification de l'image</label>
            <input type='file'
        name='image-update'
        className='image-pic'
        id='image-update'
        accept='.jpg, .png, .jpeg, .gif'
        onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <div className='delete-image-post-container'>
            <p className='delete-image-post-title'>supprimer image</p>
         <buton title='post-delete-image'  className='delete-image-post' onClick={handleDeletePostPicture}><i class="fa-solid fa-xmark fa-lg" id='fa-x-mark-post'></i></buton>
         </div>
        <div className='body-card'>
            <img src={image} alt='post-picture' className='post-imageUrl'></img>      
        </div>
        </div>       
        }  
         {isUpdated === false && 
         <input type="submit"
          value='mettre à jour la publication'
           className='update-profil-submit'
            style={{display:'none'}} />
            }
       {isUpdated && 
       <input type="submit"
        value='mettre à jour la publication'
         className='update-profil-submit'
          onClick={handleUpdateOnePost} 
          style={{display:'flex'}}></input>
          }       
    </form>
        {image ? (
        <nav className='footer-card'>
              <ul>
                    <li><button title='delete' onClick={() => {
                        if (window.confirm('voulez vous vraiment supprimer vôtre publication?'))
                         { handleDeletePost()}
                    }}>
                        <i class="fa-regular fa-trash-can">
                        </i>
                    </button>
                    </li>
                    <li>
                        <button title='update' onClick={() =>setIsUpdated(!isUpdated)}>
                            <i class="fa-regular fa-pen-to-square">
                            </i>
                        </button>
                    </li>
                    <li id='like-item'><button title='like'>
                        <i class="fa-regular fa-heart">
                            <span id={like ? 'post-like-number' : null}>
                                {like}
                            </span>
                        </i>
                    </button>
                    </li>
                </ul>
        </nav>) : (
            <nav className='footer-card' style={{ borderTop: 'none' }}>
                    <ul>
                        <li><button title='delete' onClick={() => {
                            if (window.confirm('voulez vous vraiment supprimer vôtre publication?')) { handleDeletePost(); }
                        }}><i class="fa-regular fa-trash-can"></i>
                        </button>
                        </li>
                        <li>
                            <button title='update'
                                onClick={() => setIsUpdated(!isUpdated)}>
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                        </li>
                        <li id='like-item'>
                           {/*} <button title='like' onClick={handleLikePost}>*/}
                                <i class="fa-regular fa-heart">
                                    <span id={like ? 'post-like-number' : null}>
                                        {like}
                                    </span>
                                </i>
                           {/*} </button>*/}
                        </li>
                    </ul>
             </nav>
        )}
        
        <div className='comments'>
            <div className='display-relative-comments'  onClick={() => setDisplayComments(!displayComments)}>
               <p className='toggle-comment-title'> commentaires</p>
                <span>
                    <button title='comment' className='toggle-comment-button' onClick={() => setDisplayComments(!displayComments)}>
                        <i class="fa-regular fa-comment">
                        </i>
                    </button>
                </span>
            </div>
            <div>

                        {displayComments &&
                <div className='comment-edit-and-display-container'>
                    <div className='edit-comments'>
                <form action=''  id ='comment-submit-form' > 
        <div className='post-edit'>
            <h3>{userInfos.firstName} {userInfos.userName}</h3>
            <label htmlFor='content' id='content'>Commentaire</label>
            {/*<CommentFlow />*/}
            <textarea type='text'
                    name='content'
                    placeholder='entrez vôtre commentaire'
                    className='comment-edit'
                    id='content'
                    maxLength={125}
                    onChange={(e) => setContent(e.target.value)}
            value={content}>
            </textarea>
            <div className='comment-date-handler'>
                <span className='creation-date'>{timeStampHandler(createdAt)}</span>
                <span className='udpated-date'>{timeStampHandler(updatedAt)}</span>
            </div>
            <input type="submit"
             className="submit-comment"
             value="commenter"
            />            
        </div>
        </form>
                    </div>
                    <ul>
                        {allCommentsDatas &&
                            // comment.id === comment.UserId &&
                            allCommentsDatas.reverse() &&
                            allCommentsDatas.map((comment) => {
                                console.log('postfrom map : ', comment.id)
                                return <CommentCard comment={comment} key={comment.id} />

                            })}
                    </ul>
                </div>
                }
            </div>

        </div>
       {/*} {displayComments && <CommentCard post={post} />} */}
    </div>
);

}
export default Card;
