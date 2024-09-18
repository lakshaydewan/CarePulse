"use client"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from './ui/button'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CustomOTP() {
    const router = useRouter();
    const [input, setInput] = useState("")
    const handleClick = () => {
        const secret = process.env.NEXT_PUBLIC_SECRET;
        if (input == secret) {
            localStorage.setItem('secret', secret)
            router.push("/admin")
        } else {
            console.log("kal")
        }
    }

  return (
    <div className='flex flex-col gap-4'>
        <InputOTP onChange={(input: any)=> {
            setInput(input)
    }} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup className="flex items-center flex-row justify-between w-full">
        <InputOTPSlot index={0} className="border border-input-border text-white"/>
        <InputOTPSlot index={1} className="border border-input-border text-white"/>
        <InputOTPSlot index={2} className="border border-input-border text-white"/>
        <InputOTPSlot index={3} className="border border-input-border text-white"/>
        <InputOTPSlot index={4} className="border border-input-border text-white"/>
        <InputOTPSlot index={5} className="border border-input-border text-white"/>
      </InputOTPGroup>
    </InputOTP>
    <Button onClick={handleClick}>Go To Dashboard</Button>
    </div>
  )
}
