//After transferring diffrent HTTP endpoints like(GET, POST, PUT, DELETE), from the server.js file to route.js file, still the file is getting out of hand due to multiple diffrent functions of endpoints
//so to make -it more modular, we will make file called Controller for all these endpoints functions





// Importing the Express library to create and manage routes for the application
import express from 'express';

// Importing functions (controllers) for handling product-related operations
// These functions are defined in the product.controller.js file and exported for use
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/product.controller.js';

// Creating a new Express Router instance to define API endpoints for products
const router = express.Router();

// Defining a GET route to fetch all products
// When the client makes a GET request to "/", the getProducts function will handle the request
router.get("/", getProducts);

// Defining a POST route to create a new product
// When the client makes a POST request to "/", the createProduct function will handle the request
router.post("/", createProduct);

// Defining a PUT route to update an existing product
// The ":id" in the route is a dynamic parameter that represents the product's unique ID
// When the client makes a PUT request to "/:id", the updateProduct function will handle the request
router.put("/:id", updateProduct);

// Defining a DELETE route to delete an existing product
// The ":id" in the route is a dynamic parameter that represents the product's unique ID
// When the client makes a DELETE request to "/:id", the deleteProduct function will handle the request
router.delete("/:id", deleteProduct);

// Exporting the router instance so it can be used in other parts of the application
// For example, this router can be mounted on a specific path in the main server file (e.g., "/api/products")
export default router;

/*
``` 

### Detailed Explanation:

1. **`import express from 'express';`**  
   - Imports the Express library, which is used to build web applications and APIs.  
   - Express provides a powerful routing mechanism to define how HTTP requests are handled.  

2. **`import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/product.controller.js';`**  
   - Imports specific functions (also called "controllers") from the `product.controller.js` file.  
   - Each function corresponds to a specific operation (e.g., fetching, creating, updating, or deleting products).  

3. **`const router = express.Router();`**  
   - Creates an instance of the Express Router.  
   - The router is used to define endpoints for handling product-related API requests in a modular way.  

4. **`router.get("/", getProducts);`**  
   - Defines a route for the HTTP `GET` method at the root path (`"/"`).  
   - When a client sends a `GET` request to this path, the `getProducts` function will be executed.  
   - This is used to fetch and return all products from the database.  

5. **`router.post("/", createProduct);`**  
   - Defines a route for the HTTP `POST` method at the root path (`"/"`).  
   - When a client sends a `POST` request to this path, the `createProduct` function will handle the request.  
   - This is used to create and store a new product in the database.  

6. **`router.put("/:id", updateProduct);`**  
   - Defines a route for the HTTP `PUT` method with a dynamic parameter (`":id"`).  
   - The `":id"` placeholder in the URL is replaced by the actual product ID when the client makes the request.  
   - When a client sends a `PUT` request to this path, the `updateProduct` function will handle it.  
   - This is used to update an existing product's details in the database.  

7. **`router.delete("/:id", deleteProduct);`**  
   - Defines a route for the HTTP `DELETE` method with a dynamic parameter (`":id"`).  
   - When a client sends a `DELETE` request to this path, the `deleteProduct` function will handle the request.  
   - This is used to delete a specific product from the database using its ID.  

8. **`export default router;`**  
   - Exports the `router` instance so it can be imported and used in other files.  
   - Typically, this router will be imported into the main server file and mounted on a specific path, such as `"/api/products"`.  
   - This makes the endpoints available under a prefixed path (e.g., `GET /api/products`).  

This modular approach makes the codebase easier to maintain and scales well as the number of API endpoints grows. Each controller handles its own logic, and the router manages the endpoints cleanly.
*/
















/*

//we r gonna have all the endpoints in this file i.e. since intially we hv made all the endpoints in server.js file , so to make things modular , we will move all the endpoints here

//app.get("/api/products", async (req, res) => {
    //instead of app we r gonna call them router below

    //we r gonna delete "api/products" part ,because it is in server.js file, as it will get automatically prefixed from server.js file when it is called
router.get("/", async (req, res) => {

    //we r going to find all the products that is in the database

    try {

        const products = await Product.find({});//if we pass the empty object i.e. {} -> this basically means fetch all the products in the database
        res.status(200).json({success: true, data: products});
        
    }
     catch (error) {
        console.error(error.message);//console log is just for debugging purposes
        res.status(500).json({success: false, message: "Server Error"});//500 means server error, the server is not able to handle the request
        
    }
})


//to able to use req.body -> to grab the data
//we will have to use this req.body , we will have to use this configuration here

//app.get("/products",(req,res) => {})
//app.post("/products",(req,res) => {})//whenever we want to create something we will be using the post method, so that we can really send some data along with the request,we also into the function body and  make this function async so that we can use await keyword
router.post("/", async(req,res) => {
    //we r prefixing this with /api , so that we know this is the api service, similarly we will prefix the api in url in Postman

    const product = req.body;//useer will send this data
                            
    //this what we have we extracted from req.body, and we can just check for the requirements
    //! means empty or not provided , the
    if(!product.name || !product.price || !product.image){

        return res.status(400).json({success: false, message: "Please provide all fields"});//400 means bad request, the user has sent something wrong, so we return an error message to the user
    }

    //and if we have passed the if check means then user passed everything to us , so we can create a new product
    const newProduct = new Product(product)
                                         //this Product  is coming from the product.model.js file which we hv created earlier
                                         //and this "product" body which we hv got from the user, it has the (name,price and image)


    try {
        await newProduct.save();//this is going to save it to the data base
        res.status(201).json({success: true, data: newProduct});//201 means something is created


    } 
    //in the catch we could log something for the debuggging purposes
    catch (error) {

        console.error("Error in  create product", error.message);
        res.status(500).json({success: false, message: "Server Error"});//500 means something is wrong on the server side
        
    }
});
//to able to test this out without  having the front-end application, we willbe using Postman desktop app



//we will be creating diffrent endpoint
  //this will be for delete method --> to able to delete the product we should pass an id, we r gonna copy the id from mono atlas  , then , we r gonna paste it to the endpoint in the url section of postman
  //note: id is dynamic(it can be any value that user can pass), we r gonna have controller function for this i.e.async function
router.delete("/:id", async (req,res) => {

    const {id} = req.params;
    //console.log("id",id);//depending on this id we can check it in database

    try {
        
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully"});
    } 
    //if the user passes something like 123 or any random thing in the url section instead of id(and if we send that then it does not send us any response back ), then to handle that case we will use the catch method
    catch (error) {

        console.error("Error in deleting product", error.message);

        res.status(404).json({success: true, message: "Product not found"});
        
    }
})  


//Note: we will use the 'patch' method when we are updating some field on the resource
//and we use "put" method when we are updating all the fields
router.put("/:id", async (req,res) => {

    const { id  } = req.params;

    const product = req.body;

    //if we want to handle the 404 case (means lets say user just passed an id something like 123 in url of put of postman i.e. something which we don't have in the database, so we can say 404 error and we can do it i.e. handle it before try)
    if(!mongoose.Types.ObjectId.isValid(id)){ //! means id is not valid

        return res.status(404).json({success: false, message: "Product not found"});  //404 means not found, the user has sent something wrong, so we return an error message to the user

    }


    //this is going to be fields such as name , image and price whatever the user wants to update, they might want to update all at once (put) or just some of them(patch), we will be just able to update it, just using the try and catch
    try {

          //By default the object i.e  product will give or return the old document
        //await Product.findByIdAndUpdate(id, product)
          //but when we use one more object {new:true} , then it will give the updated object
          const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});

          //now we want to send the updated product in the reponse
          res.status(200).json({success: true, data: updatedProduct});

        
    } 
    catch (error) {

        //res.status(500).json({success: false, message: "Server error: " + error.message})

        res.status(500).json({success: false, message: "server error"});

        
    }
});

export default router;


*/