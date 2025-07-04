import React from 'react'
import "./LandingPageStyle.css"
import backgroundImage from '../../assets/Background-image.png';
import { FaLock } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className='landingPage'>
      <img src={backgroundImage} className='backgroundImage' alt='Notebook-Image'/>
      <h1>Pocket Notes</h1>
      <p>Send and receive messages without keeping your phone online.</p>
      <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
      <p className='encrypted'>
        <FaLock className="lockIcon" />
        end-to-end encrypted
      </p>
    </div>
  )
}

export default LandingPage
