import axios from 'axios'
import React, { useState } from 'react'

const Post = (props) => {

    const [ newPostComment, setNewPostComment ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

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

  return (
    <>
        <div className='post-card mt-5 mb-5 bg-white p-3'>
            <div className='top-part'>
                <a href='/profile'>
                    <img src={props.post.user?.profilePic} width={47} height={49} className='user-profile rounded-circle' />
                </a>
                <div className='user-info'>
                    <a href='/profile'>
                        <h5 className='user-fullname mb-0'>{`${props.post.user?.firstName} ${props.post.user?.lastName}`}</h5>
                    </a>
                    <small className='posted-time'>{ new Date(props.post.createdAt).toDateString() }</small>
                </div>
                <div className='props.post-options'>
                    <i className='fa fa-ellipsis-vertical'></i>
                </div>
            </div>
            <p className='post-content mt-3'>
                { props.post.postContent }
            </p>
            { props.post.postImage && <img src={props.post?.postImage} width="100%" className='rounded' /> }
            <div className='post-reactions mt-3'>
                <div className='reaction'>
                    { props.post.likes.length > 0  
                        ? <span><i className='icon fa fa-heart mt-3'></i></span> 
                        : <span><i className='icon fa-regular fa-heart mt-3'></i></span>
                    }
                    <p className='mt-3'>{ props.post?.likes.length }</p>
                </div>

                <div className='reaction comment'>
                    { props.post.comments.length > 0 
                        ? <span><i className='icon fa fa-comment-dots mt-3'></i></span>
                        : <span><i className='icon fa-regular fa-comment-dots mt-3'></i></span>
                    }
                    <p className='mt-3'>{ props.post?.comments.length }</p>
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
                props.post.comments.length > 0 &&
                <div>
                    <hr/>
                    <div className='post-comment rounded'>
                        <img src={props.post.comments[0].user?.profilePic} width={28} height={28} className='user-profile rounded-circle' />
                        <div className='post-comment-content rounded'>
                            <div>
                                <p className='post-comment-fullname mb-0'>{props.post?.comments[0].user.firstName}</p>
                                <p className='p-2'>{props.post.comments[0].commentContent}</p>
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
                        props.post.comments.map((comment) => (
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