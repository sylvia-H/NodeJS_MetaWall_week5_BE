var express = require('express');
var router = express.Router();
const asyncErrorHandler = require("../helper/asyncErrorHandler");
const CommentController = require('../controllers/comments');

router.get('/', asyncErrorHandler(CommentController.getComments));

router.post('/', asyncErrorHandler(CommentController.createComments));

router.delete('/', asyncErrorHandler(CommentController.deleteAllComments));

router.delete('/:id', asyncErrorHandler(CommentController.deleteComments));

router.patch('/:id', asyncErrorHandler(CommentController.editComments));

module.exports = router;
