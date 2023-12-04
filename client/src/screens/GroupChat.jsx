import React from 'react';
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import SideNavBar from '../components/SideNavBar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import MessageBalloonSender from '../components/MessageBalloonSender'
import getCookie from '../hooks/getCookie';
import MessageBalloonReceiver from '../components/MessageBalloonReceiver';
import GroupInfo from '../components/GroupInfo';

const GroupChat = () => {

    const [ messages, setMessages ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    const [ communityDetails, setCommunityDetails ] = useState('')
    const [ communityParticipants, setCommunityParticipants ] = useState('')
    const [ communityLoading, setCommunityLoading ] = useState(false)
    const [ communityParticipantsLoading, setCommunityParticipantsLoading ] = useState(false)
    const [ communityParticipantsError, setCommunityParticipantsError ] = useState(false)
    const [ communityError, setCommunityError ] = useState(false)

    const [ currentUser, setCurrentUser ] = useState(JSON.parse(getCookie('currentUser')))
    const [ chatMessage, setChatMessage ] = useState('')
    const [ sendingMsgLoading, setSendingMsgLoading ] = useState(false)
    const [ sendingMsgError, setSendingMsgError ] = useState(false)

    const [ syncMessages, setSyncMessages ] = useState(true)

    const groupChatID = useParams()


    useEffect(() => {

        const getCommunityDetails = async () => {
            try{
                setCommunityLoading(true)
                const community = await axios.get(`http://127.0.0.1:8000/api/communities/${groupChatID.id}`)

                if(community.status === 200){
                    setCommunityDetails(community.data.community)
                }
            }catch(err){
                setCommunityError(true)
                console.log(err)
            }finally{
                setCommunityLoading(false)
            }
        }

        const getAllChatMessages = async () => {
            try{
                setIsLoading(true)
                const chatMessages = await axios.get(`http://127.0.0.1:8000/api/groups/messages/${groupChatID.id}`)
    
                if(chatMessages.status === 200){
                    setMessages(chatMessages.data.messages)
                }
            }catch(err){
                setError(true)
                console.log(err)
            }finally{
                setIsLoading(false)
            }
        }

        const getCommunityParticipants = async () => {
            try{
                setCommunityParticipantsLoading(true)
                const participants = await axios.get(`http://127.0.0.1:8000/api/community_participant/${groupChatID.id}`)
                
                if(participants.status === 200){
                    setCommunityParticipants(participants)
                }
            }catch(err){
                alert('There was a problem getting participants. Try to refresh the page.')
                console.log(err)
                setCommunityParticipantsError(false)
            }finally{
                setCommunityParticipantsLoading(false)
            }
        }

        getCommunityDetails()
        getCommunityParticipants()
        getAllChatMessages()

    }, [syncMessages])

    const sendMessage = async () => {
        setSyncMessages(true)
        try{
            setSendingMsgLoading(true)
            const msgBody = { author_id: currentUser.id, community_id: groupChatID.id, message: chatMessage }
            const msg = await axios.post('http://127.0.0.1:8000/api/groups/messages/add', msgBody)

            if(msg.status === 200){
                setChatMessage('')
                const msgChat = document.querySelector('.middle-part')
                msgChat.scrollTop = msgChat.scrollHeight
                console.log('message sent')
                //setMessages()
            }
        }catch(err){
            setSendingMsgError(true)
            alert('Error: sending message, try again later!')
        }finally{
            setSyncMessages(false)
            setSendingMsgLoading(false)
        }
    }

    return (
        <>
            <Navbar />

            <div className='container'>
                <div className='row'>
                    <div className='col-md-3'>
                        <SideNavBar />
                    </div>

                    <div className='col-md-9'>
                        <div className='chat bg-white rounded'>
                            {/* top part */}
                            <div className='top-part text-white bg-success p-3 rounded'>
                                <div className='top-part-content'>
                                    <a href='/groups' className='text-white'>
                                        <i className='fa fa-arrow-left fa-2x'></i>
                                    </a>
                                    {
                                        communityLoading 
                                        && 
                                        <p>Getting group info...</p>
                                        ||
                                        communityError
                                        &&
                                        <p>Error getting group info, try refreshing the page or check your connection</p>
                                        ||
                                        !communityLoading && !communityError
                                        && !communityParticipantsLoading && !communityParticipantsError &&
                                        <GroupInfo communityDetails={communityDetails} communityParticipants={communityParticipants}  />
                                    }
                                    {/* <i className='fa fa-ellipsis-vertical'></i> */}
                                </div>
                            </div>
                            {/* middle part */}
                            <div className='middle-part bg-white p-5'>
                                {/* chat balloon for sender */}
                                {
                                    isLoading 
                                    &&
                                    <p className='text-center'>Syncing chat message...</p> 
                                    ||
                                    error 
                                    && 
                                    <p className='text-danger text-center'>Error syncing messages. <br/>Make sure you are connected to the internet or refresh the page.</p> 
                                    ||
                                    messages.length > 0 
                                    ?
                                    !isLoading && !error && messages.map((message) => (
                                        message.user.id === currentUser.id ? <MessageBalloonSender message={message} /> : <MessageBalloonReceiver message={message} />
                                    ))
                                    :
                                    <p className='text-muted text-center'>No messages found, be the first to start a conversation</p>
                                }
                                
                            </div>


                            {/* last part */}
                            <div className='last-part p-3'>
                                <i className='fa fa-smile fa-2x'></i>
                                <input type='text' value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} placeholder='Enter your message here...' className='form-control' />
                                {
                                    sendingMsgLoading 
                                    ?
                                    <button className='btn btn-success' disabled>Sending...</button>
                                    :
                                    <button onClick={sendMessage} className='btn btn-success'>Send</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GroupChat