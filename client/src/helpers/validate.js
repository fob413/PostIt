import swal from 'sweetalert2';

/**
 * function that validates users form details
 * @param {object} usersPayload users form object
 * @param {string} type validation to be performed
 * @return {boolean} validated if user is validated or not
 */
const validate = (usersPayload, type) => {
  let validated = false;
  switch (type) {
    case 'signup':
      if (
        usersPayload.userName &&
        usersPayload.userName.trim().length > 0 &&
        usersPayload.password &&
        usersPayload.email &&
        usersPayload.telephone &&
        usersPayload.telephone.trim().length > 0
      ) {
        if (
          usersPayload.password.length > 7
        ) {
          if (
            usersPayload.password === usersPayload.confirmPassword
          ) {
            if (!isNaN(usersPayload.telephone)) {
              validated = true;
            } else {
              swal('Oops...', 'Please input a valid telephone number', 'error');
            }
          } else {
            swal('Oops...', 'Please confirm your password', 'error');
          }
        } else {
          swal('Oops...', 'Please input a password of at least 8 characters', 'error');
        }
      } else {
        swal('Oops...', 'Please fill the form', 'error');
      }
      break;

    case 'signin':
      if (usersPayload.userName && usersPayload.password) {
        validated = true;
      } else {
        swal('Oops...', 'Invalid Credentials', 'error');
      }
      break;
    default:
      validated = false;
  }
  return validated;
};

export default validate;

