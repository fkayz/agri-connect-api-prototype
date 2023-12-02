import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getCookie from '../hooks/getCookie'
import Navbar from '../components/Navbar'
import SideNavBar from '../components/SideNavBar'
import Post from '../components/Post'
import axios from 'axios'

export const Saved = () => {

    const { id: currentUserID } = useParams()

    const [ savedPosts, setSavedPosts ] = useState([])
    const [ currentUser, setCurrentUser ] = useState(JSON.parse(getCookie('currentUser')))
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        const getSavedPosts = async () => {
            try{
                setIsLoading(true)
                const posts = await axios.get('http://127.0.0.1:8000/api/save_post')
                if(posts.status === 200) setSavedPosts(posts.data.posts)
            }catch(err){
                console.log(err)
                setError(true)
            }finally{
                setIsLoading(false)
            }
        }
        getSavedPosts()
    }, [])


  return (
    <>
        <Navbar />

        <div className='container'>
            <div className='row'>
                <div className='col-md-3'>
                    <SideNavBar />
                </div>

                <div className='col-md-9'>
                    <h1 className='text-muted'>Saved Posts</h1>
                    {
                        savedPosts.length > 0 
                        ? <div className='row'>
                            {
                                isLoading && <p>getting saved posts...</p> ||
                                error && <p>There was an error getting saved posts. check your internet connection or refresh the page.</p> || 
                                !isLoading && !error && savedPosts.map((post) => (
                                    <div className='col-md-12'>
                                        <Post post={post} commentAuthor={currentUser} page='saved' key={post.id} />
                                    </div>
                                ))
                            }
                        </div>

                        : <p>No posts to show. Your favorite saved posts will be displayed here!</p>
                    }
                    
                </div>
            </div>
        </div>
    </>
  )
}
