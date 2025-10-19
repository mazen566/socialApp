import { UserRepository } from "../../../DB"
import { BadRequestException, NotFoundException } from "../../../utils";
import { VerifyAccountDTO } from "../auth.dto";

export const authProvider = {
    async checkOTP(verifyAccountDTO: VerifyAccountDTO) {
        const userRepository = new UserRepository();
        const userExist = await userRepository.exist({ email: verifyAccountDTO.email })
        if(!userExist) {
            throw new NotFoundException("user not found")
        }
        if(userExist.otp !== verifyAccountDTO.otp) {
            throw new BadRequestException("invalid otp")
        }
        if(userExist.otpExpiredAt! < new Date()) {
            throw new BadRequestException("otp expired")
        }
    },
}