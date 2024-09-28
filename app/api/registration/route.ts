import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const url = new URL(request.url);
    const registrationID = url.searchParams.get('registrationID');  
    if (!registrationID) {
        return NextResponse.json({ error: 'registrationID is required' }, { status: 400 });
    }
    const patient = await prisma.patient.findFirst({
        where: {
            medicalDetails: {
                id: registrationID,
            },
        },
    });
    if (!patient) {
        return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }
    return NextResponse.json({
        patient,
    });
}

export async function POST(request: Request) {
    const formData = await request.formData();
    try {
            const dateStr = formData.get('birthDate') as string;
            const date = new Date(dateStr);
            const isoDateStr = date.toISOString();
            var res = await prisma.medicalDetails.create({
                data: {
                    patientId: formData.get("patientId") as string,
                    fullName: formData.get("fullName") as string,
                    email: formData.get("email") as string,
                    address: formData.get("address") as string,
                    phoneNumber: formData.get("phoneNumber") as string,
                    occupation: formData.get("occupation") as string,
                    emergencyContactName: formData.get("emergencyContactName") as string,
                    emergencyPhoneNumber: formData.get("emergencyPhoneNumber") as string,
                    birthDate: isoDateStr,
                    gender: formData.get('gender') as string,
                    primaryCarePhysician: formData.get('primaryCarePhysician') as string,
                    insuranceProvider: formData.get('insuranceProvider') as string,
                    insurancePolicyNumber: formData.get('insurancePolicyNumber') as string,
                    allergies: formData.get("allergies") as string,
                    pastMedicalHistory: formData.get("pastMedicalHistory") as string,
                    familyMedicalHistory: formData.get("familyMedicalHistory") as string,
                    currentMedication: formData.get("currentMedication") as string,
                    identificationType: formData.get("identificationType") as string,
                    identificationNumber: formData.get("identificationNumber") as string,
                    verificationUrl: formData.get("url") as string
                }
            })
            console.log("entry created: " + res.id)
        } catch (error) {
            console.log("error: " + error)
            return NextResponse.json({
                error: error
            })
        }
        return NextResponse.json({
            registrationID: res.id,
            message: "Registration Was Successfull!!",
        });
    } 