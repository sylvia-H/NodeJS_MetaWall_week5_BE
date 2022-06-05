const successHandler = require('../helper/successHandlers');
const errorHandler = require('../helper/errorHandlers');
const Comment = require('../model/comment');

const CommentController = {
  async getComments(req, res) {
    const comments = await Comment.find().populate({
      path: 'author',
      select: 'name avatar',
    });
    successHandler(res, comments);
  },
  async createComments(req, res) {
    try {
      const { articleID, author, body } = req.body;
      if (articleID && author && body) {
        await Comment.create({
          articleID,
          author,
          body
        });
        CommentController.getComments(req, res);
      } else {
        errorHandler(res, 400, 4001);
      }
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
  async deleteAllComments(req, res) {
    const comments = await Comment.deleteMany({});
    successHandler(res, comments);
  },
  async deleteComments(req, res) {
    try {
      const { id } = req.params;
      await Comment.findByIdAndDelete(id)
        .then((result) => {
          if (result) {
            CommentController.getComments(req, res);
          } else {
            errorHandler(res, 400, 4003);
          }
        })
        .catch(() => errorHandler(res, 400, 4003));
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
  async editComments(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;
      await Comment.findByIdAndUpdate(id, body)
        .then((result) => {
          if (result) {
            CommentController.getComments(req, res);
          } else {
            errorHandler(res, 400, 4003);
          }
        })
        .catch(() => errorHandler(res, 400, 4003));
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
};

module.exports = CommentController;
