export type CommentFormState = {
    ok: boolean;
    message: string;
    error?: string;
}

export const initialCommentFormState: CommentFormState = {
    ok: false,
    message: "",
    error: undefined,
}