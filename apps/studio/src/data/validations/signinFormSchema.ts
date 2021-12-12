import { z } from "zod";

export const SIGNIN_SCHEMA = z.object({
  username: z
    .string()
    .nonempty("Username must not be empty!")
    .regex(
      /^[a-z0-9.\-_]+$/,
      "Username must be lowercase and no special characters!"
    )
    .min(3, "Username must be at least 3 characters long!")
    .max(18, "Username must be at most 18 characters long!"),
  password: z
    .string()
    .nonempty("Password must not be empty!")
    .min(8, "Password must be at least 8 characters long!")
    .regex(/[*@!#%&()^~{}]+/, "Password must contain one special character!")
    .regex(/[A-Z]+/, "Password must contain at least one uppercase character!")
    .regex(/[a-z]+/, "Password must contain at least one lowercase character!")
    .regex(/[0-9]+/, "Password must contain at least one number!"),
});
