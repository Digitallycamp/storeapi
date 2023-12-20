const express = require('express')
const userRouter = require('./route/users')
const loginRouter = require('./route/login');
const productRouter = require('./route/products')

const app = express();
const port = 3310;
app.use(express.json())


app.get('/', (req, res)=> {
    res.send('Welcome to store API')
})

app.use('/api/v1/user', userRouter)
app.use('/api/v1/user/login', loginRouter)
app.use('/api/v1/products', productRouter)
// start product 

app.listen(port, ()=> {
    console.log(`Server running on port http://localhost/${port}`)
})