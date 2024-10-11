import React, { useState } from 'react'
import CustomSelect from './CustomSelect';
import { Doctors } from '@/lib/data';
import {z} from "zod";
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { CustomTextArea } from './CustomTextArea';
import axios from 'axios';

const schema = z.object({
    doctor: z.string({required_error: "Please select a doctor to assign."}),
    reason: z.string().min(10, "reason should be atleast 10 characters"),

})

type formData = z.infer<typeof schema>;

interface CustomProps{
    appointmentID : string
    fetcherForTable: ()=> void;
}

const Schedule = (props: CustomProps) => {
  const [loading, setLoading] = useState(false);
  const {control, formState:{errors}, handleSubmit} = useForm<formData>({
    resolver: zodResolver(schema)
  })

  const onsubmit = async (data: formData) => {
    setLoading(true)
    try {
      const res =  await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/appointment`, {
        appointmentId: props.appointmentID,
        status: "scheduled"
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
              <div className='w-full'>
              <form onSubmit={handleSubmit(onsubmit)} className='w-full'>
            <Controller
                name='doctor'
                control={control}
                render={({field}) => (
                    <CustomSelect
                        label="Doctor"
                        placeholder='Select a Doctor'
                        dataArray={Doctors}
                        {...field}
                        error={errors.doctor?.message}
                    ></CustomSelect>
                )}
                />
                <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                    <CustomTextArea
                        label="Reason for appointment"
                        {...field} // Spreading field properties here
                        placeholder="ex: annual monthly checkup."
                        error={errors.reason?.message} // Pass custom error message
                    />
                    )}
                />
                  <Button type='submit' disabled={loading}>Schedule Appointment</Button>
                </form>
          </div>
    </div>
  )
}

export default Schedule;