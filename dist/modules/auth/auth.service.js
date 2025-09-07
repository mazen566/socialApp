"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./factory/index");
const user_repository_1 = require("../../DB/model/user/user.repository");
const error_1 = require("../../utils/error");
class AuthService {
    userRepository = new user_repository_1.UserRepository();
    AuthFactoryService = new index_1.AuthFactoryService();
    constructor() { }
    register = async (req, res, next) => {
        const registerDTO = req.body;
        const userExist = await this.userRepository.exist({ email: registerDTO.email });
        if (userExist) {
            throw new error_1.ConflictException("User already exists with this email");
        }
        const user = this.AuthFactoryService.register(registerDTO);
        const createdUser = await this.userRepository.create(user);
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user: createdUser
        });
    };
}
exports.default = new AuthService();
