import { FilterQuery } from "mongoose";
import { IUser } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";
import { userModel } from "./user.model";


export class UserRepository extends AbstractRepository<IUser> {
    constructor() {
        super(userModel);
    }
    async getSpecificUser(filter: FilterQuery<IUser>) {
        return await this.getOne(filter);
    }
}