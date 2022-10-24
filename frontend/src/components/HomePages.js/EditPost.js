import React, { Component, useState ,useEffect } from 'react';
import axios from 'axios';

const EditPost= () => {
    const [image ,setImage] = useState('');
    const [title,setTitle]= useState('');
    const [text,setText] = useState('');
    const [sendPost , setSendPost] = useState('');


    /*var input = document.getElementById("image");
    var fReader = new FileReader();
    fReader.createObjectURL(input.files[0]);
    fReader.onloadend = function(event)
    {var img = document.getElementById("image");
        img.src = event.target.result;}*/

    const userId = localStorage.getItem('userId')

    



   const handleSubmitPost = async (e) => {
    //e.preventdefault();
    console.log('**START HANDLE UPDATE PROFILE**');
    console.log('image :' + image);
    //console.log('profilPicture :'+profilPicture);
    console.log('title :' + title);
    console.log('text :' + text);
    console.log('sendPost :', sendPost);
    //console.log('bio :' + bio);
    console.log('**END HANDLE UPDATE PROFILE**');
    //controle si tout les champs vides 
    if(image ==='' && title ===''&& text==='' ){
        alert('rien a poster')
        e.preventDefault();
    }else{
       // alert('rien a poster')
        //e.preventdefault();
        await axios({
            method :"post",
            url:`${process.env.REACT_APP_API_URL}api/posts`,
                 data: {
                    image,
                    title,
                    text
                },
                    headers: { authorization: 'bearer ' + localStorage.getItem('token') ,
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'

                }})
                .then((res) => {
                    alert('Post crée avec succès')
                   // setSendPost(res.data)
                    console.log('setsendDatas', sendPost)
                    
                })
                .catch((err) => console.log(err));
    }

   }

    /*useEffect(() => {
        const createPost = async () => {
           await axios({
            method :"post",
            url:`${process.env.REACT_APP_API_URL}api/posts`,
                 data: {
                    image,
                    title,
                    text
                },
                    headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                   

                })
                .then((res) => {
                    setSendPost(res.data)
                    console.log('setsendDatas', sendPost)
                })
                .catch((err) => console.log(err));
        }; createPost()
 }, [])*/

        return (
            <form action='' onSubmit={handleSubmitPost} id ='post-submit-form' >
            <div className='post-edit'>
                <h3>userName</h3>
                <input type='text'
                        placeholder='title'
                        className='title-edit'
                        maxLength={125}
                        onChange={(e) => setTitle(e.target.value)}
                value={title}
                        >
                </input>
                <input  type='file' 
                        className='image-pic'
                        id='image'
                        accept='.jpg, .png, .jpeg, .gif'
                        onChange={(e) => setImage(e.target.files[0])}
                       
                        >
                </input>
                <textarea type='text'
                        placeholder='text'
                        maxLength={500}
                        className='textContent-edit'
                        onChange={(e) => setText(e.target.value)}
                value={text}>
                </textarea>
                <input type="submit"
                 className="submit-post"
                 value="poster"
                /> 
              
                
                
            </div>
            </form>
        );
    }

export default EditPost;