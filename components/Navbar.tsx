import React from 'react'
import Image from 'next/image'
import Heading_Logo from './Heading_Logo'

const Navbar = () => {
  return (
    <div className='w-full mx-3 bg-black/40 rounded-lg mt-4 h-16 flex items-center justify-between'>
            <div className='md:ml-10 ml-2'>
                <Heading_Logo />
            </div>
            <div className='w-fit flex justify-center items-center md:mr-10 mr-2'>
                <Image
                    src={"/assets/images/admin.png"}
                    width={30}
                    height={30}
                    alt='admin-img'
                ></Image>
                <div className='text-custom-white font-light text-md'>
                    Admin
                </div>
            </div>
        </div>
  )
}

export default Navbar