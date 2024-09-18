import prisma from "@/lib/prisma";

export async function getAppointmentData(appointmentID: number) {
    const res = await prisma.appointment.findFirst({
        where: {
            id: appointmentID
        }
    })
    return {
        date: res?.date,
        doctor: res?.doctor
    }
}