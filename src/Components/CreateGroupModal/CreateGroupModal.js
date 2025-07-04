import React, { useEffect, useRef } from 'react'
import './CreateGroupModalStyle.css'

const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

const CreateGroupModal = ({ groupName, onChangeName, onClose, onCreate, onColorSelect, selectedColor, error }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div className='modal-overlay'>
            <div className='modal' ref={modalRef}>
                <p className='title'>Create New group</p>

                <div className='row row1'>
                    <div className='label-input-wrapper'>
                        <label>Group Name</label>
                        <input type='text' placeholder='Enter group name' value={groupName} onChange={onChangeName} />
                    </div>
                </div>

                <div className='row'>
                    <label>Choose colour</label>
                    <div className='color-options'>
                        {
                            colors.map((color, i) => (
                                <span key={i}
                                    style={{ backgroundColor: color }}
                                    className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                                    onClick={() => onColorSelect(color)}
                                ></span>
                            ))
                        }
                    </div>
                </div>
                {error && <div className="error">{error}</div>}
                <div className='button'>
                    <button onClick={onCreate} className='create-button'>Create</button>
                </div>

            </div>
        </div>
    )
}

export default CreateGroupModal
