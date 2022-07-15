
import Post from '../model/post.js'

export const createPost = async (request, response) => {

    try {
        const post = await new Post(request.body)
        post.save()
        response.status(200).json('Post Saved Successfully')
    }
    catch (error) {
        response.status(500).json(error);
    }
}



export const getAllPost = async(request, response) => {
    try {
        let posts = await Post.find({})
         response.status(200).json(posts)
    } catch (error) {
         response.status(500).json({ msg: error.message })
    }
}
