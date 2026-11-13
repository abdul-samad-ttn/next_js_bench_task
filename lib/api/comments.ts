import { apiGet, apiPost } from "./http";
import { IComment } from "./types";

export type CreateCommentInput= Pick<IComment, "name" | "email" | "body">;

const getComments = async (postId: number): Promise<IComment[]> => {
    const comments = await apiGet<IComment[]>(`/posts/${postId}/comments`);
    return comments;
};

const getCommentById = async (commentId: number): Promise<IComment> => {
    const comment = await apiGet<IComment>(`/comments/${commentId}`);
    return comment;
};

const createComment = async (postId: number, input: CreateCommentInput): Promise<IComment> => {
    const newComment = await apiPost<IComment>(`/posts/${postId}/comments`, input);
    return newComment;
};

export { getComments, getCommentById, createComment };