import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Label } from './ui/label'

interface CustomDropzoneProps {
    cb: (e: any) => void
}

const CustomDropzone = (props: CustomDropzoneProps) => {
  const [files, setFiles] = useState<File>()

  return (
    <div className='flex flex-col gap-3 mt-3'>
      <Label className='text-custom-gray font-light'>Scanned Copy of Identification Document</Label>
      <Dropzone
        onDrop={(acceptedFiles) => {
            setFiles(acceptedFiles[0]);
            props.cb(acceptedFiles);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              className='bg-custom-dark flex flex-col justify-center items-center py-6 md:py-10 border border-input-border rounded-md text-custom-white font-light'
            >
              <input {...getInputProps()} />
              <p>
                <span className='text-green-500'>Drag 'n' drop</span> some files here, or click to select files
              </p>
              <div>
                {files && (
                  <div className='text-custom-white font-normal text-md my-2'>
                    {files?.name}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  )
}

export default CustomDropzone;
