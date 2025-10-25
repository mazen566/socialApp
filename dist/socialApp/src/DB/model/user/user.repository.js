"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const abstract_repository_1 = require("../../abstract.repository");
const user_model_1 = require("./user.model");
class UserRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(user_model_1.userModel);
    }
    async getSpecificUser(filter) {
        return await this.getOne(filter);
    }
}
exports.UserRepository = UserRepository;
