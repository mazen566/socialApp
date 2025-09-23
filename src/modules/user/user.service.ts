import { NotFoundException } from '../../utils';
import { UserRepository } from './../../DB/model/user/user.repository';
import { NextFunction, Request, Response } from "express";

class UserService {
    private readonly userRepository = new UserRepository();
    constructor() {}

    getProfile = async (req: Request, res: Response, next: NextFunction) => {
        let user = await this.userRepository.getOne({ _id: req.params.id });
        if(!user) {
            throw new NotFoundException("user not found")
        }
        return res
            .status(200)
            .json({ message: "done", success: true, data: { user: req.user } });
    };
}

export default new UserService();