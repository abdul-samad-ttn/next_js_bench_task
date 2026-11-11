import { apiGet } from "./http";
import { Comment } from "./types";

const getComments = async (postId: number): Promise<Comment[]> => {
    const comments = await apiGet<Comment[]>(`/posts/${postId}/comments`);
    return comments;
}

const getCommentById = async (commentId: number): Promise<Comment> => {
    const comment = await apiGet<Comment>(`/comments/${commentId}`);
    return comment;
}

export { getComments, getCommentById };