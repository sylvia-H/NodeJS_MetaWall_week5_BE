var express = require('express');
var router = express.Router();
const asyncErrorHandler = require("../helper/asyncErrorHandler");
const UserController = require('../controllers/users');

router.get('/', asyncErrorHandler(UserController.getUsers));

router.get('/:id', asyncErrorHandler(UserController.getUsers));

router.post('/', asyncErrorHandler(UserController.createUsers));

router.delete('/', asyncErrorHandler(UserController.deleteAllUsers));

router.delete('/:id', asyncErrorHandler(UserController.deleteUsers));

router.patch('/:id', asyncErrorHandler(UserController.editUsers));

module.exports = router;
