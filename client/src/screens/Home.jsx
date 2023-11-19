import { useState, useEffect } from 'react'
import getCookie from '../hooks/getCookie'
import setCookie from '../hooks/setCookie'
import axios from 'axios'
import Post from '../components/Post';
import Navbar from '../components/Navbar'
import SideNavBar from '../components/SideNavBar';




const Home = () => {

    const [ posts, setPosts ] = useState([]);
    const [ userListToFollow, setUserListToFollow ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ currentUser, setCurrentUser ] = useState(JSON.parse(getCookie('currentUser')));
    const [ followBtnText, setFollowBtnText] = useState('Follow')


    const [ newPost, setNewPost ] = useState('');

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
                    console.log('users',users.data.users)
                }
            }catch(err){
                setError(true)
                console.log(err)
            }finally{
                setIsLoading(false)
            }
        }
        getAllPosts() // fetching all posts
        getAllUsers() // fetch all users
    }, [])

    const filteredUsers = userListToFollow.filter((user) => user.id !== currentUser.id && user.role !== 'cooperative')

    // create new post

    const createNewPostHandle = async (e) => {
        const postInfo = {
            postContent: newPost,
            post_author_id: currentUser.id
        }

        try{
            const request = await axios.post('http://127.0.0.1:8000/api/posts/add', postInfo)
     
            if(request.status === 200){
                console.log(request.data)
                setCookie('currentUser', JSON.stringify(request.data.user))
                alert('Post created successfully!')
            }
        }catch(err){
            alert('There was an error creating a post. Try again later!')
        }
    }

    const followUser = async (event, user_to_follow) => {
        event.preventDefault()
        try{
            const followData = {
                followed_id: user_to_follow,
                follower_id: currentUser.id
            }

            const request = await axios.post('http://127.0.0.1:8000/api/follows/add', followData)

            if(request.status === 200){
                setFollowBtnText('Following')
            }
        }catch(err){
            alert('failed to follow user')
        }
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
                                <div className='activity'>
                                    <span><i className='activity-icon fa fa-image'></i></span>
                                    <p>Photo</p>
                                </div>

                                <div className='activity'>
                                    <span><i className='activity-icon fa fa-video'></i></span>
                                    <p>Video</p>
                                </div>

                                <div className='activity'>
                                    <span><i className='activity-icon fa fa-face-laugh'></i></span>
                                    <p>Feeling</p>
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
                                isLoading && <p>Getting users...</p> ||
                                error && <p>Error fetching users</p> ||
                                isLoading === false && error === false && filteredUsers.map((user) => (
                                    <div className='left-nav mt-4'>
                                        <img src={user.profilePic} width={30} height={30} className='group-profile mx-3' />
                                        <div>
                                            <a href='#' className='group-link-name'>{`${user.firstName} ${user.lastName}`}</a>
                                            <div>
                                                <form onSubmit={(event) => followUser(event, user.id)}>
                                                    <button type='submit' className='follow-user-btn btn-sm btn-info'>{followBtnText}</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            
                        </div>
                    </div>
                </div>

                <div className='chatbot-btn'>
                    <button className='chatbot-btn-open btn btn-warning p-2'>
                        <i className='fa fa-robot'></i> Open Chatbot
                    </button>
                </div>
            </div>
        </>
    )
}


export default Home;