require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
      console.log(data[0].name)
    return sign({foo: data[0].name }, process.env.ACCESS_SECRET || '1234', { expiresIn: "3600s" });
  },
  generateRefreshToken: (data) => {
    return sign({ foo: data[0].name }, process.env.REFRESH_SECRET || '1234', { expiresIn: "1d" });
  },

  isAuthorized: (req) => {
      const authorization = req.headers['cookie'];
      
      if (!authorization) {
        return null;
      }
      const token = authorization.split('=')[1];
      
      try {
        return verify(token, process.env.ACCESS_SECRET || "1234");
      } catch (err) {
        return null;
      }
  },
//   checkRefeshToken: (refreshToken) => {
//     try {
//       return verify(refreshToken, process.env.REFRESH_SECRET || "1234");
//     } catch (err) {
//       // return null if refresh token is not valid
//       return null;
//     }
//   },
};

