"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const index_1 = require("./factory/index");
const auth_provider_1 = require("./provider/auth.provider");
const token_1 = require("../../utils/token");
class AuthService {
    userRepository = new DB_1.UserRepository();
    AuthFactoryService = new index_1.AuthFactoryService();
    constructor() { }
    register = async (req, res) => {
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
    verifyAccount = async (req, res) => {
        const verifyAccountDTO = req.body;
        await auth_provider_1.authProvider.checkOTP(verifyAccountDTO);
        await this.userRepository.update({ email: verifyAccountDTO.email }, { isVerified: true, $unset: { otp: "", otpExpiredAt: "" } });
        return res.sendStatus(204);
    };
    login = async (req, res) => {
        const loginDTO = req.body;
        const userExist = await this.userRepository.exist({ email: loginDTO.email });
        if (!userExist) {
            throw new utils_1.ForbiddenException("User not found with this email");
        }
        ;
        if (!(0, utils_1.compareHash)(loginDTO.password, userExist.password)) {
            throw new utils_1.ForbiddenException("Invalid credentials");
        }
        ;
        if (!userExist.isVerified) {
            throw new utils_1.ForbiddenException("User is not verified");
        }
        ;
        const accessToken = (0, token_1.generateToken)({
            payload: { _id: userExist._id, role: userExist.role },
            options: { expiresIn: '1d' }
        });
        return res.status(200).json({
            message: "Login successful",
            success: true,
            data: { accessToken }
        });
    };
}
exports.default = new AuthService();
