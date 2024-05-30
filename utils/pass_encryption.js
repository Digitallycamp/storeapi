const bcrypt = require('bcryptjs');

const hashPass = (pass) => {
	const salt = bcrypt.genSaltSync(10);
	return (hash = bcrypt.hashSync(pass, salt));
};
module.exports = hashPass;
