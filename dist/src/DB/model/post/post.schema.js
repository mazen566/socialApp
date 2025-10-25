"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("../common");
const comment_model_1 = require("../comment/comment.model");
exports.postSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        // required: function () {
        //     if(this.attachments?.length) return false;
        //     return true;
        // },
        trim: true,
    },
    reactions: [common_1.reactionSchema],
    isFreezed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.postSchema.virtual("comments", {
    localField: "_id",
    foreignField: "postId",
    ref: "Comment",
});
exports.postSchema.pre("deleteOne", async function (next) {
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};
    // const firstLayer = await commentModel.find({ postId: filter._id, parentId: null });
    // if(firstLayer.length) {
    //     for (const comment of firstLayer) {
    //         await commentModel.deleteOne({ _id: comment._id });
    //     }
    // }
    // next();
    await comment_model_1.commentModel.deleteMany({ postId: filter._id });
    next();
});
