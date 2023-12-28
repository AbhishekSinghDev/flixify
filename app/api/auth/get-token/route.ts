import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export const GET = async () => {
  const cookieStore = cookies();

  const cookieName: string = process.env.COOKIE_NAME || "";
  const FlixifyAccessToken = cookieStore.get(cookieName);

  if (!FlixifyAccessToken) {
    return new Response("Token not present", { status: 401 });
  }

  const { value } = FlixifyAccessToken;
  const secret = process.env.JWT_SECRET || "";

  try {
    const user: string | JwtPayload = jwt.verify(value, secret);

    const response = {
      user: user,
    };
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (e) {
    return new Response("Unauthorized", { status: 401 });
  }
};
