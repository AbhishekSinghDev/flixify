import connectToDatabase from "@/lib/database";
import User from "@/lib/database/models/User";

export const POST = async (req: Request, { params }: any) => {
  const userId: string = params.id;

  if (userId.length === 0) {
    return new Response(JSON.stringify({ message: "Please prove userid" }), {
      status: 400,
    });
  }

  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (Object.keys(user).length === 0) {
      return new Response(JSON.stringify({ message: "No user found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
