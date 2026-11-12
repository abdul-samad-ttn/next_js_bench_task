import { apiGet } from "./http";
import { Post } from "./types";

const getPosts = async (): Promise<Post[]> => {
    const posts = await apiGet<Post[]>('/posts');
    if(!posts) {
        throw new Error("Failed to fetch posts list");
    }
    return posts;
}

const getPostById = async(postId: number): Promise<Post> =>{
    const postData = await apiGet<Post>(`/posts/${postId}`);
    return postData;
}

export {getPosts, getPostById};