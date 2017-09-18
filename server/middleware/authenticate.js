import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_TOKEN;

export default (req, res, next) => {
  const token = req.header('x-auth');
  if (token) {
  // verifies secret and checks exp
    jwt.verify(token, secret, (err, decoded) => {
      if (err) { // failed verification.
        return res.status(403).send({
          success: false,
          message: 'failed to authenticate token'
        });
      }
      req.decoded = decoded;
      next(); // no error, proceed
    });
  } else {
    // forbidden without token
    return res.status(403).send({
      success: false,
      message: 'no token provided'
    });
  }
};
