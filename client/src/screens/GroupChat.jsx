import React from 'react'
import Navbar from '../components/Navbar'
import SideNavBar from '../components/SideNavBar'
import chatProfile from '../assets/businessLogo.png'

const GroupChat = () => {
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
                                <img src={chatProfile} width={50} height={50} className='rounded-circle' />
                                <div className='top-part-chat-info mt-3'>
                                    <h5 className=''>Alimi Tithandizane</h5>
                                    <p className='text-white'><b>100 Members</b></p>
                                </div>
                                {/* <i className='fa fa-ellipsis-vertical'></i> */}
                            </div>
                        </div>
                        {/* middle part */}
                        <div className='middle-part bg-white p-5'>
                            {/* chat balloon for sender */}
                            <div className='chat-balloon-sender bg-secondary text-white rounded p-2 mb-4'>
                                <div className='chat-balloon-top-part mb-0'>
                                    <img src={chatProfile} width={30} height={30} className='rounded-circle' />
                                    <div className='chat-balloon-top-part-info'>
                                        <p className='chat-user-name mb-0'>Angela Kayange</p>
                                        <small>16 dec 2023</small>
                                    </div>
                                </div>
                                <hr />
                                <p>
                                    Turpis egestas integer eget aliquet nibh praesent tristique. Volutpat consequat mauris nunc congue nisi vitae suscipit. Venenatis lectus magna fringilla urna porttitor rhoncus. 
                                </p>
                            </div>

                            {/* chat balloon for receiver */}
                            <div className='chat-balloon-receiver bg-primary text-white rounded p-2 mb-3'>
                                <div className='chat-balloon-top-part mb-0'>
                                    <img src={chatProfile} width={30} height={30} className='rounded-circle' />
                                    <div className='chat-balloon-top-part-info'>
                                        <p className='chat-user-name mb-0'>Jackson Mbewe</p>
                                        <small>24 jun 2023</small>
                                    </div>
                                </div>
                                <hr />
                                <p>
                                    Turpis egestas integer eget aliquet nibh praesent tristique. Volutpat consequat mauris nunc congue nisi vitae suscipit. Venenatis lectus magna fringilla urna porttitor rhoncus. 
                                </p>
                            </div>

                            {/* chat balloon for sender */}
                            <div className='chat-balloon-sender bg-secondary text-white rounded p-2 mb-4'>
                                <div className='chat-balloon-top-part mb-0'>
                                    <img src={chatProfile} width={30} height={30} className='rounded-circle' />
                                    <p className='chat-user-name'>Jackson Mbewe</p>
                                </div>
                                <hr />
                                <p>
                                    Turpis egestas integer eget aliquet nibh praesent tristique. Volutpat consequat mauris nunc congue nisi vitae suscipit. Venenatis lectus magna fringilla urna porttitor rhoncus. 
                                </p>
                            </div>
                            
                        </div>


                        {/* last part */}
                        <div className='last-part p-3'>
                            <i className='fa fa-smile fa-2x'></i>
                            <input type='text' placeholder='Enter your messahe here...' className='form-control' />
                            <button className='btn btn-success'>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default GroupChat