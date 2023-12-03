import React from 'react'

const MessageBalloon = (props) => {
  return (
    <>
        <div className='chat-balloon-sender bg-secondary text-white p-2 mb-4'>
            <div className='chat-balloon-top-part mb-0'>
                <img src={props.message.user.profilePic} width={30} height={30} className='rounded-circle' />
                <div className='chat-balloon-top-part-info'>
                    <p className='chat-user-name mb-0'>You</p>
                    <small>{new Date(props.message.createdAt).toDateString()}</small>
                </div>
            </div>
            <hr />
            <p>
                {props.message.message}
            </p>
        </div>
    </>
  )
}

export default MessageBalloon