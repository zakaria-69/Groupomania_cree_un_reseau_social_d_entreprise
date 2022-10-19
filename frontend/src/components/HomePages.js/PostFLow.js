import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const PostFLow = () => {
    const [allPosts,setAllPosts] = useState('');
    

    //récuperation des posts via la route getAllPosts
    useEffect(() => {
        const getAllPosts = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}api/posts`,
                {
                    headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                })
                .then((res) => {
                    setAllPosts(res.data)
                    console.log('allPosts',allPosts)
                })
                .catch((err) => console.log(err));
        };getAllPosts()
    },[])


    return (
        <div className='posts-flow-subcontainer'>
            <div className='posts-flow-display'>
                <Card />


           

            </div>
        </div>
    );

}



export default PostFLow;