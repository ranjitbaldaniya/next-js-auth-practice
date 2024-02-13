import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcriptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";


connect();


export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();

        console.log("req body for signup data", reqBody);

        const { username, email, password } = reqBody.userData;
        console.log("req data console", username, email, password);

        //checking that email is alredy exist
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "user alredy exist" }, { status: 400 })
        }
        //hasing password
        const salt = await bcriptjs.genSalt(10);
        const hashedPassword = await bcriptjs.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save()
        console.log("saved user", savedUser);
        return NextResponse.json({ message: "User created successfully", status: true, savedUser })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}