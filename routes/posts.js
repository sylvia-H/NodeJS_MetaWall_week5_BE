var express = require('express');
var router = express.Router();
const asyncErrorHandler = require("../helper/asyncErrorHandler");
const PostController = require('../controllers/posts');

router.get('/', asyncErrorHandler(PostController.getPosts));

router.post('/', asyncErrorHandler(PostController.createPosts));

router.delete('/', asyncErrorHandler(PostController.deleteAllPosts));

router.delete('/:id', asyncErrorHandler(PostController.deletePosts));

router.patch('/:id', asyncErrorHandler(PostController.editPosts));

module.exports = router;
