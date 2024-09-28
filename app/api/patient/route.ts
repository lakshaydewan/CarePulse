import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

  return NextResponse.json({});
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  try {
    const patient = await prisma.patient.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        phoneNumber: body.phoneNumber
      }
  })
  return NextResponse.json({
    patient,
  });
  } catch (error) {
    return NextResponse.json({
      internalserverError: error
    }, {status: 500})
  }
}

