import { z } from "zod";
import { genderEnum } from "../../common/enum/user.enum.js";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user id");


export const getUserProfile = z.object({
  params: z.strictObject({ userId: objectId }),
});


export const getAllUsers = z.object({
  query: z.strictObject({}),
});


export const updateUser = z.object({
  params: z.strictObject({ userId: objectId }),
  body: z
    .strictObject({
      firstName: z.string({ error: "provide valid firstName" }).trim().min(5).max(50).optional(),
      lastName: z.string({ error: "provide valid lastName" }).trim().min(3).max(50).optional(),
      email: z.email({ error: "please provide valid email" }).toLowerCase().optional(),
      gender: z.enum(genderEnum).optional(),
      age: z.number({ error: "age must be a number" }).int().min(16).max(60).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "Send at least one field to update",
    }),
});


export const deleteUser = z.object({
  params: z.strictObject({ userId: objectId }),
});