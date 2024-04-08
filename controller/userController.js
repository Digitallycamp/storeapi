const fs = require('fs')
const {uuid}= require('uuidv4');
const validateEmail = require('../utils/email_validation');
const hashPass = require('../utils/pass_encryption')



/* Create a user */
 const createUser = (req, res) =>{
     try{
       const {usersname, name,  email, avater, password } = req.body;
       if(!usersname, !name || !email || !avater || !password ){
           res.status(404).json({
               message: 'All values are required'
           })
           return
       }
       //validate email
    const isValidEmail = validateEmail(email)
    if(!isValidEmail){
        res.status(404).json({
            message: "The email is not a valid email address"
        })
        return
    }
    // const users = fs.readFileSync('./data/users.json', 'utf8')
    const users = fs.readFileSync('https://s3.eu-north-1.amazonaws.com/techathon3.0storage/Techathon+Js+Special/data/users.json', 'utf8')
    const parsedUser = JSON.parse(users)
    const findUser = parsedUser.find( user => user.usersname === usersname)
    console.log(findUser)
    if(findUser) {
        res.status(404).json({
            message: "username already exits"
        })
        return
    }

    const newUser = {
        userId:uuid(),
        usersname,
        name,
        email,
        avater,
        password: hashPass(password),
        role: "vendor"
    };

    parsedUser.push(newUser)
    fs.writeFileSync('https://s3.eu-north-1.amazonaws.com/techathon3.0storage/Techathon+Js+Special/data/users.json', JSON.stringify(parsedUser))
    res.status(201).json({
        message: "Account created successfully!",
       data : newUser
    })



   }catch(error){
    res.status(500).json({
        message: error.message
    })
   }

}

module.exports = createUser