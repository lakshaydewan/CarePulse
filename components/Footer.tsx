import React from 'react'
import { PopupModal } from './PopupModal';
import Description from './Description';

const Footer = () => {
  return (
    <div className='flex justify-between pb-16'>
        <p className='text-custom-gray-dark text-sm font-light'>
            © CarePulse copyright
        </p>
        <PopupModal title='Verify Passkey' link='Admin' description={<Description />}/>
    </div>
  )
}

export default Footer