const { getInfoData } = require("../utils");

class UserController {
  getMyInfo = async (req, res, next) => {
    const user = req.user;

    res.status(200).json({
      status: 'success',
      data: {
        user: getInfoData({ fields: ['id', 'name', 'email'], object: user })
      }
    });
  }
}

module.exports = new UserController();
