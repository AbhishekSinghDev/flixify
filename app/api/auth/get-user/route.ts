import connectToDatabase from "@/lib/database";
import User from "@/lib/database/models/User";

export const POST = async (req: Request) => {
  const data = await req.json();
  const userid = data.userId;

  if (!userid) {
    return new Response(JSON.stringify({ message: "user id not provided" }), {
      status: 404,
    });
  }

  try {
    await connectToDatabase();

    const user = await User.findById(userid);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ user: user }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
