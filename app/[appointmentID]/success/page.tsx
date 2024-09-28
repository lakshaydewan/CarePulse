import React from 'react';
import Image from 'next/image';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { getAppointmentData } from '@/app/actions';

const Page = async ({ params }: { params: Params }) => {
  const { appointmentID } = params;
  // Convert appointmentID to an integer
  const ID = parseInt(appointmentID);
  const data = await getAppointmentData(ID);
  console.log("data: ", data);
  console.log(data.date);

  // Add checks to ensure `data` is available and contains the required fields
  if (!data.date || !data.doctor) {
    return <div className='w-screen h-screen bg-custom-dark text-white font-sans font-thin text-2xl justify-center items-center flex'>
        Error: Unable to fetch appointment data
    </div>
  }

  const date = data?.date?.toDateString() || 'No date available';
  const doctor = data?.doctor || 'No doctor assigned';

  return (
    <div className='w-screen h-screen bg-custom-dark'>
      <header className='flex justify-center items-center md:py-10 py-5'>
        <Image
          src="/assets/icons/logo-full.svg"
          width={130}
          height={130}
          alt="logo-CarePulse"
        />
      </header>
      <div className='flex justify-center items-center pt-10'>
        <section className='flex flex-col items-center justify-center gap-8 md:gap-14'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <Image width={250} height={250} alt='nothing' src="/assets/gifs/success.gif"></Image>
            <div className='text-custom-white text-2xl md:text-5xl font-sans font-normal text-center'>
              Your <span className='text-[#4ac97e]'>appointment request</span> has <br />
              been successfully submitted
            </div>
            <p className='text-center text-custom-gray text-sm font-sans md:text-xl font-light'>
              We'll be in touch shortly to confirm.
            </p>
          </div>
          <div className=''>
            <div className='w-full md:w-[60vw] h-[1px] bg-input-border'></div>
            <div className='flex flex-col md:flex-row justify-center items-center py-6 gap-4 md:gap-10'>
              <div className='text-md text-custom-gray font-sans font-light md:text-xl'>
                Requested Appointment Details: 
              </div>
              <div className='w-fit h-fit p-2 rounded-md bg-[#15191c] border border-input-border flex justify-center items-center gap-2'>
                <Image
                  src={`/assets/images/dr-${doctor.split(" ")[1].toLowerCase()}.png`}
                  width={30}
                  height={30}
                  alt="doctor-icon"
                />
                <div className='text-custom-gray font-thin'>
                  {doctor}
                </div>
              </div>
              <div className='text-custom-gray font-mono'>
                {date}
              </div>
            </div>
            <div className='w-full md:w-[60vw] h-[1px] bg-input-border'></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
