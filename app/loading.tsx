import React from 'react'
import Image from 'next/image'

const Loading = () => {
  return (
    <div className='bg-custom-dark w-screen h-screen flex justify-center items-center'>
        <Image src={"/assets/icons/loader.svg"} width={200} height={200} alt={"nothing"}>
        </Image>
    </div>
  )
}

export default Loading;