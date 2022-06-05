const successHandler = require('../helper/successHandlers');
const appError = require('../helper/appError');
const Post = require('../model/post');

const PostController = {
  async getPosts(req, res) {
    // 貼文時間序列
    const timeSort = req.query.timeSort === 'asc' ? 'createdAt' : '-createdAt';
    // 搜尋貼文內容
    const q =
      req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
    const posts = await Post.find(q)
      .populate({
        path: 'author',
        select: 'name avatar',
      })
      .populate({
        path: 'comments',
      })
      .sort(timeSort);
    successHandler(res, posts);
  },
  async createPosts(req, res) {
    const { author, content, tags, image, likes, comments, privacy } = req.body;
    if (author && content) {
      await Post.create({
        author,
        content,
        tags,
        image,
        likes,
        comments,
        privacy,
      });
      PostController.getPosts(req, res);
    } else {
      return appError(
        400,
        'Bad Request Error - All required fields must be completed.',
        next
      );
    }
  },
  async deleteAllPosts(req, res) {
    const posts = await Post.deleteMany({});
    successHandler(res, posts);
  },
  async deletePosts(req, res) {
    const { id } = req.params;
    await Post.findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return appError(400, 'Bad Request Error - Failed to get data', next);
        }
        PostController.getPosts(req, res);
      })
      .catch(() => appError(400, 'Bad Request Error - ID not found', next));
  },
  async editPosts(req, res) {
      const { body } = req;
      const { id } = req.params;
      await Post.findByIdAndUpdate(id, body)
        .then((result) => {
          if (!result) {
            return appError(400, 'Bad Request Error - Failed to get data', next);
          }
          PostController.getPosts(req, res);
        })
        .catch(() => appError(400, 'Bad Request Error - ID not found', next));
  },
};

module.exports = PostController;
