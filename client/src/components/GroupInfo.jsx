import React from 'react'

const GroupInfo = (props) => {
  return (
    <>
        <img src={props.communityDetails.profileCover} width={50} height={50} className='group-profileCover rounded-circle' />
        <div className='top-part-chat-info mt-3'>
            <h5 className=''>{props.communityDetails.name}</h5>
            <p className='text-white'><b>100 Members</b></p>
        </div>
    </>
  )
}

export default GroupInfo