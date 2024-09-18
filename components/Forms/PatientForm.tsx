"use client"
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InputWithLabel } from "@/components/InputWithLabel";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Define the Zod schema
const schema = z.object({
  fullName: z.string().min(4, 'Name must be at least 5 characters.'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone Number is must be at least 10 digits'),
});

// Define the form data type based on the schema
type FormData = z.infer<typeof schema>;

const PatientForm = () => {
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, formState: { errors }} = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await axios.post("https://care-pulse-ten-flax.vercel.app/api/patient", {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber
      });

      // Assuming the API response contains the userID
      const userID = res.data.userID;
      // Redirect after successful submission
      router.push(`/patient/${userID}/registration`);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setShowError(true)
      console.log(showError)
      setTimeout(() => {
        setShowError(false)
        console.log(showError)
      }, 2000)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-2'>
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <InputWithLabel
            label="Full Name"
            {...field} // Spreading field properties here
            placeholder="Tyler Durden"
            type="text"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user-icon"
            error={errors.fullName?.message} // Pass custom error message
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputWithLabel
            label="Email Address"
            {...field} // Spreading field properties here
            placeholder="tylerDurden@soap.com"
            type="email"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email-icon"
            error={errors.email?.message} // Pass custom error message
          />
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <InputWithLabel
            label="Phone Number"
            {...field} // Spreading field properties here
            placeholder="+91 12345 67890"
            type="tel"
            iconSrc="/assets/icons/phone.svg"
            iconAlt="tel-icon"
            error={errors.phoneNumber?.message} // Pass custom error message
          />
        )}
      />
      <Button variant="default" type="submit" disabled={loading}>{loading ? "submitting...": "Get Started"}</Button>
      {
        showError && (
          <div className='font-light text-green-500 text-sm mt-3'>
            Error submitting Form make sure the email is unique.
          </div>
        )
      }
      </div>
    </form>
  );
};

export default PatientForm;
