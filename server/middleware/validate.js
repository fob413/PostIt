/**
 * function that validates users req body for forms
 * @param {object} req user request body
 * @param {object} res server response
 * @param {string} type validation to be performed
 * @return {boolean} validated if user is validated or not
 */
const validate = (req, res, type) => {
  let validated = false;
  switch (type) {
    case 'signup':
      if (
        req.body.userName &&
        req.body.userName.trim().length > 0 &&
        req.body.password &&
        req.body.password.length > 7 &&
        req.body.email &&
        req.body.telephone &&
        req.body.telephone.trim().length > 0 &&
        !isNaN(req.body.telephone)
      ) {
        validated = true;
      }
      break;

    case 'signin':
      if (req.body.userName && req.body.password) {
        validated = true;
      }
      break;
    default:
      validated = false;
  }
  return validated;
};

export default validate;

