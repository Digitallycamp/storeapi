const fs = require('fs')
const bcript = require('bcryptjs')

const loginUserController = (req, res) => {
    const { email, usersname, password} = req.body

    if((!email || !usersname) && !password ){
        res.status(404).json({message: "Username or email and password  needed!!"})
        return 
    }

    try{
        const user = fs.readFileSync('./data/users.json', 'utf8');
        const parsedUser = JSON.parse(user)
        const findUser = parsedUser.find(user => ((user.email === email || user.usersname === usersname) && bcript.compareSync(password, user.password)))
        if(!findUser){
            res.status(404).json({message: 'Invalid username or email or password'})
            return
        }

        res.status(200).json({message: 'Login sucessfull'})
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = loginUserController;