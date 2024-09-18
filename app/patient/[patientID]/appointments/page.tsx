import React from 'react'
import Heading_Logo from '@/components/Heading_Logo';
import PrimaryHeading from '@/components/PrimaryHeading';
import Footer from '@/components/Footer';
import Image from 'next/image';
import AppointmentForm from '@/components/Forms/AppointmentForm';

const page = () => {
  return (
    <div className="bg-custom-dark h-screen flex w-screen">
    <div className="lg:min-w-[50vw] w-full lg:px-28 md:px-20 px-10 flex flex-col justify-evenly">
      <Heading_Logo />
      <div className="flex flex-col gap-10">
        <PrimaryHeading heading="Hey, There 👋" subHeading="Request a new appointment in 10 seconds."></PrimaryHeading>
        <AppointmentForm />
      </div>
      <Footer></Footer>
    </div>
    <div className="lg:w-full h-screen w-0 overflow-hidden flex justify-center rounded-md">
        <Image className="min-w-[1024px]" src={"/assets/images/appointment-img.png"} alt="onboarding-img" width={1000} height={1000}/>
    </div>
  </div>
  )
}

export default page