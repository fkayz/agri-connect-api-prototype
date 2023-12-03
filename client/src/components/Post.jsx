import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Post = (props) => {

    // const navigate = useNavigate()

    const [ newPostComment, setNewPostComment ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ likedPost, setLikedPost ] = useState(false)
    const [ postLikedId, setPostLikedId ] = useState()
    const [ likeHeartClass, setLikeHeartClass ] = useState("icon fa-regular fa-heart mt-3")

    useEffect(() => {
        // const userLikedPostList = props.post.likes
        // const userLikedPostIDList = []
        // userLikedPostList.map((like) => userLikedPostIDList.push(like.user_id))

        // if user is in post likes then set the post to liked by default
        // if(userLikedPostIDList.includes(props.commentAuthor.id)) {
        //     console.log('user liked this post already', props.post.id)
        //     setPostLikedId(props.post.id)
        //     setLikedPost(true)
        // }
    }, [])

    const createNewPostCommentHandle = async (e) => {
        // e.preventDefault()
        const commentInfo = {
            commentContent: newPostComment,
            post_id: props.post.id,
            comment_author_id: props.commentAuthor.id
        }

        try{
            setIsLoading(true)
            const request = await axios.post('http://127.0.0.1:8000/api/comments/add', commentInfo)

            if(request.status === 200){
                console.log('comments', request.data)
                console.log('commented on post successfully!')
            }
        }catch(err){
            console.log(err)
        }finally{
            setIsLoading(false)
        }
    }

    const savePost = async (e, postID) => {
        try{
            const postInfo = {
                user_id: props.commentAuthor.id,
                post_id: postID
            }
            const post = await axios.post('http://127.0.0.1:8000/api/save_post/add', postInfo)

            if(post.status === 200){
                alert('Post saved successfully!')
            }
        }catch(err){
            alert('There was an error saving the post. Try again later!')
        }
    }

    const deletePost = async (e, postID) => {
        try{
            const deletePost = await axios.delete(`http://127.0.0.1:8000/api/posts/delete/${postID}`)

            if(deletePost.status === 200){
                window.location.href = '/'
            }
        }catch(err){
            alert('There was an error deleting the post. Try again later!', err)
        }
    }

    const removePost = async (e, postID) => {
        try{
            const post = await axios.delete(`http://127.0.0.1:8000/api/save_post/delete/${postID}`)
            if(post.status === 200) window.location.href = `/posts/saved/${props.commentAuthor.id}`
        }catch(err){
            console.log('remove post', err)
            alert('There was an error removing the post. Try again later!')
        }
    }

    const handleLikePost = async (e, postID) => {
        if(!likedPost){
            try{
                const likesInfo = {
                    user_id: props.commentAuthor.id,
                    post_id: postID
                }
                const like = await axios.post('http://127.0.0.1:8000/api/likes/add', likesInfo)

                if(like.status === 200){
                    setPostLikedId(like.data.like.id)
                    setLikeHeartClass('icon fa-solid fa-heart mt-3')
                    console.log('liked post', postID)
                }
            }catch(err){
                alert('There was an error perfoming the action. Try again later!')
                console.log('error liking post', err)
            }
            setLikedPost(true)
        }else{
            try{
                const deleteLike = await axios.delete(`http://127.0.0.1:8000/api/likes/delete/${postLikedId}`)

                if(deleteLike.status === 200){
                    setLikeHeartClass('icon fa-regular fa-heart mt-3')
                    console.log('unliked post', postID)
                }
            }catch(err){
                alert('There was an error perfoming the action. Try again later!')
                console.log('error liking post', err)
            }
            setLikedPost(false)
        }
    }

    // console.log('post info', props.post)

  return (
    <>
        <div className='post-card mt-5 mb-5 bg-white p-3'>
            <div className='top-part'>
                <a href='/profile'>
                    <img src={props.page === 'home' ? props.post.user?.profilePic : props.post.post.user?.profilePic} width={47} height={49} className='user-profile rounded-circle' />
                </a>
                <div className='user-info'>
                    <a href='/profile'>
                        <h5 className='user-fullname mb-0'>
                            {`${props.page === 'home' ? props.post.user?.firstName : props.post.post.user?.firstName} ${props.page === 'home' ? props.post.user?.lastName : props.post.post.user?.lastName}`}
                        </h5>
                    </a>
                    <small className='posted-time'>{ new Date(props.page === 'home' ? props.post.createdAt : props.post.post.createdAt).toDateString() }</small>
                </div>
                {/* <div className='props.post-options'>
                    <i className='fa fa-ellipsis-vertical'></i>
                </div> */}
                <div class="dropdown">
                    <i className='fa fa-ellipsis-vertical' id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {
                            props.page === 'home' ? <li><button class="dropdown-item text-success p-2" onClick={(e)=>savePost(e, props.post.id)}>Save Post</button></li> : ''
                        }
                        {
                            props.page === 'home'
                            ? props.commentAuthor.id === props.post.user?.id && <li><button class="dropdown-item text-danger p-2" onClick={(e)=>deletePost(e, props.post.id)}>Delete Post</button></li>
                            : <li><button class="dropdown-item text-danger p-2" onClick={(e)=>removePost(e, props.post.id)}>Remove Post</button></li>
                        }
                    </ul>
                </div>
            </div>
            <p className='post-content mt-3'>
                { props.page === 'home' ? props.post.postContent : props.post.post.postContent }
            </p>
            { 
                props.page === 'home'
                ? props.post.postImage && <img src={props.post?.postImage} width="100%" className='rounded' /> 
                : props.post.post.postImage && <img src={props.post.post?.postImage} width="100%" className='rounded' />
            }
            {
                props.page === 'home'
                ? props.post.postVideo && <video className='rounded' src={props.post?.postVideo} width='100%' controls loop></video> 
                : props.post.post.postVideo && <video className='rounded' src={props.post.post?.postVideo} width='100%' controls loop></video>
            }
            <div className='post-reactions mt-3'>
                <div className='reaction'>
                    {
                        props.page === 'home' && <span onClick={(e)=>handleLikePost(e, props.post.id)}><i className={likeHeartClass}></i></span> ||
                        props.page === 'saved' && <span onClick={(e)=>handleLikePost(e, props.post.post.id)}><i className={likeHeartClass}></i></span>
                    } 
                    <p className='mt-3'>{ props.page === 'home' ? props.post?.likes.length : props.post.post?.likes.length }</p>
                </div>

                <div className='reaction comment'>
                    <span><i className='icon fa-regular fa-comment-dots mt-3'></i></span>
                    <p className='mt-3'>{ props.page === 'home' ? props.post?.comments.length : props.post.post?.comments.length }</p>
                </div>
                <form onSubmit={createNewPostCommentHandle}>
                    {
                        isLoading
                        ? <div className="spinner-border text-info" role="status">
                            <span className="visually-hidden">Commenting...</span>
                        </div>
                        : <input value={newPostComment} onChange={(e) => setNewPostComment(e.target.value)} type='text' className='post-comment-input form-control' placeholder='Write your comment' />

                    }
                </form>
            </div>
            {
                props.page === 'home'
                ? props.post.comments.length > 0 &&
                <div>
                    <hr/>
                    <div className='post-comment rounded'>
                        <img src={props.page === 'home' ? props.post.comments[0].user?.profilePic : props.post.post.comments[0].user?.profilePic} width={28} height={28} className='user-profile rounded-circle' />
                        <div className='post-comment-content rounded'>
                            <div>
                                <p className='post-comment-fullname mb-0'>{props.page === 'home' ? props.post?.comments[0].user.firstName : props.post.post?.comments[0].user.firstName}</p>
                                <p className='p-2'>{props.page === 'home' ? props.post.comments[0].commentContent : props.post.post.comments[0].commentContent}</p>
                            </div>
                        </div>
                    </div>

                    {/* view more comments button */}
                    <div className='mt-3 text-center'>
                        <button type="button"  data-bs-toggle="modal" data-bs-target="#viewMoreCommentsModal" className='nav-btn text-primary'>View all comments <i className='fa fa-angle-down'></i></button>
                    </div>
                </div>

                : props.post.post.comments.length > 0 &&
                <div>
                    <hr/>
                    <div className='post-comment rounded'>
                        <img src={props.page === 'home' ? props.post.comments[0].user?.profilePic : props.post.post.comments[0].user?.profilePic} width={28} height={28} className='user-profile rounded-circle' />
                        <div className='post-comment-content rounded'>
                            <div>
                                <p className='post-comment-fullname mb-0'>{props.page === 'home' ? props.post?.comments[0].user.firstName : props.post.post?.comments[0].user.firstName}</p>
                                <p className='p-2'>{props.page === 'home' ? props.post.comments[0].commentContent : props.post.post.comments[0].commentContent}</p>
                            </div>
                        </div>
                    </div>

                    {/* view more comments button */}
                    <div className='mt-3 text-center'>
                        <button type="button"  data-bs-toggle="modal" data-bs-target="#viewMoreCommentsModal" className='nav-btn text-primary'>View all comments <i className='fa fa-angle-down'></i></button>
                    </div>
                </div>
            }
        </div>

        {/* view more comments modal */}
        <div class="modal fade" id="viewMoreCommentsModal" tabindex="-1" aria-labelledby="viewMoreCommentsModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="viewMoreCommentsModalLabel">All Comments</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {
                        props.page === 'home' ? props.post.comments.map((comment) => (
                            <div className='post-comment rounded'>
                                <img src={comment.user?.profilePic} width={28} height={28} className='user-profile rounded-circle' />
                                <div className='post-comment-content rounded'>
                                    <div>
                                        <p className='post-comment-fullname mb-0'>{comment.user?.firstName}</p>
                                        <p className='p-2'>{comment.commentContent}</p>
                                    </div>
                                </div>
                            </div>
                        ))

                        :

                        props.post.post.comments.map((comment) => (
                            <div className='post-comment rounded'>
                                <img src={comment.user?.profilePic} width={28} height={28} className='user-profile rounded-circle' />
                                <div className='post-comment-content rounded'>
                                    <div>
                                        <p className='post-comment-fullname mb-0'>{comment.user?.firstName}</p>
                                        <p className='p-2'>{comment.commentContent}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
        </div>
    </>
  )

}

export default Post