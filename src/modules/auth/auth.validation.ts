import { z } from "zod";
import { GENDER } from "../../utils";
import { IRegisterDTO, LoginDTO, VerifyAccountDTO } from "./auth.dto";

export const registerSchema = z.object<IRegisterDTO>({
    fullName: z.string().min(2).max(20) as unknown as string,
    email: z.email() as unknown as string,
    password: z.string() as unknown as string,
    phoneNumber: z.string() as unknown as string,
    gender: z.enum(GENDER) as unknown as GENDER,
});

export const verifyAccountSchema = z.object<VerifyAccountDTO>({
    email: z.email() as unknown as string,
    otp: z.string().length(5) as unknown as string,
})

export const loginSchema = z.object<LoginDTO>({
    email: z.email() as unknown as string,
    password: z.string().length(6) as unknown as string,
})
