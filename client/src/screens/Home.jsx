import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getCookie from '../hooks/getCookie'
import setCookie from '../hooks/setCookie'
import axios from 'axios'
import OpenAI from 'openai'
import Post from '../components/Post';
import Navbar from '../components/Navbar'
import SideNavBar from '../components/SideNavBar';
import uploadPhotoLogo from '../assets/upload_photo_logo_logo.png'
import uploadVideoLogo from '../assets/upload_video_logo.png'
import { storage } from '../firebaseConfig.js'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import {formidable} from 'formidable'



const Home = () => {

    const navigate = useNavigate()

    const [ posts, setPosts ] = useState([]);
    const [ userListToFollow, setUserListToFollow ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ isLoadFetchFollowedUsrs, setIsLoadFetchFollowedUsrs ] = useState(false)
    const [ errorFetchFollowedUsrs, setErrorFetchFollowedUsrs ] = useState(false)
    const [ currentUser, setCurrentUser ] = useState(JSON.parse(getCookie('currentUser')))
    const [ followedUsersList, setFollowedUsersList ] = useState([])

    const [ newPost, setNewPost ] = useState('');
    const [ uploadImage, setUploadImage ] = useState('')
    const [ uploadVideo, setUploadVideo ] = useState('')


    let postImageLink = ''
    let postVideoLink = ''

    const [ uploadProgress, setUploadProgress ] = useState(0)

    useEffect(() => {
        const getAllPosts = async () => {
            try{
                setIsLoading(true)
                const posts = await axios.get('http://127.0.0.1:8000/api/posts')   
                if(posts.status === 200)
                    setPosts(posts.data.posts)
            }catch(err){
                setError(true)
            }finally{
                setIsLoading(false)
            }

        }

        const getAllUsers = async() => {
            
            try{
                setIsLoading(true)
                const users = await axios.get('http://127.0.0.1:8000/api/users')

                if(users.status === 200){
                    setUserListToFollow(users.data.users)
                }
            }catch(err){
                setError(true)
                console.log(err)
            }finally{
                setIsLoading(false)
            }
        }

        // get all followed users
        const getAllFollowedUsers = async() => {
            try{
                setIsLoadFetchFollowedUsrs(true)
                const followedUsers = await axios.get(`http://127.0.0.1:8000/api/follows/${currentUser.id}`)

                if (followedUsers.status === 200){
                    if(followedUsers.data.data.length > 0){
                        setFollowedUsersList(followedUsers.data.data)
                    }else{
                        console.log('user is not following anyone')
                    }
                }
            }catch(err){
                errorFetchFollowedUsrs(true)
                alert('There was an error fetching followed users!')
            }finally{
                setIsLoadFetchFollowedUsrs(false)
            }
        }

        getAllPosts() // fetching all posts
        getAllFollowedUsers() // fetch all the users the logged in user is following
        getAllUsers() // fetch all users
    }, [])

    let followedUsersIDs = []

    if(isLoadFetchFollowedUsrs === false && errorFetchFollowedUsrs === false) {
        followedUsersIDs = followedUsersList?.map((user) => user.followed_id)
    }

    const filteredUsers = userListToFollow.filter((user) => user.id !== currentUser.id && user.role !== 'cooperative' && !(followedUsersIDs.includes(user.id)))

    const followUser = async (event, user_to_follow) => {
        event.preventDefault()
        try{
            const followData = {
                followed_id: user_to_follow,
                follower_id: currentUser.id
            }

            const request = await axios.post('http://127.0.0.1:8000/api/follows/add', followData)

            if(request.status === 200){
                event.target.textContent = 'Following'
            }
        }catch(err){
            alert('failed to follow user. Try again sometime!')
        }
    }

    const initiateMedia = (inpt, mediaType) => {
        if(inpt.files && inpt.files[0]){
            const reader = new FileReader();

            reader.onload = (e) => {
                if(mediaType === 'photo'){
                    setUploadImage(inpt.files[0])
                    const imgPlaceholder = document.querySelector('.imgView')
                    imgPlaceholder.src = e.target.result
                }

                if(mediaType === 'video'){
                    setUploadVideo(inpt.files[0])
                    const imgPlaceholder = document.querySelector('.imgViewForVideo')
                    imgPlaceholder?.remove()
                    const vidPlayer = document.querySelector('.vidPlayer')
                    vidPlayer.src = e.target.result
                    vidPlayer.setAttribute('width', 400)
                    vidPlayer.setAttribute('height', 400)
                    vidPlayer.controls = true
                    vidPlayer.setAttribute('autoplay', true)
                    vidPlayer.setAttribute('loop', true)
                }
            }

            reader.readAsDataURL(inpt.files[0])
        }
    }

    const loadPhoto = (e) => {
       initiateMedia(e.target, 'photo')
    }

    const loadVideo = (e) => {
        initiateMedia(e.target, 'video')
    }

    const uploadPhotoToFirebase = (file) => {
        if(!file){
            alert('Error: Choose photo to upload')
            return
        }

        const storageRef = ref(storage, `/uploaded_files/posts/images/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        
        uploadTask.on('state_changed', 
            (snapshot) => {
                let progressUploadValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setUploadProgress(progressUploadValue)
            }, 
            (err) => { return alert(err) },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {postImageLink = url; sendPost('postWithPhoto');})
                .then(() => window.location.href = '/')
            }
        )
    }

    const uploadVideoToFirebase = (file) => {
        if(!file){
            alert('Error: Choose video to upload')
            return
        }

        const storageRef = ref(storage, `/uploaded_files/posts/videos/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        
        uploadTask.on('state_changed', 
            (snapshot) => {
                let progressUploadValue = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setUploadProgress(progressUploadValue)
            }, 
            (err) => { return alert(err) },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {postVideoLink = url; sendPost('postWithVideo');})
                .then(() => window.location.href = '/')
            }
        )
    }

    // send post

    const sendPost = async(postType) => {

        let postInfo = {}
        
        if(postType === 'plainPost'){
            postInfo = {
                postContent: newPost,
                post_author_id: currentUser.id,
                postImage: null
            }
        }

        if(postType === 'postWithPhoto'){
            postInfo = {
                postContent: newPost,
                post_author_id: currentUser.id,
                postImage: postImageLink
            }
        }

        if(postType === 'postWithVideo'){
            postInfo = {
                postContent: newPost,
                post_author_id: currentUser.id,
                postImage: null,
                postVideo: postVideoLink
            }
        }

        console.log('postInfo', postInfo)

        try{
            const request = await axios.post('http://127.0.0.1:8000/api/posts/add', postInfo)
     
            if(request.status === 200){
                setCookie('currentUser', JSON.stringify(request.data.user))
            }
        }catch(err){
            alert('There was an error creating a post. Try again later!')
        }
    }

    // create new post

    const createNewPostWithPhotoHandle = async (e) => {
        e.preventDefault()
        uploadPhotoToFirebase(uploadImage)
    }

    const createNewPostHandle = async (e) => {
        sendPost('plainPost')
    }

    const createNewPostWithVideoHandle = async (e) => {
        e.preventDefault()
        uploadVideoToFirebase(uploadVideo)
    }

    // chatbot

    const initializeGPT = async () => {
        const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true })
        const completion = await openai.chat.completions.create({
            messages: [ { role: 'system', content: 'You are a helpful assistant' } ],
            model: 'gpt-3.5-turbo',
            max_tokens: 1024
        })

        console.log(completion.choices[0])
    }


    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {/* left side */}
                    <SideNavBar />
                    {/* middle */}
                    <div className='col-md-6'>
                        <div className='create-post-container bg-white p-4'>
                            <div className='top-part mb-4'>
                                <a href='/profile'>
                                    <img src={currentUser.profilePic} width={58} height={58} className='user-profile rounded-circle' />
                                </a>
                                <form onSubmit={createNewPostHandle}>
                                    <input value={newPost} onChange={(e) => setNewPost(e.target.value)} type='text' className='form-control' placeholder='Whats on your mind ?' />
                                </form>
                            </div>
                            <hr />
                            <div className='add-activity-post mt-4 mb-0'>
                                <div className='activity' data-bs-toggle="modal" data-bs-target="#uploadPhoto">
                                    <span><i className='activity-icon fa fa-image'></i></span>
                                    <p>Photo</p>
                                </div>

                                <div className='activity' data-bs-toggle="modal" data-bs-target="#uploadVideo">
                                    <span><i className='activity-icon fa fa-video'></i></span>
                                    <p>Video</p>
                                </div>
                            </div>
                        </div>

                        {/* Posts */}
                        {
                            isLoading && 
                            <div className='text-center'>
                                <div className="spinner-border mt-5 text-info" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> ||
                            error && <div className='mt-5 text-center'>Error getting posts, check your internet connection or try to refresh the page!</div> ||
                            isLoading === false && error === false && posts.map((post) => (
                                <Post post={post} commentAuthor={currentUser} key={post.id} />
                            ))
                        }
                    </div>
                    {/* right side */}
                    <div className='col-md-3'>
                        <div className='right-container'>
                            <h4>Must follow</h4>
                            {/* people */}

                            {
                                filteredUsers.length > 0 
                                ?

                                isLoading && <p>Getting users...</p> ||
                                error && <p>Error fetching users</p> ||
                                isLoading === false && error === false && filteredUsers.map((user) => (
                                    
                                    <div className='left-nav mt-4'>
                                        <img src={user.profilePic} width={30} height={30} className='group-profile mx-3' />
                                        <div>
                                            <a href='#' className='group-link-name'>{`${user.firstName} ${user.lastName}`}</a>
                                            <div>
                                                <form onSubmit={(event) => followUser(event, user.id)}>
                                                    <button type='submit' className='follow-user-btn btn-sm btn-info'>Follow</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                ))

                                : <p className='text-muted'>We are trying our best to recommend you users to follow, once we are done you will see them here.</p>
                            }
                            
                        </div>
                    </div>
                </div>

                <div className='chatbot-btn'>
                    <button className='chatbot-btn-open btn btn-warning p-2' data-bs-toggle="modal" data-bs-target="#chatBot">
                        <i className='fa fa-robot'></i> Open Chatbot
                    </button>
                </div>
            </div>

            {/* <!-- photo Modal --> */}
            <div class="modal fade" id="uploadPhoto" tabindex="-1" aria-labelledby="uploadPhotoLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="uploadPhotoLabel">Upload post with a photo</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div className='uploadPhotoPlaceholder'>
                            <img className='imgView' src={uploadPhotoLogo} height={300} width={300} />
                        </div>
                        <form onSubmit={createNewPostWithPhotoHandle}>
                            <input type='file' accept='image/*' onChange={loadPhoto} id='uploadPhoto' className='form-control mb-3' />
                            <input type='text' value={newPost} onChange={(e) => setNewPost(e.target.value)} className='form-control' placeholder='Whats on your mind ?' />
                            <button type="submit" class="uploadPhotoBtn btn btn-primary mt-3">Upload</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <p className='bg-success p-1 text-white rounded'>Uploaded... {uploadProgress} %</p>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>

            {/* <!-- video Modal --> */}
            <div class="modal fade" id="uploadVideo" tabindex="-1" aria-labelledby="uploadVideoLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="uploadVideoLabel">Upload post with a video</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div className='uploadVideoPlaceholder'>
                            <video className='vidPlayer' width={0} height={0}>
                                <source></source>
                            </video>
                            <img className='imgViewForVideo' src={uploadVideoLogo} height={300} width={300} />
                        </div>
                        <form onSubmit={createNewPostWithVideoHandle}>
                            <input type='file' accept='video/*' onChange={loadVideo} id='uploadVideo' className='form-control mb-3' />
                            <input type='text' value={newPost} onChange={(e) => setNewPost(e.target.value)} className='form-control' placeholder='Whats on your mind ?' />
                            <button type="submit" class="btn btn-primary mt-3 form-control">Upload</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <p className='bg-success p-1 text-white rounded'>Uploaded... {uploadProgress} %</p>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>

            {/* <!-- chatbot Modal --> */}
            <div class="modal fade" id="chatBot" tabindex="-1" aria-labelledby="chatBotLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="chatBotLabel">Interact with our AI</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <input type='text' placeholder='Ask any question about farming' className='form-control' />
                        <div className='bg-secondary text-white p-5 mt-3 rounded'>
                            Generated answers will be displayed here
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" onClick={initializeGPT} class="btn btn-primary" data-bs-dismiss="modal">Ask</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Home;