import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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

export async function GET(request: Response) {
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