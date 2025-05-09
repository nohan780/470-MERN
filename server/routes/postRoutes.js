import express from 'express';
import { createPost, getPostsByTopic, deletePost, likePost } from '../controllers/postController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/:topic', getPostsByTopic);
router.delete('/:postId', deletePost);
router.post('/:postId/like', likePost);

export default router;