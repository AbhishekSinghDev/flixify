import connectToDatabase from "@/lib/database";
import User from "@/lib/database/models/User";
import bcrypt, { hash } from "bcrypt";
import { UserSchemaInterface } from "@/lib/database/models/User";

export const POST = async (req: Request, res: Response) => {
  const body: UserSchemaInterface = await req.json();
  const {
    username,
    email,
    password,
    imageUrl,
    isPremiumUser,
    premiumType,
    familyMembers,
  } = body;
  if (!username || !email || !password) {
    return new Response("Please provide all the details", { status: 400 });
  }

  try {
    await connectToDatabase();
    const saltRounds: number = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    const isAlreadyUser = await User.find({ email: email });
    if (isAlreadyUser.length > 0) {
      return new Response("User already exists", { status: 400 });
    }

    const newUser = new User({
      username: username,
      password: hashedPass,
      email: email,
      imageUrl: imageUrl,
      isPremiumUser: isPremiumUser,
      premiumType: premiumType,
    });

    await newUser.save();
    return new Response("User registered successfullly", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Some server error", { status: 500 });
  }
};
