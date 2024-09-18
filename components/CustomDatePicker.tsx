import React from "react";
import DatePicker from "react-datepicker";
import { Label } from "../components/ui/label";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDateProps {
  name: string; 
  label: string;
  placeholder: string;
  value: Date | null; // Update value type to Date | null
  onChange: (date: Date | null) => void; // Ensure correct date type
  onBlur: () => void; 
  error?: string;
}

const CustomDatePicker = (props: CustomDateProps) => {
  return (
    <div className="grid w-full items-center gap-1 my-3 relative">
      <Label htmlFor={props.name} className="text-custom-gray font-light">
        {props.label}
      </Label>
      <DatePicker
        selected={props.value} // Bind the selected date to props.value
        onChange={props.onChange} // Directly pass the onChange handler
        onBlur={props.onBlur} // Add the onBlur handler for form validation
        className="min-w-full h-10 rounded-md pl-5 border border-input-border bg-custom-dark text-white text-sm outline-none focus:ring-0"
        placeholderText={props.placeholder}
      />
      {props.error && <p className="text-green-500 text-sm font-light">{props.error}</p>}
    </div>
  );
};

export default CustomDatePicker;




  