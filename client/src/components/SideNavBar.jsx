import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getCookie from '../hooks/getCookie';
import agriLogo from '../assets/agri-logo.png'
import businessLogo from '../assets/businessLogo.png'


const SideNavBar = () => {

    const [ currentUser, setCurrentUser ] = useState(JSON.parse(getCookie('currentUser')))
    const [ joinedGroups, setJoinedGroups ] = useState([])
    const [ joinedGrpsLoading, setJoinedGrpsLoading ] = useState(false)
    const [ fetchJoinedGrpsError, setFetchJoinedGrpsError ] = useState(false)


    useEffect(() => {
        const getAllJoinedGroups = async () => {
            try{
                setJoinedGrpsLoading(true)
                const grpz = await axios.get(`http://127.0.0.1:8000/api/community_participant/all/${currentUser.id}`)
                
                if(grpz.status === 200){
                    setJoinedGroups(grpz.data.communities)
                }
            }catch(err){
                setFetchJoinedGrpsError(true)
                console.log('error joining group', err)
            }finally{
                setJoinedGrpsLoading(false)
            }
        }

        getAllJoinedGroups()
    }, [])

    return (
        <div className='col-md-3'>
            {/* nav links */}
            <div className='left-container sticky-top'>
                <div className='left-nav mt-4 p-2 rounded'>
                    <div className='mx-3'>
                        <i className='nav-link-icon fa fa-home text-info'></i>
                    </div>
                    <div>
                        <a href='/' className='nav-link-text'>Home</a>
                    </div>
                </div>

                <div className='left-nav mt-4'>
                    <div className='mx-3'>
                        <i className='nav-link-icon fa fa-user-group text-warning'></i>
                    </div>
                    <div>
                        <a href='/groups' className='nav-link-text'>Groups</a>
                    </div>
                </div>

                <div className='left-nav mt-4'>
                    <div className='mx-3'>
                        <i className='nav-link-icon fa fa-shopping-cart text-danger'></i>
                    </div>
                    <div>
                        <a href='/marketplace' className='nav-link-text'>Marketplace</a>
                    </div>
                </div>

                <div className='left-nav mt-4'>
                    <div className='mx-3'>
                        <i className='nav-link-icon fa fa-star text-success'></i>
                    </div>
                    <div>
                        <a href={`/posts/saved/${currentUser.id}`} className='nav-link-text'>Saved</a>
                    </div>
                </div>
                {/* groups */}
                <h4 className='mt-5 font-bold'>My Groups</h4>

                {
                    joinedGroups.length > 0 ?

                    joinedGrpsLoading && <p>Getting all the groups...</p> || 
                    fetchJoinedGrpsError && <p>There was an error getting the groups</p> ||
                    !joinedGrpsLoading && !fetchJoinedGrpsError && joinedGroups.map((grp) => (
                        <div className='left-nav mt-4'>
                            <img src={grp.community.profileCover} width={30} height={30} className='group-profile mx-3' />
                            <div>
                                <a href='#' className='group-link-name'>{grp.community.name}</a>
                            </div>
                        </div>
                    ))
                    
                    : <p>No groups to show. Join groups to view them here.</p>
                }
            </div>
        </div>
    );
}

export default SideNavBar;