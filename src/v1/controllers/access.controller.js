const AccessService = require('../services/access.service');
const logger = require('../utils/logger')
const {getInfoData} = require('../utils')

class AccessController {
  constructor() {}

  googleLogin = async (req, res, next) => {
    const googleLoginUrl = AccessService.getGoogleLoginUrl()
    logger.info(`googleLoginURL::${googleLoginUrl}`)
    return res.status(200).json({redirectUrl: googleLoginUrl});
  }

  googleLoginCallback = async (req, res, next) => {
    const code = req.query.code

    const loginUser = await AccessService.loginGoogle(code);

    req.session.isLoggedIn = true;
    req.session.user = getInfoData({
      fields: ['id', 'name', 'email'],
      object: loginUser
    })

    return res.status(302).redirect(process.env.FRONTEND_HOST);
  }

  logout = async (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        logger.error(err)
        return res.status(500).json({message: 'Logout failed'})
      }
      res.clearCookie('connect.sid')
      return res.status(200).json({message: 'Logout successful'})
    })
  }
}

module.exports = new AccessController();
