import Post from "@/model/post.model"

export async function getPosts() {
    let post = await Post.find().populate("author").sort({ updatedAt: 'desc' })
    return post
}