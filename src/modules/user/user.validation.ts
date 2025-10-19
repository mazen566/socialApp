import { z } from "zod";

export const sendRequest = z.object({
    friendId: z.string() as unknown as string,
})