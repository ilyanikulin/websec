const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp
const socketioJwt = require('socketio-jwt'); // аутентификация по JWT для socket.io

module.exports = function verifyJWTToken(token) {
  return new Promise((resolve, reject) =>
  {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => 
    {
      if (err || !decodedToken)
      {
        return reject(err)
      }

      resolve(decodedToken)
    })
  })
}