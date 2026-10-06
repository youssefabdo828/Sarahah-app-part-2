import { z } from "zod";
import { genderEnum } from "../../common/enum/user.enum.js";

export const loginSchema = z.strictObject({
    email : z.email({error:"please provide valid email"}),
    password : z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/ , {error : "password must be at least 8 characters and includes at least one lowercase and on uppercase and one digit"}),
})


export const login = z.object({
    body : loginSchema ,
    query : z.strictObject({
        lang : z.enum(["ar" , "en"]).default("en")
    })
})
// .refine((data)=>{return data.password == data.confirmPassword},{message : "Password and confirm password mismatch" , path :["confirmPassword"]})

export const signupSchema = loginSchema.extend({
    firstName : z.string({error : "provide valid firstName"}).min(5).max(50),
    lastName : z.string({error : "provide valid lastName"}).min(3).max(50),
    phone : z.string().regex(/^(\+20|0020|0)?1[0125][0-9]{8}$/),
        age : z.number({error : "age must be at least 16"}).min(16).max(60).optional(),
        gender : z.enum(genderEnum).default(genderEnum.Male),
        confirmPassword : z.string()
}).superRefine((data, ctx)=>{if(data.password != data.confirmPassword){
    ctx.addIssue({
        code : "custom",
        message : "Password and confirm password mismatch" ,
         path :["confirmPassword"]
    })
}})

export const signup = z.object({
    body : signupSchema ,
})