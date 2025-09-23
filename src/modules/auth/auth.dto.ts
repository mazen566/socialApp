import { GENDER } from "../../utils";

export interface IRegisterDTO {
    fullName?: string;
    email: string;
    password: string;
    phoneNumber?: string;
    gender: GENDER;
}

export interface VerifyAccountDTO {
    email: string;
    otp: string;
}