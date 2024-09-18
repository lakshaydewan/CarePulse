import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ControllerRenderProps } from "react-hook-form";

interface GenderProps {
  field: ControllerRenderProps; // This will be provided by Controller
  error?: string;
}

export function GenderRadioGroup({ field, error }: GenderProps) {
  return (
    <div className="w-full bg-custom-dark text-custom-white shadow-md h-10">
      <RadioGroup 
        className="flex h-full"
        value={field.value} 
        onValueChange={(value) => field.onChange(value)} // Use onValueChange instead of onChange
      >
        <div className="flex-1 flex items-center justify-center border-input-border border rounded-md w-full">
          <Label htmlFor="male" className="flex items-center space-x-2 w-full h-full px-2 hover:cursor-pointer">
            <RadioGroupItem value="male" id="male" className="border-white text-white" />
            <span className="text-sm sm:text-base">Male</span>
          </Label>
        </div>
        <div className="flex-1 flex items-center justify-center border-input-border border rounded-md">
          <Label htmlFor="female" className="flex items-center space-x-2 w-full h-full px-2 hover:cursor-pointer">
            <RadioGroupItem value="female" id="female" className="border-white text-white" />
            <span className="text-sm sm:text-base">Female</span>
          </Label>
        </div>
        <div className="flex-1 flex items-center justify-center border-input-border border rounded-md">
          <Label htmlFor="other" className="flex items-center space-x-2 w-full h-full px-2 hover:cursor-pointer">
            <RadioGroupItem value="other" id="other" className="border-white text-white" />
            <span className="text-sm sm:text-base">Other</span>
          </Label>
        </div>
      </RadioGroup>
      {error && <p className="text-green-500 text-sm font-light">{error}</p>}
    </div>
  );
}
