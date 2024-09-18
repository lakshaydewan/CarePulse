"use client"
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InputWithLabel } from "@/components/InputWithLabel";
import { Button } from "@/components/ui/button";
import PrimaryHeading from '../PrimaryHeading';
import { GenderRadioGroup } from '../gender-radio-group';
import { Label } from '../ui/label';
import CustomDatePicker from '../CustomDatePicker';
import CustomSelect from "../CustomSelect"
import {CustomTextArea} from "../CustomTextArea"
import { Doctors, IdentificationTypes } from '@/lib/data';
import CustomDropzone from '../CustomDropzone';
import { Checkbox } from '../ui/checkbox';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

// Defining Zod schema:
const schema = z.object({
    fullName: z.string().min(4, 'Name must be at least 5 characters.'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().min(10, 'Phone Number must be at least 10 digits'),
    address: z.string().min(4, 'Address must be at least 5 characters.'),
    occupation: z.string().min(4, 'Occupation must be at least 5 characters.'),
    emergencyContactName: z.string().min(4, "Emergency Contact Name must be at least 5 characters."),
    emergencyPhoneNumber: z.string().min(10, 'Emergency Phone Number must be at least 10 digits'),
    birthDate: z.date({ required_error: "Select a Date" }),
    gender: z.string().min(4, "Select a Gender"),
    primaryCarePhysician: z.string({ required_error: "Select a Doctor" }),
    insuranceProvider: z.string().min(4, "Insurance Provider must be at least 5 characters"),
    insurancePolicyNumber: z.string().min(4, "Insurance Policy Number must be at least 5 characters"),
    allergies: z.string().optional(),
    pastMedicalHistory: z.string().optional(),
    familyMedicalHistory: z.string().optional(),
    currentMedication: z.string().optional(),
    identificationType: z.string({ required_error: "Please provide an identification document for verification" }),
    identificationNumber: z.string({ required_error: "Enter your identification number" }),
  });
  

// Define the form data type based on the schema
type FormData = z.infer<typeof schema>;

const PatientForm = () => {
  const router = useRouter()
  const [showError, setShowError] = useState(false);
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { control, handleSubmit, formState: { errors }} = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const params = useParams()
  const patientID = params.patientID
  
  const [file, setFile] = useState<File[]>([])
  
  const handlefileUpload = (acceptedFiles: any) => {
        setFile(acceptedFiles)
    }

  const onSubmit = async (data: FormData) => {
    console.log("Form submission started");
    setLoading(true);
  
    try {
      if (consent === false) {
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, 4000);
        return
      }
      const formData = new FormData();
      if (file.length > 0) {
        formData.append('file', file[0]);
      } else {
        console.error('No file found to append.');
        setShowError(true)
        setTimeout(() => {
            setShowError(false)
        }, 4000)
        return
      }
      // Append other form fields
      //Object.key(data) returns an array of keys
      formData.append('patientId', patientID as string)
      console.log("Object keys: " + Object.keys(data))
      Object.keys(data).forEach((key) => {
        const value = data[key as keyof typeof data];
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
      const res = await axios.post("https://care-pulse-ten-flax.vercel.app/api/registration",
          formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      if (res.data.error) {
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, 4000);
        console.log("error submitting form...")
        return 
      }
      router.push(`/patient/${patientID}/appointments`)
    } catch (error: any) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=''>
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
      <div className='flex flex-col gap-2 mt-0 md:flex-row md:gap-4 md:items-center'>
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
      </div>
      <div className='flex flex-col gap-2 mt-0 md:flex-row md:gap-4 items-center'>
            <Controller
                name="address"
                control={control}
                render={({ field }) => (
                <InputWithLabel
                    label="Address"
                    {...field} // Spreading field properties here
                    placeholder="New Orleans, Hollywood"
                    type="text"
                    error={errors.address?.message} // Pass custom error message
                />
                )}
            />
            <Controller
                name="occupation"
                control={control}
                render={({ field }) => (
                <InputWithLabel
                    label="Occupation"
                    {...field} // Spreading field properties here
                    placeholder="Soap maker"
                    type="text"
                    error={errors.occupation?.message} // Pass custom error message
                />
                )}
            />
      </div>
      <div className='flex flex-col gap-2 mt-0 md:flex-row md:gap-4 items-center'>
            <Controller
                name="emergencyContactName"
                control={control}
                render={({ field }) => (
                <InputWithLabel
                    label="Emergency Contact Name"
                    {...field} // Spreading field properties here
                    placeholder="Guardian's Name"
                    type="text"
                    error={errors.emergencyContactName?.message} // Pass custom error message
                />
                )}
            />
            <Controller
                name="emergencyPhoneNumber"
                control={control}
                render={({ field }) => (
                <InputWithLabel
                    label="Emergency Contact Number"
                    {...field} // Spreading field properties here
                    placeholder="+91 12345 67890"
                    type="tel"
                    iconSrc="/assets/icons/phone.svg"
                    iconAlt="tel-icon"
                    error={errors.emergencyPhoneNumber?.message}
                />
                )}
            />
      </div>
      <div className='flex flex-col gap-2 mt-0 md:flex-row md:gap-4 items-center'>
            <Controller   
                name="birthDate"
                control={control}
                render={({ field }) => (
                    <CustomDatePicker {...field} placeholder='Select your Birth Date' label='Date of birth' error={errors.birthDate?.message}/>
                )}
            />  
            <Controller
                name="gender"
                control={control}
                render={({ field, fieldState }) => (
                    <div className='flex flex-col justify-center gap-1 w-full'>
                        <Label htmlFor="gender" className="text-custom-gray font-light">Gender</Label>
                        {/* @ts-ignore */}
                        <GenderRadioGroup field={field} error={fieldState.error?.message}/>
                    </div>
                )}
            />
      </div>
      <div className='my-5'>
          <PrimaryHeading heading='Medical Information'></PrimaryHeading>
      </div>
      <Controller
            name='primaryCarePhysician'
            control={control}
            render={({field}) => (
                <CustomSelect
                    label="Primary Care Physician"
                    placeholder='Select a Doctor'
                    dataArray={Doctors}
                    {...field}
                    error={errors.primaryCarePhysician?.message}
                ></CustomSelect>
            )}
      />
      <div className='flex flex-col gap-2 mt-0 md:flex-row md:gap-4 md:items-center'>
            <Controller
                name="insuranceProvider"
                control={control}
                render={({ field }) => (
                <InputWithLabel
                    label="Insurance Provider"
                    {...field} // Spreading field properties here
                    placeholder="ex: BlueCross"
                    type="text"
                    error={errors.insuranceProvider?.message} // Pass custom error message
                />
                )}
            />
            <Controller
                name="insurancePolicyNumber"
                control={control}
                render={({ field }) => (
                <InputWithLabel
                    label="Insurance Policy Number"
                    type='text'
                    {...field} // Spreading field properties here
                    placeholder="ex: ABC1234567"
                    error={errors.insurancePolicyNumber?.message} // Pass custom error message
                />
                )}
            />
      </div>
      <div className='flex flex-col gap-2 mt-0 md:flex-row md:gap-4 md:items-center'>
            <Controller
                name="allergies"
                control={control}
                render={({ field }) => (
                <CustomTextArea
                    label="Allergies (if any)"
                    {...field} // Spreading field properties here
                    placeholder="ex: Penicillin , Peanuts"
                    error={errors.allergies?.message} // Pass custom error message
                />
                )}
            />
            <Controller
                name="pastMedicalHistory"
                control={control}
                render={({ field }) => (
                <CustomTextArea
                    label="Past Medical History"
                    {...field} // Spreading field properties here
                    placeholder="ex: Asthma in childhood"
                    error={errors.pastMedicalHistory?.message} // Pass custom error message
                />
                )}
            />
      </div>
      <div className='flex flex-col gap-2 mt-0 md:flex-row md:gap-4 md:items-center'>
            <Controller
                name="familyMedicalHistory"
                control={control}
                render={({ field }) => (
                <CustomTextArea
                    label="Family Medical History"
                    {...field} // Spreading field properties here
                    placeholder="ex: Mother had breast cancer"
                    error={errors.familyMedicalHistory?.message} // Pass custom error message
                />
                )}
            />
            <Controller
                name="currentMedication"
                control={control}
                render={({ field }) => (
                <CustomTextArea
                    label="Current Medications"
                    {...field} // Spreading field properties here
                    placeholder="ex: Ibuprofin (200mg)"
                    error={errors.currentMedication?.message} // Pass custom error message
                />
                )}
            />
      </div>
      <div className='my-5'>
          <PrimaryHeading heading='Identification and Verification'></PrimaryHeading>
      </div>
      <div className='flex flex-col mb-4'>
        <Controller
                name='identificationType'
                control={control}
                render={({field}) => (
                    <CustomSelect
                        label="Identification Type"
                        placeholder='Select Identification type'
                        dataArray={IdentificationTypes}
                        {...field}
                        error={errors.identificationType?.message}
                    ></CustomSelect>
                )}
            />
            <Controller
                    name="identificationNumber"
                    control={control}
                    render={({ field }) => (
                    <InputWithLabel
                        label="Identification Number"
                        type='text'
                        {...field} // Spreading field properties here
                        placeholder="ex: ABC1234567"
                        error={errors.identificationNumber?.message} // Pass custom error message
                    />
                    )}
                />
            
                    <CustomDropzone cb={handlefileUpload}/>
                    <PrimaryHeading heading='Consent and Privacy'></PrimaryHeading>
                  <div className='flex justify-start gap-3'>
                    <div className='mt-1'>
                      <Checkbox id='name' checked={consent}  className='bg-custom-dark size-5 border border-input-border' onCheckedChange={()=> {
                        setConsent(!consent)
                      }}/>
                    </div>
                    <div className='text-custom-gray'>
                      <p>
                        I consent to the use and disclosure of my medical information for my treatment purposes.
                      </p>
                    </div>
                  </div>
            </div>
      <div className='my-10 mb-20'>
        <Button className='' variant="default" type="submit" disabled={loading}>{loading ? "submitting...": "Submit and continue"}</Button>
        {
          showError && (
            <div className='font-light text-green-500 text-sm mt-3'>
              Error submitting Form make sure the File is included and the consent is provided.
            </div>
          )
        }
      </div>
    </form>
  );
};

export default PatientForm;
