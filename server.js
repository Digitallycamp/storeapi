const express = require('express')
const userRouter = require('./route/users')
const loginRouter = require('./route/login');
const productRouter = require('./route/products')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')


const app = express();
const port = 3310;
app.use(cors(corsOptions))
app.use(express.json())

app.use(express.static("public"))
app.set('view engine', 'ejs');


const date = new Date().getFullYear();
app.get('/', (req, res)=> {
    res.render('pages/index', {
        date: date,
        
    });
})

app.use('/api/v1/user', userRouter)
app.use('/api/v1/user/login', loginRouter)
app.use('/api/v1/products', productRouter)
// start product 

app.listen(port, ()=> {
    console.log(`Server running on port http://localhost/${port}`)
})