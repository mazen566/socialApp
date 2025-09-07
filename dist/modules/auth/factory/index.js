"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFactoryService = void 0;
const enum_1 = require("../../../utils/common/enum");
const hash_1 = require("../../../utils/hash");
const OTP_1 = require("../../../utils/OTP");
const entity_1 = require("../entity");
class AuthFactoryService {
    register(RegisterDTO) {
        const user = new entity_1.User();
        user.fullName = RegisterDTO.fullName;
        user.email = RegisterDTO.email;
        user.password = (0, hash_1.generateHash)(RegisterDTO.password);
        user.phoneNumber = RegisterDTO.phoneNumber;
        user.otp = (0, OTP_1.generateOTP)();
        user.otpExpiredAt = (0, OTP_1.generateExpiryDate)(5 * 60 * 60 * 1000);
        user.credentialUpdatedAt = Date.now();
        user.gender = enum_1.GENDER.male;
        user.role = enum_1.SYS_ROLE.user;
        user.userAgent = enum_1.USER_AGENT.local;
        return user;
    }
}
exports.AuthFactoryService = AuthFactoryService;
