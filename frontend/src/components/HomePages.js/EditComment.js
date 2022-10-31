import React, { Component ,useState ,useEffect} from 'react';
import axios from 'axios';

const EditComment = (comment) => {


    const [userInfos,setUserInfos]= useState('');
const [allCommentsDatas,setAllCommentsDatas] = useState('');
let [createdAt,setCreatedAt] = useState('');
let [updatedAt,setUpdatedAt] = useState('');
let [uid,setUid] = useState('');
let [commentId,setCommentId] = useState('');
let [uniqueCommentId,setUniqueCommentId] = useState('');
let [like,setLike] = useState('');
let [content,setContent] = useState('');
const [isUpdated,setIsUpdated] = useState('');
//const [userId,setUserId] = useState ('');
const [allPostsDatas,setAllPostsDatas] = useState('');
const [isComUpdated,setIsComUpdated] = useState(false);
const [postId,setPostId] = useState('');
                 



   let userId = localStorage.getItem('userId')
   userId =parseInt(userId)
    console.log('constuserId',userId)
 //comment = comment.comment;
console.log('data.comment',comment)
//console.log(comment.id);
//console.log(comment.CommentId);
//console.log('userInfos',userInfos.id)

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

useEffect(() => {
   
    const getUser = async (comment) => {
        console.log('comment from get user',comment)
        axios.get(`${process.env.REACT_APP_API_URL}api/users/` + userId,
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
}, [EditComment])

//get all posts
useEffect(() => {
    const getAllPosts = async () => {
        axios.get(`${process.env.REACT_APP_API_URL}api/posts`,
            {
                headers: { authorization: 'bearer ' + localStorage.getItem('token') ,
                Accept: 'application/json',
                'Content-Type': 'application/json',

            }})
            .then((res) => {
                setAllPostsDatas(res.data)
               console.log('AllPostsDatas form comment Card', allCommentsDatas)
            })
            .catch((err) => console.log(err));
    }; getAllPosts()
}, [EditComment])


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
               // console.log('AllcommentsDatas', allCommentsDatas)
            })
            .catch((err) => console.log(err));
    }; getAllComments()
}, [EditComment])


const handleSubmitComment = async () => {
   console.log('userinfosId',comment.UserId)
   console.log('commentID',comment.CommentId)
     if(content === '' ||  comment.CommentId ==='' || comment.UserId === ''){
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
},[])*/
 


        return (
            <div>
                 {/*}  <form action=''  id ='comment-submit-form' onSubmit={handleSubmitComment} >*/} 
        <div className='post-edit'>
            <h3>{userInfos.firstName} {userInfos.userName}</h3>
           {/* <label htmlFor='content' id='content'>Commentaire</label> */}
            {/*<CommentFlow />*/}
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
        </div>*/}
            <input type="submit"
             className="submit-comment"
             value="commenter"
             onClick={handleSubmitComment}
             
            />            
        </div>
        {/*</form>  */}
            </div>
        );
    }

export default EditComment;