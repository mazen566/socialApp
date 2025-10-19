"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFactoryService = void 0;
const utils_1 = require("../../../utils");
const entity_1 = require("../entity");
class AuthFactoryService {
    register(RegisterDTO) {
        const user = new entity_1.User();
        user.fullName = RegisterDTO.fullName;
        user.email = RegisterDTO.email;
        user.password = (0, utils_1.generateHash)(RegisterDTO.password);
        user.phoneNumber = RegisterDTO.phoneNumber;
        user.otp = (0, utils_1.generateOTP)();
        user.otpExpiredAt = (0, utils_1.generateExpiryDate)(5 * 60 * 60 * 1000);
        user.credentialUpdatedAt = Date.now();
        user.gender = utils_1.GENDER.male;
        user.role = utils_1.SYS_ROLE.user;
        user.userAgent = utils_1.USER_AGENT.local;
        user.isVerified = false;
        return user;
    }
}
exports.AuthFactoryService = AuthFactoryService;
