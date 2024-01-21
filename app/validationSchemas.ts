import { z } from "zod";

export const createIssueSchema = z.object({
    title: z.string().min(1, "A Title is Required").max(255),
    description: z.string().min(1, "A small Description is Required"),
});
