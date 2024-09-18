import React from 'react'

interface HeadingProps {
    heading: string;
    subHeading?: string
}


const PrimaryHeading = (props: HeadingProps) => {
  return (
    <div className='flex flex-col gap-3 mt-6'>
        <h1 className={`${props.subHeading ? "text-custom-white text-4xl font-medium font-sans": "text-custom-white text-3xl font-medium font-sans"}`}>
            {props.heading}
        </h1>
        <p className='text-custom-gray'>
            {props.subHeading}
        </p>
    </div>
  )
}

export default PrimaryHeading