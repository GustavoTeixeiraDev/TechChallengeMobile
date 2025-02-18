const express = require('express');
const studentController = require('../controllers/studentController');
const {authenticate} = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');


const router = express.Router();

router.post('/register', studentController.register);
router.post('/login', studentController.login);
router.get('/students', authenticate, postController.getPostsForStudents);
router.get('/posts', authenticate, studentController.getStudentPosts);


module.exports = router;