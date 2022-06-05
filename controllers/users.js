const successHandler = require('../helper/successHandlers');
const appError = require('../helper/appError');
const User = require('../model/user');

const UserController = {
  async getUsers(req, res) {
    const { id } = req.params;
    if (id) {
      User.findById(id, (err, user) => {
        if (err) {
          return appError(400, 'Bad Request Error - ID not found', next);
        } else {
          successHandler(res, user);
        }
      });
    } else {
      const users = await User.find();
      successHandler(res, users);
    }
  },
  async createUsers(req, res) {
    const { name, email, avatar } = req.body;
    if (name && email && avatar) {
      await User.create({
        name,
        email,
        avatar,
      });
      UserController.getUsers(req, res);
    } else {
      return appError(
        400,
        'Bad Request Error - All required fields must be completed.',
        next
      );
    }
  },
  async deleteAllUsers(req, res) {
    const users = await User.deleteMany({});
    successHandler(res, users);
  },
  async deleteUsers(req, res) {
    const { id } = req.params;
    await User.findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return appError(400, 'Bad Request Error - Failed to get data', next);
        }
        UserController.getUsers(req, res);
      })
      .catch(() => appError(400, 'Bad Request Error - ID not found', next));
  },
  async editUsers(req, res) {
    const { body } = req;
    const { id } = req.params;
    await User.findByIdAndUpdate(id, body)
      .then((result) => {
        if (!result) {
          return appError(400, 'Bad Request Error - Failed to get data', next);
        }
        UserController.getUsers(req, res);
      })
      .catch(() => appError(400, 'Bad Request Error - ID not found', next));
  },
};

module.exports = UserController;
