"use client";

import { toast } from "react-hot-toast";
import { submitCommentAction } from "./submitCommentAction";
import type { CommentFormState } from "./commentFormTypes";

export function createCommentFormAction(onSuccess?: () => void) {
    return async (prev: CommentFormState, formData: FormData): Promise<CommentFormState> => {
        const next = await submitCommentAction(prev, formData);

        if(next.ok && next.message) {
            toast.success(next.message);
            onSuccess?.();
        } else if(next.error) {
            toast.error(next.error);
        }

        return next;
    }; 
}