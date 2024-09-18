import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface InputProps {
  type: string;
  placeholder: string;
  label: string;
  iconSrc?: string;
  iconAlt?: string;
  name: string; // Added to associate with label
  value: string; // Value for the input field
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle change
  onBlur: () => void; // Function to handle blur
  error?: string; // Optional error message
}

export function InputWithLabel({
  type,
  placeholder,
  label,
  iconSrc,
  iconAlt,
  name,
  value,
  onChange,
  onBlur,
  error
}: InputProps) {
  return (
    <div className="grid w-full items-center gap-2 my-3 relative">
      <Label htmlFor={name} className="text-custom-gray font-light">{label}</Label>
      <Input
        type={type}
        id={name} // Use the name as the id
        placeholder={placeholder}
        value={value} // Set the value
        onChange={onChange} // Set the onChange handler
        onBlur={onBlur} // Set the onBlur handler
        className="outline-none"
      />
      {
        (iconSrc && iconAlt) && (
          <div className="absolute bg-inherit top-[32px] left-[7px] w-5 h-5 rounded-md overflow-hidden">
          <Image
            src={iconSrc}
            height={100}
            width={100}
            alt={iconAlt}
        />
      </div>
        )
      }
      {error && <p className="text-green-500 text-sm font-light">{error}</p>} {/* Display error message */}
    </div>
  );
}
