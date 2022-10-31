/*import React, { Component ,useState ,useEffect} from 'react';
import axios from 'axios';

const EditComment = (comment) => {

let [commentId,setCommentId] = useState('');
let [content,setContent] = useState('');

   let userId = localStorage.getItem('userId')
   userId =parseInt(userId)
    console.log('constuserId',userId)



//


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


const handleSubmitComment = async () => {
    console.log('com content',content)
   console.log('userinfosId',userId)
   await axios({
    method: 'patch',
    url: `${process.env.REACT_APP_API_URL}api/comment/`+ post.id,
    data: {
        image,
        title,
        text
    },
    headers: {
        authorization: 'bearer ' + localStorage.getItem('token'),
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
    }
})
    .then((res) => {
        console.log('title 4', title)
        setAllPostsDatas(res.data)
        alert('vôtre post a été correctement modifié')
        setIsUpdated(false)
        // window.location.reload();
        console.log('AllPostsDatas from patch post', res)
    })
    .catch((err) => {
        console.log(err)
        alert("Désolé!Vous n'êtes pas autorisé à modifié ce post!")
    })
    /* if(content === '' ||  comment.CommentId ==='' || comment.UserId === ''){
         alert('un des champs est vide')
         setContent('')
     }else if( content === null ||userId ===null || commentId === null){
         alert("un des champs n'est pas bon ")
         setContent('')
     }else if( content === undefined ||comment.CommentId ===undefined || commentId === undefined){
         alert("un des champs est undefined ")
         setContent('')
     }{
         await axios({
             method :"post",
             url:`${process.env.REACT_APP_API_URL}api/comments`,
                  data: {
                     content,
                     UserId :comment.UserId,
                     CommentId : comment.CommentId
                 },
                     headers: { authorization: 'bearer ' + localStorage.getItem('token') ,
                     Accept: 'application/json',
                     'Content-Type': 'application/json'
 
                 }})
                 .then((res) => {
                     console.log(res)
                     alert('Post crée avec succès');
                     setContent('')
                     
                 })
                 .catch((err) =>alert( console.log(err)));
                 setContent('');
                // alert("err")
     }
 }
    


/*useEffect(() => {
    const handleCommentCardDisplay = () => {
    // console.log(allPostsDatas[0].UserId)
       setCommentId(comment.CommentId);
        console.log('createdAt',commentId)
        setPostId(comment.PostId);
        console.log('updatedAt',postId)
        setContent(comment.content);
         console.log('uid',content);
        setCreatedAt(comment.createdAt);
         console.log('commentId',createdAt);
        setUpdatedAt(comment.updatedAt);
         console.log('like',updatedAt);
         setLike(comment.like);
        console.log('content',like)
  
    };return  handleCommentCardDisplay();
},[])
 


        return (
            <div>
                 {/*}  <form action=''  id ='comment-submit-form' onSubmit={handleSubmitComment} > 
        <div className='post-edit'>
            <h3>Entrez new comments</h3>
           {/* <label htmlFor='content' id='content'>Commentaire</label> 
            {/*<CommentFlow />
            <textarea 
                    type='text'
                    name='update-content'
                    placeholder='entrez vôtre commentaire'
                    className='comment-edit'
                    id='content'
                    maxLength={250}
                    onChange={(e) => setContent(e.target.value)}
            //value={content}
            >
            </textarea>
            
          {/*}  <div className='comment-date-handler'>
                <span className='creation-date'>{timeStampHandler(createdAt)}</span>
                <span className='udpated-date'>{timeStampHandler(updatedAt)}</span>
        </div>
            <input type="submit"
             className="submit-comment"
             value="commenter"
             onClick={handleSubmitComment}
             
            />            
        </div>
        {/*</form>  
            </div>
        );
    }

export default EditComment;*/