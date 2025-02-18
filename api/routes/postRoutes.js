const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');
const {authenticate} = require('../middlewares/authMiddleware')


router.post('/', authenticate, PostController.createPost);
router.get('/', PostController.getAllPosts);
router.get('/students', authenticate, PostController.getPostsForStudents);
router.get('/:id', PostController.getPostById);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);


module.exports = router;
