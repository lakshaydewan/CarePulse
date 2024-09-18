"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import React, {useState} from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from "zod";
import { Button } from '../ui/button';
import { Doctors } from '@/lib/data';
import CustomSelect from '../CustomSelect';
import { CustomTextArea } from '../CustomTextArea';
import CustomDatePicker from '../CustomDatePicker';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

const schema = z.object({
    doctor: z.string({required_error: "Please select a doctor"}),
    reason: z.string({required_error: "Please provide a valid reason"}),
    additionalNotes: z.string().optional(),
    date: z.date({required_error: "Please provide the date for the appointment."})
})

type formData = z.infer<typeof schema>;

const AppointmentForm = () => {
  const router = useRouter()
  const params = useParams()
  const patientId = params.patientID;
  console.log(patientId)

  const [loading, setLoading] = useState(false)
  const {control, formState:{errors}, handleSubmit} = useForm<formData>({
    resolver: zodResolver(schema)
  })
  const onsubmit = async (data: formData) => {
    setLoading(true)
    try {
        const inputDateStr = data.date;
        const date = new Date(inputDateStr);
        // Add one day to the date
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        // Convert the new date to ISO string
        const isoDateStr = nextDay.toISOString();
        //the above logic was necessary to make the postgres DB happy
        //it only accepts DATETIME in ISOstringformat.
        const res = await axios.post("https://care-pulse-ten-flax.vercel.app/api/appointment", {
                patientId: patientId,
                doctor: data.doctor,
                date: isoDateStr,
                reason: data.reason,
                additionalNotes: data.additionalNotes   
            })
        const appoitmentID = res.data.res.id;
        router.push(`/${appoitmentID}/success`)
    } catch (error) {
        console.log("error : " + error)
    }
    finally {
        setLoading(false)
    }
  }
  
  return (
    <div>
        <form onSubmit={handleSubmit(onsubmit)}>
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
        <div className='flex flex-col gap-2 mt-0 md:flex-row md:gap-4 md:items-center'>
            <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                <CustomTextArea
                    label="Reason for appoitment"
                    {...field} // Spreading field properties here
                    placeholder="ex: annual monthly checkup."
                    error={errors.reason?.message} // Pass custom error message
                />
                )}
            />
            <Controller
                name="additionalNotes"
                control={control}
                render={({ field }) => (
                <CustomTextArea
                    label="Additional comments/notes"
                    {...field} // Spreading field properties here
                    placeholder="ex: prefer afternoon appointments"
                    error={errors.additionalNotes?.message} // Pass custom error message
                />
                )}
            />
      </div>
                <Controller   
                    name="date"
                    control={control}
                    render={({ field }) => (
                        <CustomDatePicker {...field} placeholder ="Select your appointment date" label="Expected Appointment Date" error={errors.date?.message}/>
                    )}
                />  
            <Button type='submit' disabled={loading}>Submit and continue</Button>
        </form>
    </div>
  )
}

export default AppointmentForm