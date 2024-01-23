import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    // const session = await getServerSession(authOptions);
    // if (!session) return NextResponse.json({}, { status: 401 });

    const users = await prisma.user.findMany({
        orderBy: { name: "asc" },
    });
    return NextResponse.json(users);
}
