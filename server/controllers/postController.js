import Post from "../models/post.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
    const { content, topic } = req.body;
    const author = req.session.userId;

    if (!author) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const newPost = new Post({
            content,
            author,
            topic
        });
        await newPost.save();
        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getPostsByTopic = async (req, res) => {
    const { topic } = req.params;
    const userId = req.session.userId;

    try {
        const posts = await Post.find({ topic }).sort({ createdAt: -1 });
        const postsWithAuthorship = posts.map(post => ({
            _id: post._id,
            content: post.content,
            topic: post.topic,
            likes: post.likes.length,
            createdAt: post.createdAt,
            isAuthor: userId ? post.author.toString() === userId : false
        }));
        res.status(200).json(postsWithAuthorship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deletePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }
        await post.deleteOne(); // Updated from post.remove()
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const userObjectId = new mongoose.Types.ObjectId(userId);
        if (post.likes.includes(userObjectId)) {
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            post.likes.push(userObjectId);
        }
        await post.save();
        res.status(200).json({ message: "Like updated", likes: post.likes.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};