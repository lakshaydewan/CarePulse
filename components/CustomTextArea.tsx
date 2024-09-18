import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { error } from "console";
import { Divide } from "lucide-react";

interface CustomTextAreaProps {
  placeholder: string;
  name: string; // Added to associate with label
  value: string | undefined; // Value for the input field
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Function to handle change
  onBlur: () => void; // Function to handle blur
  error?: string; // Optional error message
  label: string;
}

export function CustomTextArea(props: CustomTextAreaProps) {
  return (
    <div className="grid w-full gap-1.5 my-3">
      <Label htmlFor={props.name} className="text-custom-gray font-light">{props.label}</Label>
      <Textarea placeholder={props.placeholder} value={props.value} onChange={props.onChange} id="message" className="bg-custom-dark text-custom-white"/>
      {
       props.error && (
        <div className="text-green-500 text-sm font-light">
            {props.error}
        </div>
       )
      }
    </div>
  )
}
