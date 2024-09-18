import React from 'react'
import Image from 'next/image'

const Heading_Logo = () => {
  return (
    <div className=''>
      <Image
      src="/assets/icons/logo-full.svg"
      alt='logo'
      height={130}
      width={130}
      >
      </Image>
    </div>
  )
}

export default Heading_Logo