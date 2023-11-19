import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SideNavBar from '../components/SideNavBar';
import getCookie from '../hooks/getCookie.js'
import setCookie from '../hooks/setCookie.js'

const Profile = () => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(getCookie('currentUser')))
    const [ firstName, setFirstName ] = useState(currentUser.firstName)
    const [ lastName, setLastName ] = useState(currentUser.lastName);
    const [ email, setEmail ] = useState(currentUser.email)
    const [ phone, setPhone ] = useState(currentUser.phone);

    console.log(currentUser);

    const [ isLoading, setIsLoading ] = useState(false);


    const updateProfileHandle = async (e) => {
        e.preventDefault();
        try{
            const currentUserID = currentUser.id
            console.log(currentUserID)

            const userInfo = {
                firstName,
                lastName,
                email,
                phone
            }

            setIsLoading(true)
            const request = await axios.put(`http://127.0.0.1:8000/api/users/update/${currentUserID}`, userInfo);

            if(request.status === 200){
                setCookie('currentUser', JSON.stringify(request.data.user))
                setCurrentUser(request.data.user)
                // alert('Profile Updated Successfully!');
            }
        }catch(err){
            console.log(err)
            console.log('There was a problem updating profile. Try again!');
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <>
            <Navbar />

            <div className='container'>
                <div className='row'>
                    {/* left side */}
                    <div className='col-md-3'>
                        <SideNavBar />
                    </div>
                    {/* right side */}
                    <div className='col-md-9'>
                        <h1 className='text-muted mb-4'>Profile</h1>
                        <div className="bg-white rounded p-3">
                            {/* profile info */}
                            <div className='profile-container'>
                                <img className='profile-pic mx-auto d-block rounded-circle' src={currentUser.profilePic} width={300} height={300} />
                                <p className="profile-fullname text-center mt-3 mb-0">{ currentUser.firstName + ' ' + currentUser.lastName }</p>
                                <p className='text-center text-muted'>{ currentUser.email }</p> 
                                <div className='profile-menu mb-5'>
                                    <button className='btn btn-dark text-white' href='#'>Posts</button>
                                    <button className='btn btn-dark text-white' href='#'>About</button>
                                    <button className='btn btn-dark text-white' type="button" data-bs-toggle="modal" data-bs-target="#editProfileModal">Edit profile</button>
                                </div>
                            </div>

                            {
                                currentUser.posts?.length > 0
                                ? 
                                <div className='row'>
                                    <h3 className='mb-4'>{`${currentUser.firstName} ${currentUser.lastName}'s posts (${currentUser.posts.length})`}</h3>
                                    {
                                        currentUser.posts.map((post) => (
                                            <div className='col-md-6'>
                                                <div className='profile-post text-black p-3 rounded'>
                                                    {/* top part */}
                                                    <div className='profile-post-info'>
                                                        <img className='profile-post-pic rounded-circle' src={currentUser.profilePic} width={50} height={50} />
                                                        <div className='profile-post-info-details'>
                                                            <p className='profile-post-fullname mb-0'>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
                                                            <p>{ new Date(post.createdAt).toDateString() }</p>
                                                        </div>
                                                    </div>
                                                    <p>{ post.postContent }</p>
                                                    <img className='profile-post-image rounded' src={ post.postImage } />
                                                    <button className='profile-post-view-more-btn btn btn-warning mt-3'>View Post</button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                : <p className='no-posts bg-warning p-3 text-center rounded'>{`${currentUser.firstName} ${currentUser.lastName} has not yet posted anything!`}</p>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>

            {/* modal */}
            <div className="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editProfileModalLabel">Edit Profile</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='profile-edit-form'>
                            <form onSubmit={updateProfileHandle}>
                                {/* first name */}
                                <div className='mb-2'>
                                    <label className='text-muted' htmlFor='firstName'>First Name</label>
                                    <input onChange={(e) => setFirstName(e.target.value) } id='firstName' className='form-control' type='text' value={firstName} />
                                </div>

                                {/* last name */}
                                <div className='mb-2'>
                                    <label className='text-muted' htmlFor='lastName'>Last Name</label>
                                    <input onChange={(e) => setLastName(e.target.value) } id='lastName' className='form-control' type='text' value={lastName} />
                                </div>

                                {/* email */}
                                <div className='mb-2'>
                                    <label className='text-muted' htmlFor='email'>Email</label>
                                    <input onChange={(e) => setEmail(e.target.value) } id='email' className='form-control' type='email' value={email} />
                                </div>

                                {/*  phone */}
                                <div className='mb-2'>
                                    <label className='text-muted' htmlFor='phone'>Phone</label>
                                    <input onChange={(e) => setPhone(e.target.value) } id='phone' className='form-control' type='phone' value={phone} />
                                </div>

                                <div className="modal-footer mt-5">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {
                                        isLoading
                                        ? 
                                            <button className="spinner-border text-info" role="status">
                                                <span className="visually-hidden">Saving...</span>
                                            </button>
                                        : <button type="submit" className="btn btn-primary">Save changes</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Profile;