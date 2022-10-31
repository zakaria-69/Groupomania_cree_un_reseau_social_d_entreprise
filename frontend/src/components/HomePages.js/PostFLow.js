import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import EditPost from './EditPost';

const PostFLow = () => {
    const [allPostsDatas, setAllPostsDatas] = useState('');
    // handleCardDisplay();
    const [postDataI, setPostDataI] = useState('');

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
                    setAllPostsDatas(res.data)
                    //  console.log(allPostsDatas)
                })
                .catch((err) => console.log(err));
        }; getAllPosts()
    }, [])

    return (
        <div className='posts-flow-subcontainer'>
            <div className='posts-flow-display'>
                <EditPost />
                <ul>

                    {allPostsDatas &&
                        allPostsDatas.reverse() &&
                        allPostsDatas.map((post) => {
                            // console.log('postfrom map : ',post.id)
                            return <Card post={post} key={post.id} />
                        })
                    }
                </ul>
            </div>
        </div>
    );

}

export default PostFLow;