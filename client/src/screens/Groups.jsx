import React from 'react';
import Navbar from '../components/Navbar';
import SideNavBar from '../components/SideNavBar';
import { useState, useEffect }  from 'react';
import axios from 'axios';
import getCookie from '../hooks/getCookie';
import Group from '../components/Group'


const Groups = () => {

    const [ groupsData, setGroups ] = useState([])
    const [ currentUser, setCurrentUser ] = useState(JSON.parse(getCookie('currentUser')))
    const [ groupParticipants, setGroupParticipants ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    useEffect(() => {
        const getAllGroups = async () => {
            try{
                setIsLoading(true);
                const groups = await axios.get('http://127.0.0.1:8000/api/communities');

                if(groups.status === 200){
                    setGroups(groups.data.communities);
                    console.log(groups);
                }
            }catch(err){
                setError(true);
                console.log(err)
            }finally{
                setIsLoading(false)
            }
        }

        const getAllCommunityParticipants = async () => {
            try{
                const participants = await axios.get(`http://127.0.0.1:8000/api/community_participant`)
                
                if(participants.status === 200){
                    setGroupParticipants(participants.data.communities)
                    // console.log('participants', participants.data.communities)
                }
            }catch(err){
                alert('There was un-expected error')
                console.log(err)
            }
        }
        getAllGroups();
        getAllCommunityParticipants()
    }, []);

    let groupParticipantsids = groupParticipants.map((usr) => usr.community_id)

    console.log('grp participants', groupParticipantsids)

    return (
        <>
          <Navbar />  
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3'>
                        <SideNavBar />
                    </div>
                    <div className='col-md-9'>
                    <h1 className='text-muted mb-4'>Groups</h1>
                        {
                            currentUser.agriCooperativeName && <a href='/groups/add' className='btn btn-success mb-3'>Create New Group</a>
                        }
                        <div className='row'>
                            {/* group 1 */}
                            
                            {
                                groupsData.length === 0 ? <p className='text-muted'>No groups are available yet!</p> :
                                isLoading && 
                                
                                <div className='mx-2'>
                                    <div className="spinner-border mt-5 text-info" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>

                                ||

                                error && <div className='mt-5 mx-2'>Error getting products, check your internet connection or try to refresh the page!</div>

                                ||

                                isLoading === false && error === false && groupsData.map((group) => (
                                    <Group group={group} currentUser={currentUser}  />
                                    // participantsIDs={groupParticipantsids}
                                ))
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Groups