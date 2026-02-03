import { z } from "zod";

export const allFieldsMin3Schema = z
    .record(
        z.string(),
        z.string().trim().min(3, "Must be at least 3 characters")
            .max(30, "Must be at most 30 characters")
    )
    .refine((obj) => Object.keys(obj).length > 0, { message: "Request body cannot be empty" }
    );