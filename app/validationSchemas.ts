import { optional, z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, "A Title is Required").max(255),
    description: z
        .string()
        .min(1, "A small Description is Required")
        .max(65535),
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, "A Title is Required").max(255).optional(),
    description: z
        .string()
        .min(1, "A small Description is Required")
        .max(65535)
        .optional(),
    assignedToUserId: z
        .string()
        .min(1, "AsignedToUserId is Required")
        .max(255)
        .nullable()
        .optional(),
});
