import connectToDatabase from "@/lib/database";
import User, { UserSchemaInterface } from "@/lib/database/models/User";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const POST = async (request: Request) => {
  const body = await request.json();
  const { email, password }: { email: string; password: string } = body;

  if (!email || !password) {
    return new Response("Please provide username and password", {
      status: 400,
    });
  }

  try {
    await connectToDatabase();

    const user: Array<UserSchemaInterface> = await User.find({ email: email });

    // if no user find
    if (user.length === 0) {
      return new Response("User not found", {
        status: 404,
      });
    }

    const result = await bcrypt.compare(password, user[0].password);

    if (result) {
      const secret = process.env.JWT_SECRET || "";
      const token = jwt.sign(
        {
          userId: user[0]._id,
        },
        secret,
        {
          expiresIn: MAX_AGE,
        }
      );

      const seralized = serialize("FlixifyAccessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: MAX_AGE,
        path: "/",
      });

      return new Response("Authenticated", {
        status: 200,
        headers: { "Set-Cookie": seralized },
      });
    } else {
      return new Response("Incorrect password", { status: 401 });
    }
  } catch (err) {
    console.log(err);
    return new Response("Some server error", {
      status: 500,
    });
  }
};
