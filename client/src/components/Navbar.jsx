import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import userLogo from '../assets/user.jpg'
import getCookie from '../hooks/getCookie'
import removeCookie from '../hooks/removeCookie'

const Navbar = () => {

    // console.log('cookie set!', getCookie('jwt'));
    const cookie = getCookie('jwt');
    const currentUser = JSON.parse(getCookie('currentUser'));
    const navigate = useNavigate();


    const signOutHandle = async () => {
        const request = await axios.get('http://127.0.0.1:8000/api/users/logout');

        if(request.status === 200){
            removeCookie('jwt');
            removeCookie('currentUser');
            navigate('/signin')
        }else{
            alert('There was an error loggin out. Try again later!')
        }
    }

  return (
    <div className='mb-5'>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <img src='agriConnectLogo.jpg' width={50} height={50} />
                <form className="d-flex m-auto justify-center">
                    <div className='form-outline'>
                        {/* <i className='fa fa-search'></i> */}
                        <input className="search-input form-control me-2" type="search" placeholder="Search for groups, friends, posts, e.t.c" aria-label="Search" size={50} />
                    </div>
                </form>
                {
                    cookie && currentUser ?
                    <div className='nav-link-v2'>
                        <div className='link' title='inbox'>
                            <button className='nav-btn'>
                                <i className='navbar-icons me-4 fa fa-comment-alt'></i>
                            </button>
                        </div>

                        <div className='link' title='notifications'>
                            <button className='nav-btn'>
                                <i className='navbar-icons me-4 fa fa-bell'></i>
                            </button>
                        </div>

                        <div className='link' title='logout'>
                            <button className='nav-btn' onClick={signOutHandle}>
                                <i className='navbar-icons me-4 fa fa-sign-out'></i>
                            </button>
                        </div>

                        <div className='link' title='profile settings'>
                            <button className='nav-btn'>
                                <a href='/profile'>
                                    <img src={currentUser.profilePic} className='user-profile rounded-circle img-thumbnail' />
                                </a>
                            </button>
                        </div>
                    </div>
                    : <button>Logout</button>
                }
            </div>
        </nav> 
    </div>
  )
}

export default Navbar