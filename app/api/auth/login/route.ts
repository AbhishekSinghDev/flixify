import connectToDatabase from "@/lib/database";
import User, { UserSchemaInterface } from "@/lib/database/models/User";
import { NextApiRequest } from "next";

export const POST = async (request: Request) => {
  const body = await request.json();

  if (!body.email || !body.password) {
    return new Response("Please provide username and password", {
      status: 400,
    });
  }

  const { email, password }: { email: string; password: string } = body;

  try {
    await connectToDatabase();

    const user: Array<UserSchemaInterface> = await User.find({ email: email });

    // if no user find
    if (user.length === 0) {
      return new Response("User not found", {
        status: 404,
      });
    }

    if (user[0].password === password) {
      return new Response(JSON.stringify(user[0]), {
        status: 200,
      });
    }
  } catch (err) {
    console.log(err);
    return new Response("Some server error", {
      status: 500,
    });
  }

  return new Response(request.body);
};
