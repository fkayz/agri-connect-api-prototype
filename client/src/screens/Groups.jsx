import React from 'react';
import Navbar from '../components/Navbar';
import SideNavBar from '../components/SideNavBar';
import groupPhoto from '../assets/agri-logo.png';
import { useState, useEffect }  from 'react';
import axios from 'axios';
import Group from '../components/Group'


const Groups = () => {

    const [ groupsData, setGroups ] = useState([])
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
        getAllGroups();
    }, []);


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
                                    <Group group={group} />
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