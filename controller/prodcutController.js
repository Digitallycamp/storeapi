const fs = require('fs');
const {uuid} = require('uuidv4')


const prodcutController = (req, res)=> {
 
    const {userId} = req.params ;
    
    
    const { 
        title,
        description,
        amount,
        image,
        ratings,
        category,
        role
        } = req.body

        if(!title || !description || !amount || !image || !ratings || !category || !role){
            res.status(404).json({message: "All fileds are required"})
            return
        }

    
    try{
        const readFile = fs.readFileSync('./data/products.json', 'utf8')
        const parsedData = JSON.parse(readFile)
        const readUser = fs.readFileSync('./data/users.json', 'utf8')
        const parsedUser = JSON.parse(readUser)
        const findUser = parsedUser.find(user => user.userId === userId)
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
                role,
                userId
               
            }

            parsedData.push(product )
            const createProduct =  fs.writeFileSync('./data/products.json', JSON.stringify(parsedData))
            res.status(201).json({
                message: "Product created succcessfully",
                createProduct
            })
    }catch(error){
        res.status(500).json({message: error.message})
    }

}





const allProductController = (req, res)=> {
    try{

        const readProducts= fs.readFileSync('./data/products.json', 'utf8')
        const parsedProduct = JSON.parse(readProducts)
        if(parsedProduct.length === 0 ){
            res.status(404).json({message: 'No products in db'})
            return
        }
        res.status(200).json({
            length: parsedProduct.length ,
            message: "Success" ,
            data: parsedProduct
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }

}


const getProductById = (req, res)=> {
    const { productid} = req.params

    if(!productid){
        return res.status(404).json({ message: "No product ID to update"})
    
    }

    const readProd = fs.readFileSync('./data/products.json', 'utf8')
    const parsedProd = JSON.parse(readProd)
    const findProd = parsedProd.find(prod => prod.productId === productid)

        if(!findProd){
            return res.status(404).json({ message: "No such product with that ID"})
        }
        
    try{

        const readProduct = fs.readFileSync('./data/products.json', 'utf8')
        const parsedProduct = JSON.parse(readProduct)
        const singleProducts = parsedProduct.find(product => product.productId === productid)
        console.log(singleProducts)

              
        res.status(200).json({message: 'success', data: singleProducts})
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }

}


const getProductsByUser = (req, res)=> {
    const { userId} = req.params;
        console.log(userId)
    if(!userId){
        return res.status(400).json({ message: "You need a user ID"})
    }

    const readUser = fs.readFileSync('./data/users.json', 'utf-8')
    const parseUser = JSON.parse(readUser)
    const findUser = parseUser.find(user => user.userId === userId)

    if(!findUser){
        return res.status(404).json({ message: "No such user!"})
    }


    try{

        const readProduct = fs.readFileSync('./data/products.json', 'utf8')
        const parsedProduct = JSON.parse(readProduct)
        const singleProducts = parsedProduct.filter(product => product.userId === userId)
        if(!singleProducts){
            return res.status(404).json({ message: "No product added by user"})
        }
        res.status(200).json({
            
            message: "success",
            data:singleProducts

        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }

}

const updateProuct = (req, res)=> {
    const {productid} = req.params
    const { 
        title,
        description,
        amount,
        image,
        ratings,
        category,
        role
        } = req.body

        
        if(!productid){
            res.status(404).json({message: "product with ID required"})
            return
        }
       

        if(!title || !description || !amount || !image || !ratings || !category || !role){
            res.status(400).json({message: "All fileds are required"})
            return
        }


    try {
        const readFile  =  fs.readFileSync('./data/products.json', 'utf8')
        const parsedData = JSON.parse(readFile)
        let data = parsedData.find(product => product.productId === productid)

   
        if(!data){
            res.status(404).json({message: "product with ID not found!!"})
            return
        }
       

         const updatedProduct = {
            ...data,
            ...req.body
        }

        const newProducts = parsedData.filter(product => product.productId !== productid)
        newProducts.push(updatedProduct)
    

        fs.writeFileSync('./data/products.json', JSON.stringify(newProducts))
        res.status(200).json({message: 'product updated sucessfully', data: newProducts})
       
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteProduct = (req, res)=> {
    const { productid} = req.params
    
    if(!productid){
        return res.status(404).json({message:'ID is required'})
    }
    
    try{
        const readAllFiles  =  fs.readFileSync('./data/products.json', 'utf8')
        const parsedDataFile = JSON.parse(readAllFiles)
        const findProduct  = parsedDataFile.find(product => product.productId === productid)
    
        if(!findProduct){
            return res.status(404).json({message:'No product with such ID found'})
        }

       
        const data = parsedDataFile.filter(product => product.productId !== productid)

         
        fs.writeFileSync('./data/products.json', JSON.stringify(data));
        res.status(204).json({message: 'product DELETED sucessfully!', data:findProduct  })
       
    }catch(error){
        res.status(500).json({message: error.message})
    }

}

module.exports = {prodcutController, allProductController, getProductById, getProductsByUser, updateProuct, deleteProduct}
