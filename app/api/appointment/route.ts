import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Twilio } from 'twilio'

const accountSid: string = process.env.ACCOUNT_SID as string; // Replace with your Account SID
const authToken: string = process.env.AUTH_TOKEN as string// Replace with your Auth Token

// Create a Twilio client
const client = new Twilio(accountSid, authToken);

async function sendSMS(to: string, message: string) {
    try {
        const response = await client.messages.create({
            body: message,
            from: process.env.SENDER_NUMBER, // Replace with your Twilio number
            to: to // The recipient's phone number
        });
        console.log(`Message sent: ${response.sid}`);
    } catch (error) {
        console.error(`Error sending message: ${error}`);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(body)
        
        const res = await prisma.appointment.create({
            data: {
                doctor: body.doctor,
                date: body.date,
                reason: body.reason,
                additionalNotes: body.additionalNotes || "",
                patientId: body.patientId,
            },
        });
        const patient = await prisma.patient.findFirst({
            where: {
                id: res.patientId
            }
        })
        const phoneNumber = patient?.phoneNumber as string;
        console.log(phoneNumber)
        console.log("Before SMS");
        const SMS =  await sendSMS(phoneNumber, `Your requested Appointment has been created for the date ${res.date}`);
        return NextResponse.json({
            msg: 'Appointment created successfully',
            res
        }, {
            status: 201,
        });
    } 
    catch (e) {
        console.error('Error creating appointment:', e);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const url = new URL(request.url)
    const limit = 5
    const page = parseInt(url.searchParams.get('page') ?? '1');
    //checking if index of page is less than 1 or if page is NOT_A_NUMBER isNaN tells
    //if a datatype is a valid number or not.
    if (page < 1 || isNaN(page)) {
        return NextResponse.json({ error: 'Invalid page number' }, { status: 400 });
    }
    const offset = (page - 1) * limit;
    try {
        const res = await prisma.appointment.findMany(
            {
                skip: offset,
                take: limit,
                include: {
                    patient: {
                        select: {
                            id: true,
                            fullName: true
                        }
                    }
                }   
            })
        console.log(res);
        return NextResponse.json({
                res,
            }, {status: 200})
    } 
    catch (e) {
        console.error("Error fetching data:", e);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { appointmentId, status } = body;
        if (!appointmentId || !status) {
            return NextResponse.json({ error: 'Appointment ID and status are required' }, { status: 400 });
        }
        if (status !== 'scheduled' && status !== 'cancelled') {
            return NextResponse.json({ error: 'Invalid status. Must be "scheduled" or "cancelled"' }, { status: 400 });
        }
        const updatedAppointment = await prisma.appointment.update({
            where: {
                id: appointmentId,
            },
            data: {
                status: status,
            },
        });
        const patient = await prisma.patient.findFirst({
            where: {
                id: updatedAppointment.patientId
            }
        })

        if (status === "scheduled") {
            try {
                await sendSMS(patient?.phoneNumber as string, `Your appointment has been Successfully scheduled for the date: ${updatedAppointment.date}.`)
            } catch (e) {
                console.log("error while messaging: " + e)
            }
        } 
        if (status === "cancelled") {
            try {
                await sendSMS(patient?.phoneNumber as string, `Your appointment has been cancelled for the date: ${updatedAppointment.date}.`)
            } catch (e) {
                console.log("error while messaging: " + e)
            }
        }

        return NextResponse.json({
            msg: 'Appointment updated successfully',
            appointment: updatedAppointment,
        }, {
            status: 200,
        });
    } 
    catch (e) {
        console.error('Error updating appointment status:', e);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}