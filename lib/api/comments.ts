import { apiGet } from "./http";
import { IComment } from "./types";

const getComments = async (postId: number): Promise<IComment[]> => {
    const comments = await apiGet<IComment[]>(`/posts/${postId}/comments`);
    return comments;
}

const getCommentById = async (commentId: number): Promise<IComment> => {
    const comment = await apiGet<IComment>(`/comments/${commentId}`);
    return comment;
}

export { getComments, getCommentById };