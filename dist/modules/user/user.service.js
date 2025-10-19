"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const user_repository_1 = require("./../../DB/model/user/user.repository");
class UserService {
    userRepository = new user_repository_1.UserRepository();
    constructor() { }
    getProfile = async (req, res, next) => {
        return res.status(200).json({
            message: "done",
            success: true,
            data: { user: req.user }
        });
    };
    sendRequest = async (req, res, next) => {
        const { friendId } = req.params;
        const friend = await this.userRepository.exist({ _id: friendId });
        if (!friend) {
            throw new utils_1.NotFoundException("friend not found");
        }
        ;
        const user = req.user;
        const isFriend = user.friends.map(String).includes(friendId);
        if (isFriend) {
            throw new utils_1.NotFoundException("already friends");
        }
        ;
        const haveRequest = user.friendRequests.map(String).includes(friendId);
        if (haveRequest) {
            throw new utils_1.NotFoundException("already have request");
        }
        await this.userRepository.update({ _id: friendId }, { $addToSet: { friendRequests: req.user._id } });
        return res.status(200).json({
            message: "request sent",
            success: true
        });
    };
    acceptRequest = async (req, res, next) => {
        const { friendId } = req.params;
        const promise = Promise.all([
            this.userRepository.update({ _id: req.user._id }, { $pull: { friendRequests: friendId }, $addToSet: { friends: friendId } }),
            this.userRepository.update({ _id: friendId }, { $addToSet: { friends: req.user._id } })
        ]);
        await promise;
        return res.status(200).json({
            message: "accepted",
            success: true
        });
    };
    unFriend = async (req, res, next) => {
        const { friendId } = req.params;
        const friend = await this.userRepository.exist({ _id: friendId });
        if (!friend) {
            throw new utils_1.NotFoundException("friend not found");
        }
        await Promise.all([
            this.userRepository.update({ _id: req.user._id }, { $pull: { friends: friendId } }),
            this.userRepository.update({ _id: friendId }, { $pull: { friends: req.user._id } }),
        ]);
        return res.status(200).json({ message: "unfriended successfully", success: true });
    };
}
exports.default = new UserService();
