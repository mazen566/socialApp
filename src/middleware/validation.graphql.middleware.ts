import { ZodType } from "zod";
import { BadRequestException } from "../utils";

export const isValidGraphql = (schema: ZodType, args: any) => {
    let data = args;
    const result = schema.safeParse(data);
    if(!result.success) {
        let errMessages = result.error.issues.map((issue) => ({
            path: issue.path[0],
            message: issue.message
        }));
        throw new BadRequestException(JSON.stringify(errMessages));
    }
};