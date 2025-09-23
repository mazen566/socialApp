"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const index_1 = require("./factory/index");
const auth_provider_1 = require("./provider/auth.provider");
class AuthService {
    userRepository = new DB_1.UserRepository();
    AuthFactoryService = new index_1.AuthFactoryService();
    constructor() { }
    register = async (req, res, next) => {
        const registerDTO = req.body;
        const userExist = await this.userRepository.exist({ email: registerDTO.email });
        if (userExist) {
            throw new utils_1.ConflictException("User already exists with this email");
        }
        const user = this.AuthFactoryService.register(registerDTO);
        const createdUser = await this.userRepository.create(user);
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user: { id: createdUser.id }
        });
    };
    verifyAccount = async (req, res, next) => {
        const verifyAccountDTO = req.body;
        await auth_provider_1.authProvider.checkOTP(verifyAccountDTO);
        await this.userRepository.update({ email: verifyAccountDTO.email }, { isVerified: true, $unset: { otp: "", otpExpiredAt: "" } });
        return res.sendStatus(204);
    };
}
exports.default = new AuthService();
