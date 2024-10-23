import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {

        const body = await req.json();

        const {email, userName, password} = body;

        // check if email already exists
        const existingUserByEmail = await db.user.findUnique({ where: { email: email } });
        if(existingUserByEmail) {
            return NextResponse.json({user: null, message: "User with this email already exists"},{status: 409});
        }

        // check if userName already exists
        const existingUserByUserName = await db.user.findUnique({ where: { userName: userName } });
        if(existingUserByUserName) {
            return NextResponse.json({user: null, message: "User with this userName already exists"},{status: 409});
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await db.user.create({
            data: {
                userName,
                email,
                hashedPassword
            }})

        return NextResponse.json({user: newUser, message: "User created successfully."},{status: 201})

    }catch (error){
        return NextResponse.json({user: null, message: error},{status: 500})
    }
}
