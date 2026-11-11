import { apiGet } from "./http";
import { Post } from "./types";

const getPosts = async (): Promise<Post[]> => {
    const posts = await apiGet<Post[]>('/posts');
    return posts;
}

const getPostById = async(postId: number): Promise<Post> =>{
    const postData = await apiGet<Post>(`/posts/${postId}`);
    return postData;
}

export {getPosts, getPostById};