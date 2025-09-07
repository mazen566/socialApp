import { GENDER } from "../../utils/common/enum";

export interface IRegisterDTO {
    fullName?: string;
    email: string;
    password: string;
    phoneNumber?: string;
    gender: GENDER;
}

export interface IUpdateUserDTO extends Partial<IRegisterDTO> {}