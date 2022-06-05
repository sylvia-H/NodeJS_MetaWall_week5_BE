const successHandler = require('../helper/successHandlers');
const errorHandler = require('../helper/errorHandlers');
const User = require('../model/user');

const UserController = {
  async getUsers(req, res) {
    try {
      // const id = new mongoose.Types.ObjectId(req.params.id);
      const { id } = req.params;
      if (id) {
        User.findById(id, function (err, user) {
          if (err) {
            errorHandler(res, 400, 4003);
          } else {
            successHandler(res, user);
          }
        });
      } else {
        const users = await User.find();
        successHandler(res, users);
      }
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
  async createUsers(req, res) {
    try {
      const { name, email, avatar } = req.body;
      if (name && email && avatar) {
        await User.create({
          name,
          email,
          avatar,
        });
        UserController.getUsers(req, res);
      } else {
        errorHandler(res, 400, 4001);
      }
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
  async deleteAllUsers(req, res) {
    const users = await User.deleteMany({});
    successHandler(res, users);
  },
  async deleteUsers(req, res) {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id)
        .then((result) => {
          if (result) {
            UserController.getUsers(req, res);
          } else {
            errorHandler(res, 400, 4003);
          }
        })
        .catch(() => errorHandler(res, 400, 4003));
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
  async editUsers(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;
      await User.findByIdAndUpdate(id, body)
        .then((result) => {
          if (result) {
            UserController.getUsers(req, res);
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

module.exports = UserController;
