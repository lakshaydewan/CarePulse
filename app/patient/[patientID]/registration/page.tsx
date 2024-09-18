"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import Heading_Logo from '@/components/Heading_Logo'
import PrimaryHeading from '@/components/PrimaryHeading'
import Footer from '@/components/Footer'
import Image from 'next/image'
import RegistrationForm from '@/components/Forms/RegistrationForm'

const RegistrationPage = () => {
    
    return (
      <div className="bg-custom-dark h-screen flex w-screen">
        <div className="lg:min-w-[50vw] w-full lg:px-28 md:px-20 px-10 flex flex-col gap-20 mt-20">
          <Heading_Logo />
          <div className="flex flex-col gap-10">
            <PrimaryHeading heading="Welcome 👋" subHeading="Let us know more about yourself"></PrimaryHeading>
            <div>
              <PrimaryHeading heading='Personal Information'></PrimaryHeading>
              <RegistrationForm />
            </div>
          </div>
          {/* <Footer></Footer> */}
        </div>
        <div className='w-0 relative m-0 p-0 xl:w-full'>
          <div className="xl:w-full h-screen w-0 overflow-hidden flex justify-center rounded-md fixed ">
              <Image className="w-full" src={"/assets/images/register-img.png"} alt="onboarding-img" width={670} height={1000}/>
          </div>
        </div>
      </div>
    ) 
}

export default RegistrationPage;