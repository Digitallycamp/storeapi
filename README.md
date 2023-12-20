# storeapi
A REST api for front-end devs to prototype, while waiting for the back-end team
# Feature
 - Only Admin can delete user
 - Only admin can GET ALL products by cretate by Users
 - User can only GET ALL the product they created
 - Only loggedin users can create a product
 - Only loggedin users can DELETE the product they created

resources
    register
        -userid
        -username
        -name
        -email
        -avater
        -password
        -role:[vendors,buyers ,admin]
    
    login
        -email or username
        - password

    users
        -userid
        -username
        -name
        -email
        -avater
        -password
        -role:[admin]
        
    users:id
    profiles
        - name
        - email
        - avater
    produts
        - productid
        - title
        - desscription
        - amount
        - image
        - ratings
        - category
        - userId

    produts:id

   

