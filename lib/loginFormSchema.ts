import * as z from "zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled" })
    .email("This is not a valid email"),
  password: z.string().min(4, { message: "Password must be of 4 letters" }),
});

export default loginFormSchema;
