import React, { useState } from 'react'
import {z} from "zod";
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { CustomTextArea } from './CustomTextArea';
import axios from 'axios';
import { AlertDialogAction } from './ui/alert-dialog';
const schema = z.object({
    reason: z.string().min(10, "reason should be atleast 10 characters"),
})

type formData = z.infer<typeof schema>;

interface CustomProps{
    appointmentID : string
    fetcherForTable: () => void;
}

const Cancel = (props: CustomProps) => {
  const [loading, setLoading] = useState(false);
  const {control, formState:{errors}, handleSubmit} = useForm<formData>({
    resolver: zodResolver(schema)
  })

  const onsubmit = async (data: formData) => {
    setLoading(true)
    try {
      const res =  await axios.put("http://localhost:3000/api/appointment", {
        appointmentId: props.appointmentID,
        status: "cancelled"
    })
    } catch (error) {
      console.log("error: " + error)
    }
    finally {
      setLoading(false)
      props.fetcherForTable();
    }
  }
  return (
    <div className='w-full'>
              <div>
                <div className='w-full'>
          <form onSubmit={handleSubmit(onsubmit)} className='w-full'>
            <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                <CustomTextArea
                    label="Reason for Cancellation"
                    {...field} // Spreading field properties here
                    placeholder="ex: annual monthly checkup."
                    error={errors.reason?.message} // Pass custom error message
                />
                )}
            />
                  <Button type='submit' disabled={loading}>Cancel Appointment</Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Cancel