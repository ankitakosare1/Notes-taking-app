import React from 'react'
import "./SidebarStyle.css"

const Sidebar = ({ groups, activeGroup, onGroupClick, onClickAddButton }) => {
    return (
        <div className='sidebar'>
            <h2 className='heading'>Pocket Notes</h2>
            <div className='groups-wrapper'>
                <div className='groups'>
                    {
                        groups.map((grp, i) => (
                            <div key={i}
                                className={`group ${activeGroup?.name === grp.name ? 'active' : ''}`}
                                onClick={() => onGroupClick(grp)}
                            >
                                <div className='profilePicture' style={{ backgroundColor: grp.color, color: 'white' }}>
                                    {
                                        grp.name?.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase()
                                    }
                                </div>
                                <span className='grp-name'>{grp.name}</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <button className='addButton' onClick={onClickAddButton}>+</button>
        </div>
    )
}

export default Sidebar
