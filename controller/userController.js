const fs = require('fs')
const {uuid}= require('uuidv4');
const validateEmail = require('../utils/email_validation');
const hashPass = require('../utils/pass_encryption')
const pool = require('../config/db')



/* Create a user */
 const createUser = async  (req, res) =>{
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

    /**
     *  @Param  SELECT * FROM users  - To fetch all users form Database
     */
    // const getData = await pool.query('CREATE TABLE users(id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(120) NOT NULL)')
    // console.log(getData)
    // const insertData = await pool.query('INSERT INTO users(name) VALUES($1) RETURNING *', ['Gift'])
    // console.log(insertData)
    // const text = 'SELECT * FROM users'
    // const select = await pool.query(text)
    // console.log(select.rows)
 

    // const users = fs.readFileSync('./data/users.json', 'utf8')
    // const parsedUser = JSON.parse(users)
    // const findUser = parsedUser.find( user => user.usersname === usersname)
    // console.log(findUser)
    // if(findUser) {
    //     res.status(404).json({
    //         message: "username already exits"
    //     })
    //     return
    // }

    const newUser = {
        userId:uuid(),
        usersname,
        name,
        email,
        avater,
        password: hashPass(password),
        role: 'vendor'
       
    };

    // parsedUser.push(newUser)
    // fs.writeFileSync('./data/users.json', JSON.stringify(parsedUser))
    const text = 'INSERT INTO users(userid, username, name, email, avater, password, role ) VALUES( $1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [newUser.userId, newUser.usersname, newUser.name, newUser.email, newUser.avater, newUser.password, newUser.role]
    const InsertUser = await  pool.query(text, values)
    console.log(InsertUser)
    res.status(201).json({
        message: "Account created successfully!",
       data : InsertUser.rows
    })



   }catch(error){
    res.status(500).json({
        message: error.message
    })
   }

}

module.exports = createUser