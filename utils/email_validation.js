const emailValidation = require('nodejs-email-validation');

const validateEmail = (email) => {
	return emailValidation.validate(email);
};
module.exports = validateEmail;
