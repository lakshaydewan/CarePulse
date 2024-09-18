import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({ version: 'v3', auth: client });

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof Blob)) {
        console.error("No file found or invalid file type");
        return NextResponse.json({ message: "No file found or invalid file type" });
    }
    try {
        // Convert Blob to Readable Stream
        const buffer = await file.arrayBuffer();
        const readableStream = new Readable({
            read() {
                this.push(Buffer.from(buffer));
                this.push(null);
            }
        });
        const response = await drive.files.create({
            requestBody: {
                name: file.name,
                mimeType: file.type
            },
            media: {
                mimeType: file.type,
                body: readableStream
            }
        });
        console.log('File uploaded to Google Drive:', response.data);
        console.log("File ID:", response.data.id);
        try {
            const fileID = "198vJ6NL1A40U1sb8g2k1r3lUOKIiKX2B"
            await drive.permissions.create({
                fileId: fileID,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            })
            const result = await drive.files.get({
                fileId: fileID,
                fields: 'webViewLink, webContentLink'
            })
            const presignedURL = result.data.webViewLink
            console.log("presignedURL: " + presignedURL)
            const dateStr = formData.get('birthDate') as string;
            const date = new Date(dateStr);
            // Add one day to the date
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);
            const isoDateStr = nextDay.toISOString();
            console.log(isoDateStr);
            console.log("isoDate: " + isoDateStr);
            const res = await  prisma.medicalDetails.create({
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
                    verificationUrl: presignedURL as string
                }
            })
            console.log("entry created: " + res)
        } catch (error) {
            console.log("error: " + error)
            return NextResponse.json({
                error: error
            })
        }
        return NextResponse.json({
            message: "File uploaded successfully",
            fileId: response.data.id,
        });
    } catch (error: any) {
        console.error("Error uploading file:", error);
        return NextResponse.json({
            message: "Error uploading file",
            error: error.message
        });
    }
} 