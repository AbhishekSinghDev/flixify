import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const cookieName = process.env.COOKIE_NAME || "";
    cookies().delete(cookieName);

    return new Response(JSON.stringify({ message: "Logout successfully" }), {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
};
