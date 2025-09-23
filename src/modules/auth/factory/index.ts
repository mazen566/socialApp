import { GENDER, generateExpiryDate, generateHash, generateOTP, SYS_ROLE, USER_AGENT } from "../../../utils";
import { IRegisterDTO } from "../auth.dto";
import { User } from "../entity";

export class AuthFactoryService {
    register(RegisterDTO: IRegisterDTO) {
        const user = new User();
        user.fullName = RegisterDTO.fullName as string;
        user.email = RegisterDTO.email;
        user.password = generateHash(RegisterDTO.password);
        user.phoneNumber = RegisterDTO.phoneNumber as string;
        user.otp = generateOTP();
        user.otpExpiredAt = generateExpiryDate(5 * 60 * 60 * 1000) as unknown as Date;
        user.credentialUpdatedAt = Date.now() as unknown as Date;
        user.gender = GENDER.male;
        user.role = SYS_ROLE.user;
        user.userAgent = USER_AGENT.local;
        user.isVerified = false;
        return user;
    }
}