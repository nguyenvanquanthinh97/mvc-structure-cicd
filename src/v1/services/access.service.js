const axios = require('axios');

const accessConfig = require('../config/access.config')
const UserService = require('./user.service');

class AccessService {
  static getGoogleLoginUrl = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `response_type=code&` +
      `client_id=${accessConfig.GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${accessConfig.CALLBACK_URL}&` +
      `scope=openid email profile`;

    return authUrl;
  }

  static loginGoogle = async (code) => {
    // Exchange authorization code for access token
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
      code: code,
      client_id: accessConfig.GOOGLE_CLIENT_ID,
      redirect_uri: accessConfig.CALLBACK_URL,
      grant_type: 'authorization_code',
      client_secret: accessConfig.GOOGLE_CLIENT_SECRET
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const tokenData = tokenResponse.data;

    // Get user info from Google
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
          Authorization: `Bearer ${tokenData.access_token}`
      }
    });

    const { name, email } = userInfoResponse.data;

    const user = await UserService.UpsertUser({ name, email });
    return user;
  }
}

module.exports = AccessService;
