import React from 'react'

const GroupInfo = (props) => {

  // console.log('number of participants', props.communityParticipants?.data.communities.length)


  return (
    <>
        <img src={props.communityDetails.profileCover} width={50} height={50} className='group-profileCover rounded-circle' />
        <div className='top-part-chat-info mt-3'>
            <h5 className=''>{props.communityDetails.name}</h5>
            <p className='text-white'>
              <b>
              {
                props.communityParticipants ?
                props.communityParticipants?.data.communities.length === 1 && '1 member' ||
                props.communityParticipants?.data.communities.length === 0 && '0 members' ||
                props.communityParticipants?.data.communities.length > 1 && props.communityParticipants.data.communities.length + ' members'  
                : ''
              }
              </b>
            </p>
        </div>
    </>
  )
}

export default GroupInfo