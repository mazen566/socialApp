"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const user_repository_1 = require("./../../DB/model/user/user.repository");
class UserService {
    userRepository = new user_repository_1.UserRepository();
    constructor() { }
    getProfile = async (req, res, next) => {
        let user = await this.userRepository.getOne({ _id: req.params.id });
        if (!user) {
            throw new utils_1.NotFoundException("user not found");
        }
        return res
            .status(200)
            .json({ message: "done", success: true, data: { user: req.user } });
    };
}
exports.default = new UserService();
