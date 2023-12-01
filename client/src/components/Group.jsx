import React from 'react'

const Group = ({ group }) => {
  return (
    <div className='col-md-6'>
        <div className='bg-white p-3 mb-3 rounded'>
            {/* top part */}
            <div className='group-top-part'>
                <img src={group.profileCover} width={50} height={50} className='group-profile rounded-circle' />
                <div className='group-info'>
                    <p className='group-name mb-0'>{ group.name }</p>
                    <div className='group-specs'>
                        <p>{ group.user.agriCooperativeName}</p>
                        <p className='group-members-total text-success'>132.7k members</p>
                    </div>
                </div>
            </div>
            {/* middle part */}
            <img src={group.profileCover} className='group-main-profile rounded' />
            <a href={`/groups/chat/${group.id}`} className='btn btn-warning mt-3 mx-auto d-block'>Join Group</a>
        </div>
    </div>
  )
}

export default Group