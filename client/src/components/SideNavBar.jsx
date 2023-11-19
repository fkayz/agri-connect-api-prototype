import React from 'react';
import agriLogo from '../assets/agri-logo.png'
import businessLogo from '../assets/businessLogo.png'

const SideNavBar = () => {
    return (
        <div className='col-md-3'>
            {/* nav links */}
            <div className='left-container sticky-top'>
                <div className='left-nav nav-active mt-4 p-2 rounded'>
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
                        <a href='#' className='nav-link-text'>Saved</a>
                    </div>
                </div>
                {/* groups */}
                <h4 className='mt-5 font-bold'>My Groups</h4>

                <div className='left-nav mt-4'>
                    <img src={agriLogo} width={30} height={30} className='group-profile mx-3' />
                    <div>
                        <a href='#' className='group-link-name'>Alimi World</a>
                    </div>
                </div>

                <div className='left-nav mt-4'>
                    <img src={businessLogo} width={30} height={30} className='group-profile mx-3' />
                    <div>
                        <a href='#' className='group-link-name'>Lets do business</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideNavBar;