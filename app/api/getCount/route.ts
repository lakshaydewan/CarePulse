import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const [pendingCount, scheduledCount, canceledCount] = await Promise.all([
        prisma.appointment.count({
          where: { status: 'pending' },
        }),
        prisma.appointment.count({
          where: { status: 'scheduled' },
        }),
        prisma.appointment.count({
          where: { status: 'cancelled' },
        }),
      ]);

    return NextResponse.json({
        pendingCount,
        scheduledCount,
        canceledCount
    })  
}