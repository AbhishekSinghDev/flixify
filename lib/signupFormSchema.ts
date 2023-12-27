import * as z from "zod";

const signupFormSchema = z.object({
  username: z.string().min(1, { message: "Username must be filled" }),
  email: z
    .string()
    .min(1, { message: "Email cannot be empty" })
    .email("This is not valid email"),
  password: z.string().min(4, { message: "Password must be of 4 letters" }),
  imageUrl: z.string(),
});

export default signupFormSchema;
