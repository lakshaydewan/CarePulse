import * as React from "react"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"

interface CustomSelectProps {
  label: string;
  value: string; // Value for the input field
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle change
  error?: string;
  dataArray: any[]
}

export default function CustomSelect(props: CustomSelectProps) {

  return (
    <div className="mb-3">
        <Label className="text-custom-gray font-light">{props.label}</Label>
        <Select onValueChange={(e: any)=> {
            props.onChange(e)
        }}>
      <SelectTrigger value={props.value} className="w-full bg-custom-dark focus:border focus:border-input-border focus:ring-offset-0 focus:ring-0 text-white outline-none focus:outline-none border-input-border mt-1">
        <SelectValue placeholder={props.placeholder}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="">
          {
            props.dataArray.map((doc, idx)=> (
                <SelectItem value={doc.name} className="" key={idx}>
                    <div className="flex items-center justify-start gap-2">
                        {
                          (doc.image) && <Image src={doc.image} height={25} width={25} alt={doc.name}></Image>
                        }
                        {doc.name}
                    </div>
                </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
    {props.error && <p className="text-green-500 text-sm font-light">{props.error}</p>}
    </div>
  )
}
