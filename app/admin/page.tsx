"use client"
import React, { useLayoutEffect, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import PrimaryHeading from '@/components/PrimaryHeading'
import CustomDataTable from '@/components/CustomDataTable'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()
    useLayoutEffect(() => {
        console.log("hi")
        const secret = localStorage.getItem('secret')
        if (secret !== process.env.NEXT_PUBLIC_SECRET) {
            router.push('/')
            return console.log("Go back")
        } else {
            console.log("Go Ahead!!")
        }
    }, [])

  return (
    <div className='bg-custom-dark'>
        <div className='flex items-center'>
            <Navbar></Navbar>
        </div>
        <div className='flex items-center'>
            <div className='w-full h-full xl:mx-16 lg:mx-12 md:mx-4 mx-4 rounded-xl flex flex-col gap-10'>
                <PrimaryHeading heading='Welcome, Admin' subHeading='Start your day with managing new appointments.'></PrimaryHeading>
                <div className='w-full h-fit flex justify-between gap-3 lg:gap-6 md:gap-4 xl:gap-8 md:flex-row flex-col'>
                    <div className='w-full h-32 rounded-xl flex items-center bg-[#1e2225]'>
                            <div className='flex flex-col gap-4 items-start ml-4'>
                                <div className='flex justify-center items-center gap-2 text-white font-normal text-2xl'>
                                    <Image 
                                    className=''
                                    src={"/assets/icons/calendar.svg"}
                                    width={27}
                                    height={27}
                                    alt="nothing"
                                    >
                                    </Image>
                                    <div>
                                        27
                                    </div>
                                </div>
                                <div className='text-white font-light'>
                                    Total number of scheduled appointments.
                                </div>
                            </div>
                    </div>
                    <div className='w-full h-32 rounded-xl flex items-center bg-[#1e2225]'>
                    <div className='flex flex-col gap-4 items-start ml-4'>
                                <div className='flex justify-center items-center gap-2 text-white font-normal text-2xl'>
                                    <Image
                                    src={"/assets/icons/pending.svg"}
                                    width={27}
                                    height={27}
                                    alt="nothing"
                                    >
                                    </Image>
                                    <div>
                                        15
                                    </div>
                                </div>
                                <div className='text-white font-light'>
                                    Total number of pending appointments.
                                </div>
                            </div>
                    </div>
                    <div className='w-full h-32 rounded-xl flex items-center bg-[#1e2225]'>
                    <div className='flex flex-col gap-4 items-start ml-4'>
                                <div className='flex justify-center items-center gap-2 text-white font-normal text-2xl'>
                                    <Image
                                    src={"/assets/icons/cancelled.svg"}
                                    width={27}
                                    height={27}
                                    alt="nothing"
                                    >
                                    </Image>
                                    <div>
                                        68
                                    </div>
                                </div>
                                <div className='text-white font-light'>
                                     Total number of cancelled appointments.
                                </div>
                            </div>
                    </div>
                </div> 
                <CustomDataTable></CustomDataTable> 
            </div>
        </div>
    </div>  
  )
}

export default Page;