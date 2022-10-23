import React, { Component } from 'react';

const EditPost= () => {
   
        return (
            <div className='post-edit'>
                <h3>userName</h3>
                <input type='text'
                        placeholder='title'
                        className='title-edit'
                        maxLength={25}>
                </input>
                <input  type='file' 
                        className='imageUrl-pic'
                        accept='.jpg, .png, .jpeg, .gif'>
                </input>
                <textarea type='text'
                        placeholder='text'
                        maxLength={150}
                        className='textContent-edit'>
                </textarea>
                <input type='submit'
                 className='submit-post'
                 value='poster'>
                </input>
                
                
            </div>
        );
    }

export default EditPost;