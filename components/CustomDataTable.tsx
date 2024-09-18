"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import Image from "next/image";
  import { PopupModal } from "./PopupModal";
  import Cancel from "./Cancel";
  import Schedule from "./Schedule";
import { useEffect, useState } from "react";
import axios from "axios";


export default function CustomDataTable() {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [data, setData] = useState<any>([])
  const [fetch, setFetch] = useState(false)

  const fetchData = () => {
    setFetch(!fetch)
  }

  useEffect(() => {
    setLoading(true)
     async function getData() {
          const res = await axios.get(`https://care-pulse-ten-flax.vercel.app/api/appointment?page=${page}`);
          const data = (res.data.res);
          setData(data)
          setLoading(false)
      }
    getData();
  }, [page, fetch])

  return (
      <div>
        {
          loading? (
            <>
                <div className='bg-custom-dark w-full h-full flex justify-center items-center'>
                <Image src={"/assets/icons/loader.svg"} width={200} height={200} alt={"nothing"}>
                </Image>
            </div>
            </>
          ): (
            <>
                <Table className="bg-[#0a0e10] text-custom-white rounded-2xl font-light">
        <TableHeader className="hover:text-white">
          <TableRow className="hover:bg-[#0a0e10]">
            <TableHead className="w-[150px]">Patient</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((appointment: any) => (
            <TableRow key={appointment.id} className="bg-custom-dark border border-input-border hover:bg-[#0a0e10]">
              <TableCell className="font-medium border-l-[1px] border-b-[1px] border-input-border">{appointment.patient.fullName}</TableCell>
              <TableCell className="border-b-[1px] border-input-border text-custom-gray">{appointment.date}</TableCell>
              <TableCell className="border-b-[1px] border-input-border">{appointment.status}</TableCell>
              <TableCell className="border-b-[1px] border-input-border">{appointment.doctor}</TableCell>
              <TableCell className="text-right border-r-[1px] border-input-border border-b-[1px]">
                    <div className="flex justify-center items-center md:flex-row flex-col gap-3">
                        <button className="border-none text-green-500 bg-inherit"><PopupModal title="Schedule Appointment" link="schedule" description={<Schedule appointmentID={appointment.id} fetcherForTable={fetchData}/>}></PopupModal></button>
                        <button className="border-none text-custom-white bg-inherit"><PopupModal title="Cancel Appointment" link="cancel" description={<Cancel appointmentID={appointment.id} fetcherForTable={fetchData}/>}></PopupModal></button>
                    </div>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-custom-dark rounded-3xl">
            <TableRow className="hover:bg-custom-dark">
                <TableCell className="font-medium border-l-[1px] border-b-[1px] border-input-border flex justify-start items-center">
                    <div onClick={() => {
                      setPage(page - 1)
                    }} className={`${(page==1) ? "cursor-wait pointer-events-none" : "cursor-pointer"}`}>
                        <Image
                        src={"/assets/icons/arrow.svg"}
                        width={25}
                        height={25}
                        alt="arrow"
                        ></Image>
                    </div>
                </TableCell>
                <TableCell className="border-b-[1px] border-input-border"></TableCell>
                <TableCell className="border-b-[1px] border-input-border"></TableCell>
                <TableCell className="border-b-[1px] border-input-border"></TableCell>
                <TableCell className="text-right border-r-[1px] border-input-border border-b-[1px] flex justify-end items-center">
                    <div className={`${data.length < 1 ? "cursor-none pointer-events-none" : "cursor-pointer"} rotate-180`} onClick={()=> {
                      setPage(page + 1)
                    }}>
                        <Image
                        src={"/assets/icons/arrow.svg"}
                        width={25}
                        height={25}
                        alt="arrow"
                        ></Image>
                    </div>
                </TableCell>
            </TableRow>
        </TableFooter>
      </Table>
            </>
          )
        }
      </div>
    )
  }
  
  