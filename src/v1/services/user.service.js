const UserModel = require('../models/user.model');

class UserService {
  static UpsertUser = async ({name, email}) => {
    const filter = { email: email };
    const update = { name: name, email: email }
    const options = { upsert: true, new: true }

    const user = await UserModel.findOneAndUpdate(filter, update, options)
    return user;
  }
}

module.exports = UserService;
