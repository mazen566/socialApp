"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProvider = void 0;
const DB_1 = require("../../../DB");
const utils_1 = require("../../../utils");
exports.authProvider = {
    async checkOTP(verifyAccountDTO) {
        const userRepository = new DB_1.UserRepository();
        const userExist = await userRepository.exist({ email: verifyAccountDTO.email });
        if (!userExist) {
            throw new utils_1.NotFoundException("user not found");
        }
        if (userExist.otp !== verifyAccountDTO.otp) {
            throw new utils_1.BadRequestException("invalid otp");
        }
        if (userExist.otpExpiredAt < new Date()) {
            throw new utils_1.BadRequestException("otp expired");
        }
    },
};
