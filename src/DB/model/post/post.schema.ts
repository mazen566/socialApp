import { Schema } from "mongoose";
import { IPost } from "../../../utils";
import { reactionSchema } from "../common";
import { commentModel } from "../comment/comment.model";

export const postSchema = new Schema<IPost>({
    userId: {
        type: Schema.Types.ObjectId,
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
    reactions: [ reactionSchema ],
    isFreezed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

postSchema.virtual("comments", {
    localField: "_id",
    foreignField: "postId",
    ref: "Comment",
});

postSchema.pre("deleteOne", async function (next) {
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};
    // const firstLayer = await commentModel.find({ postId: filter._id, parentId: null });
    // if(firstLayer.length) {
    //     for (const comment of firstLayer) {
    //         await commentModel.deleteOne({ _id: comment._id });
    //     }
    // }
    // next();

    await commentModel.deleteMany({ postId: filter._id });
    next();
});