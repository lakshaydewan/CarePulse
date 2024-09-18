import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import Link from "next/link"
  
  interface PopUpModalProps {
    link: string;
    title: string;
    description: React.ReactNode;
  }

  export function PopupModal(props: PopUpModalProps) {

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <Link className={`${props.link == "cancel" ? 'text-custom-white' : 'text-green-600'} text-sm font-light`} href={""}>
            {props.link}    
        </Link>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#1b1d21] border-none">
          <div className="flex justify-between">
          <AlertDialogTitle className="text-white tracking-wider text-2xl font-light">{props.title}</AlertDialogTitle>
                        <AlertDialogCancel className="w-fit h-fit bg-inherit border-none m-0 p-[-20px] hover:bg-[#1b1d21]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="size-5 hover:bg-custom-green transition-colors duration-500 ease-in-out rounded-sm">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                  </AlertDialogCancel>
          </div>
          <AlertDialogHeader>
            <div>
            <div>
                
                    <AlertDialogDescription className="my-1">
                    <div className="w-full">
                          {props.description}
                        </div>
                    </AlertDialogDescription>
                </div>
            <div>
                
            </div>
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  