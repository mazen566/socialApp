import { z } from "zod";
import { GENDER } from "../../utils";
import { IRegisterDTO } from "./auth.dto";

export const registerSchema = z.object<IRegisterDTO>({
    fullName: z.string().min(2).max(20) as unknown as string,
    email: z.email() as unknown as string,
    password: z.string() as unknown as string,
    phoneNumber: z.string() as unknown as string,
    gender: z.enum(GENDER) as unknown as GENDER,
});
