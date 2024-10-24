import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import * as zod from 'zod'

// Define a schema for input validation

const userSchema = zod
    .object({
        userName: zod.string().min(1, 'User is required').max(100),
        email: zod.string().min(1, 'Email is required').email('Invalid email address'),
        password: zod
            .string()
            .min(1, "Password is required")
            .min(8, "Password must have than 8 characters long"),
    })

export async function POST(req: Request) {
    try {

        const body = await req.json();

        const {email, userName, password} = userSchema.parse(body);

        // check if email already exists
        const [existingUserByEmail] = await Promise.all([db.user.findUnique({where: {email: email}})]);
        if(existingUserByEmail) {
            return NextResponse.json({user: null, message: "User with this email already exists"},{status: 409});
        }

        // check if userName already exists
        const existingUserByUserName = await db.user.findUnique({ where: { userName: userName } });
        if(existingUserByUserName) {
            return NextResponse.json({user: null, message: "User with this userName already exists"},{status: 409});
        }

        const hashedPassword = await hash(password,10)

        const newUser = await db.user.create({
            data: {
                userName,
                email,
                password : hashedPassword
            }
        });

            const {password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({user: rest, message: "User created successfully."},{status: 201})

    }catch (error){
        return NextResponse.json({user: null, message: error},{status: 500})
    }
}
