import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcriptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
connect();


export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();

        console.log("req body for login data", reqBody);

        const { email, password } = reqBody.userData;
        console.log("req data console for login", email, password);

        //checking that email is alredy exist
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        //checking password
        const validPassword = await bcriptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }

        //create token data

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token 
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "1d" })

        const respose = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        respose.cookies.set("token", token, {
            httpOnly: true,
        })

        return respose;
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }

}