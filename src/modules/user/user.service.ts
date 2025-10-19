import { NotFoundException } from '../../utils';
import { UserRepository } from './../../DB/model/user/user.repository';
import { NextFunction, Request, Response } from "express";

class UserService {
    private readonly userRepository = new UserRepository();
    constructor() {}

    getProfile = async (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({
            message: "done",
            success: true,
            data: { user: req.user }
        });
    };

    sendRequest = async (req: Request, res: Response, next: NextFunction) => {
        const { friendId } = req.params;
        const friend = await this.userRepository.exist({ _id: friendId });
        if(!friend) {
            throw new NotFoundException("friend not found");
        };
        const user = req.user!;
        const isFriend = user.friends!.map(String).includes(friendId as unknown as string);
        if(isFriend) {
            throw new NotFoundException("already friends");
        };
        const haveRequest = user.friendRequests!.map(String).includes(friendId as unknown as string);
        if(haveRequest) {
            throw new NotFoundException("already have request");
        }
        await this.userRepository.update(
            {_id: friendId},
            { $addToSet: { friendRequests: req.user!._id } }
        )
        return res.status(200).json({
            message: "request sent",
            success: true
        })
    };

    acceptRequest = async (req: Request, res: Response, next: NextFunction) => {
        const { friendId } = req.params;
        const promise = Promise.all([
            this.userRepository.update(
                { _id: req.user!._id },
                { $pull: { friendRequests: friendId }, $addToSet: { friends: friendId } },
            ),
            this.userRepository.update(
                { _id: friendId },
                {  $addToSet: { friends: req.user!._id } },
            )
        ])
        await promise;
        return res.status(200).json({
            message: "accepted",
            success: true
        })
    };

    unFriend = async (req: Request, res: Response, next: NextFunction) => {
        const { friendId } = req.params;
        const friend = await this.userRepository.exist({ _id: friendId });
        if(!friend) {
            throw new NotFoundException("friend not found");
        }
        await Promise.all([
            this.userRepository.update({ _id: req.user!._id }, { $pull: { friends: friendId } }),
            this.userRepository.update({ _id: friendId }, { $pull: { friends: req.user!._id } }),
        ]);
        return res.status(200).json({ message: "unfriended successfully", success: true });
    };
    
}

export default new UserService();