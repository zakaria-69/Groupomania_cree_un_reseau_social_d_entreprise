import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

const Card = () => {
    const [userInfos, setUserInfos] = useState('');
    const [AllPostsDatas, setAllPostsDatas] = useState('');

    const userId = localStorage.getItem('userId');

    //get user pour afficher son nom sur la card

    useEffect(() => {
        const getUser = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}api/users/` + userId,
                {
                    headers: { authorization: 'bearer ' + localStorage.getItem('token') },
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                })
                .then((res) => {
                    setUserInfos(res.data)
                    console.log('userInfos', userInfos);
                })
                .catch((err) => console.log(err));

        };
        getUser();
    }, [])


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
                    console.log('AllPostsDatas', AllPostsDatas)
                })
                .catch((err) => console.log(err));
        }; getAllPosts()
    }, [Card])


    const handleCardDisplay = () => {
        console.log(AllPostsDatas[0].UserId)
        if (AllPostsDatas === '' || AllPostsDatas === null) {
            console.log('aucun posts à afficher')
        } else {
            for (let i = 0; i < AllPostsDatas.length; i++) {
                if (AllPostsDatas[i].UserId === userInfos.id) {
                    console.log('userInfos.id', userInfos.userName)
                    //  return userInfos.userName;
                    //    console.log('AllPostsDatas.UserId',userId)

                    //  console.log('ok')


                }
            }
        }




    }


    return (
        <div className='card'>
            <div className='header-card'>
                <h3 className="userName-card" >
                    {userInfos.firstName} {userInfos.lastName}
                </h3>
                <div className='date-style-handler'>
                    <span className='creation-date'>date creation</span>
                    <span className='udpated-date'>date creation</span>
                </div>
            </div>
            <div className='body-card'>
                <img src='#' alt='post-picture'></img>
            </div>
            <div className='footer-card'>
                <span><button onClick={handleCardDisplay}><i class="fa-regular fa-comment"></i></button></span>
                <span><button onClick={handleCardDisplay}><i class="fa-regular fa-heart"></i></button></span>
            </div>
        </div>
    );
}

export default Card;