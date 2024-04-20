const fs = require('fs');
const {uuid} = require('uuidv4')
const  pool  = require('../config/db')


const prodcutController = async (req, res)=> {
 
    const {userId} = req.params ;
    
    
    const { 
        title,
        description,
        amount,
        image,
        ratings,
        category,
        
        } = req.body

        if(!title || !description || !amount || !image || !ratings || !category){
            res.status(404).json({message: "All fileds are required"})
            return
        }

    
    try{
        // const readFile = fs.readFileSync('./data/products.json', 'utf8')
        // const parsedData = JSON.parse(readFile)
        // const readUser = fs.readFileSync('./data/users.json', 'utf8')
        // const parsedUser = JSON.parse(readUser)
        const sql_SelectAllUsers = 'SELECT * FROM users'
        const allUsers = await pool.query(sql_SelectAllUsers)
        
        const findUser = allUsers.rows.find(user => user.userid === userId)
        if(!findUser){
            res.status(500).json({message: "User does not exist"})
            return
        }
       
            const product = {
                productId: uuid(),
                title,
                description,
                amount,
                image,
                ratings,
                category,
                userId
               
            }

            // parsedData.push(product )
            //  fs.writeFileSync('./data/products.json', JSON.stringify(parsedData))
            const text = 'INSERT INTO products(product_id, title, description, amount, image, ratings, category, userid) VALUES( $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
            const values = [product.productId, product.title, product.description, product.amount, product.image, product.ratings, product.category, product.userId]
            const InsertProduct = await pool.query(text, values)
            res.status(201).json({
                message: "Product created succcessfully",
                data: InsertProduct.rows
            })
    }catch(error){
        res.status(500).json({message: error.message})
    }

}





// const allProductController = async (req, res)=> {
//     try{

//         const readProducts= fs.readFileSync('./data/products.json', 'utf8')
//         const parsedProduct = JSON.parse(readProducts)
//         if(parsedProduct.length === 0 ){
//             res.status(404).json({message: 'No products in db'})
//             return
//         }
//         res.status(200).json({
//             length: parsedProduct.length ,
//             message: "Success" ,
//             data: parsedProduct
//         })
//     }catch(error){
//         res.status(500).json({message: error.message})
//     }

// }


const getProductById =  async (req, res)=> {
    const { productid} = req.params

    if(!productid){
        return res.status(404).json({ message: "No product ID to update"})
    
    }

    // const readProd = fs.readFileSync('./data/products.json', 'utf8')
    // const parsedProd = JSON.parse(readProd)
    
        // const findProd = parsedProd.find(prod => prod.product_id === productid)

        // if(!findProd){
        //     return res.status(404).json({ message: "No such product with that ID"})
        // }
        
    try{

        // const readProduct = fs.readFileSync('./data/products.json', 'utf8')
        // const parsedProduct = JSON.parse(readProduct)
        // const singleProducts = parsedProduct.find(product => product.productId === productid)
        // console.log(singleProducts)
        const sql_SelectAllProducts = 'SELECT * FROM products'
        const prodcuctById = await pool.query(sql_SelectAllProducts )
        const findProd = prodcuctById.rows.find(prod => prod.product_id === productid)

        if(!findProd){
            return res.status(404).json({ message: "No such product with that ID"})
        }

              
        res.status(200).json({message: 'success', data: findProd })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }

}


const getProductsByUser = async (req, res)=> {
    const { userId} = req.params;
   
    if(!userId){
        return res.status(400).json({ message: "You need a user ID"})
    }

    // const readUser = fs.readFileSync('./data/users.json', 'utf-8')
    // const parseUser = JSON.parse(readUser)
            // const sql_SelectAllUsers = 'SELECT * FROM users'
            // const allUsers = await pool.query(sql_SelectAllUsers)
            // const findUser = allUsers.rows.find(user => user.userid === userId)

            // if(!findUser){
            //     return res.status(404).json({ message: "No such user!"})
            // }

            const text = `SELECT 1 FROM users WHERE userid = $1`;
            const values = [userId];
            const users = await pool.query(text, values)
            // const findUser = users.rows.find((user)=> user.userid === userId )
        
            // if(!findUser){
            //     return res.status(404).json({ message: "No such user!"})
            // }
            if(users.rowCount === 0){
                return res.status(404).json({ message: "No such user!"})
              
            }
         


    try{

        // const readProduct = fs.readFileSync('./data/products.json', 'utf8')
        // const parsedProduct = JSON.parse(readProduct)
            // const sql_selectProduct =  'SELECT * FROM products';
            // const allProducts = await pool.query(sql_selectProduct)
            // const userProducts = allProducts.rows.filter(product => product.userid === userId)
        const text = 'SELECT * FROM products WHERE userid= $1';
        const values = [userId]
        const userProducts = await pool.query(text, values)
        if(userProducts.rowCount=== 0){
            return res.status(404).json({ message: "No product added by user"})
        }
        res.status(200).json({
            
            message: "success",
            data:userProducts.rows

        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }

}

const updateProuct = async (req, res)=> {
    const {productid} = req.params
    const { 
        title,
        description,
        amount,
        image,
        ratings,
        category,
        
        } = req.body

        
        if(!productid){
            res.status(404).json({message: "product with ID required"})
            return
        }
       

        if(!title || !description || !amount || !image || !ratings || !category ){
            res.status(400).json({message: "All fileds are required"})
            return
        }
  // const readFile  =  fs.readFileSync('./data/products.json', 'utf8')
        // const parsedData = JSON.parse(readFile)
        // let data = parsedData.find(product => product.productId === productid)
        const sql_SelectAllProducts = 'SELECT * FROM products'
        const prodcuctById = await pool.query(sql_SelectAllProducts )
        const data = prodcuctById.rows.find(prod => prod.product_id === productid)
   
        if(!data){
            res.status(404).json({message: "product with ID not found!!"})
            return
        }

    try {
      
       

        //  const updatedProduct = {
        //     ...data,
        //     ...req.body
        // }

        // const newProducts = parsedData.filter(product => product.productId !== productid)
        // newProducts.push(updatedProduct)
    

        // fs.writeFileSync('./data/products.json', JSON.stringify(newProducts))
        const text = `UPDATE products 
                        SET title = $1,  
                            description = $2,
                            amount = $3,
                            image = $4,
                            ratings = $5,
                            category = $6,
                            updated_at = CURRENT_TIMESTAMP
                        WHERE product_id = $7
                        RETURNING *
                    `;
        const values = [title, description, amount, image, ratings, category, productid]
        const newProducts = await pool.query(text, values)
        console.log(newProducts)
        res.status(201).json({message: 'product updated sucessfully', data: newProducts.rows})
       
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteProduct = async (req, res)=> {
    const { productid} = req.params
    
    if(!productid){
        return res.status(404).json({message:'ID is required'})
    }
    
    try{
        // const readAllFiles  =  fs.readFileSync('./data/products.json', 'utf8')
        // const parsedDataFile = JSON.parse(readAllFiles)

        // const findProduct  = parsedDataFile.find(product => product.productId === productid)
    
        // if(!findProduct){
        //     return res.status(404).json({message:'No product with such ID found'})
        // }

       
        // const data = parsedDataFile.filter(product => product.productId !== productid)

         
        // fs.writeFileSync('./data/products.json', JSON.stringify(data));

        const text = 'DELETE FROM products WHERE product_id = $1';
        const values = [productid];

       const result =  await pool.query(text, values)

        if(result.rowCount === 0){
            return res.status(404).json({message: `Product with ${productid} have been deleted!`})
        }
        res.status(204).send()
       
    }catch(error){
        res.status(500).json({message: error.message})
    }

}

module.exports = {prodcutController, getProductById, getProductsByUser, updateProuct, deleteProduct}
