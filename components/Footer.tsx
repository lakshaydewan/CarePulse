'use client'
import React, { useEffect, useState } from 'react'
import { PopupModal } from './PopupModal';
import Description from './Description';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const [showAdmin, setShowAdmin] = useState(true)
  const router = useRouter();
  useEffect(()=> {
    const registrationID = localStorage.getItem('registrationID')
    if (registrationID) {
        setShowAdmin(false)
    }
  }, [])

  return (
    <div className='flex justify-between pb-16'>
        <p className='text-custom-gray-dark text-sm font-light'>
            © CarePulse copyright
        </p>
       {
        showAdmin ? (
          <PopupModal title='Verify Passkey' link='Admin' description={<Description />}/>
        ): (
          <div className='text-[15px] font-sans font-light text-green-600 cursor-pointer' onClick={()=> {
            localStorage.clear();
            router.push("/")
          }}>
            Create New User
          </div>
        )
       }
    </div>
  )
}

export default Footer