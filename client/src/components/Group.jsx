import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Group = (props) => {

    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    console.log('current user', props.currentUser)

    const navigate = useNavigate()

    const joinGroup = async (e, groupId) => {
        try{
            const participantInfo = {
                community_id: groupId,
                user_id: props.currentUser.id
            }
            setIsLoading(true)
            const join = await axios.post('http://127.0.0.1:8000/api/community_participant/add', participantInfo)

            if(join.status === 200){
                navigate(`/groups/chat/${groupId}`)
            }
        }catch(err){
            setError(true)
            alert('There was an error joining the group. Try again later!')
            console.log('err', err)
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <div className='col-md-6'>
        <div className='bg-white p-3 mb-3 rounded'>
            {/* top part */}
            <div className='group-top-part'>
                <img src={props.group.profileCover} width={50} height={50} className='group-profile rounded-circle' />
                <div className='group-info'>
                    <p className='group-name mb-0'>{ props.group?.name }</p>
                    <div className='group-specs'>
                        <p>{ props.group.user?.agriCooperativeName}</p>
                        {/* <p className='group-members-total text-success'>132.7k members</p> */}
                    </div>
                </div>
            </div>
            {/* middle part */}
            <img src={props.group.profileCover} className='group-main-profile rounded' />
            {
                isLoading 
                && 
                <button className='btn btn-warning mt-3 mx-auto d-block' disabled>
                    Joining Group...
                </button> ||
                !isLoading && !error && 
                <button  onClick={(e)=>joinGroup(e, props.group.id)} className='btn btn-warning mt-3 mx-auto d-block'>
                    Join Group
                </button>
            }
            
        </div>
    </div>
  )
}

export default Group