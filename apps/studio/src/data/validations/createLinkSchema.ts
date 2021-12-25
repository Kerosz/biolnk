import { z } from "zod";

export const CREATE_LINK_SCHEMA = z.object({
  title: z
    .string()
    .nonempty("Title must not be empty!")
    .min(1, "Title must be at least a character long!")
    .max(50, "Title must be at most 50 characters long!"),
  url: z
    .string()
    .nonempty("Url must not be empty!")
    .url("Must be a valid URL!"),
});
