// Importing the Express library, which is used to create and manage a backend server
import express from 'express';

// Importing the dotenv library to load environment variables from a `.env` file into `process.env`
import dotenv from 'dotenv';

   //configuration for deployment at single port i.e 5000 , both client and server
import path from "path"


// Importing the `connectDB` function, which is responsible for establishing a connection to the MongoDB database
import { connectDB } from './config/db.js';

// Importing the routes defined in `product.route.js`, which handle all product-related API endpoints
import productRoutes from './routes/product.route.js';
 
 
// Loading environment variables from the `.env` file into the `process.env` object
dotenv.config();

// Initializing an Express application by calling the `express` function
// This `app` instance will handle all HTTP requests and responses
const app = express();

// Adding middleware to parse incoming JSON requests
// This ensures the server can interpret JSON data sent in the body of HTTP requests
app.use(express.json());

// Defining the port on which the server will run
// It checks for an environment variable `PORT`, or defaults to `5000` if the variable is not defined
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve()

// Registering a route for product-related API endpoints
// Requests starting with `/api/products` will be forwarded to the `productRoutes` handlers
app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === 'production'){
   app.use(express.static(path.join(__dirname,"/frontend/dist")))

   app.get("*",(req,res) => {
      res.sendFile(path.resolve(__dirname, "frontend","dist","index.html"))
   })
}

// Starting the server and listening for incoming requests on the defined port
app.listen(PORT, () => {

    // Connecting to the MongoDB database by calling the `connectDB` function
    connectDB();

    // Logging a message to the console indicating that the server has successfully started
    // The message includes the dynamically determined port number
    console.log("server started at http://localhost:" + PORT);
});


/*/
---

### **Line-by-Line Detailed Explanation**
1. **`import express from 'express';`**
   - Imports the Express library, which is used to create a backend server and handle routing, middleware, and HTTP requests/responses.

2. **`import dotenv from 'dotenv';`**
   - Imports the `dotenv` library to load environment variables from a `.env` file into `process.env`.

3. **`import { connectDB } from './config/db.js';`**
   - Imports the `connectDB` function, which contains the logic to connect the application to a MongoDB database.

4. **`import productRoutes from './routes/product.route.js';`**
   - Imports the product-related routes from `product.route.js`.
   - These routes define the logic for handling requests like fetching, creating, updating, or deleting products.

5. **`dotenv.config();`**
   - Loads environment variables defined in the `.env` file and makes them accessible via `process.env`.

6. **`const app = express();`**
   - Creates an instance of an Express application.
   - This `app` object will serve as the main entry point for handling incoming HTTP requests.

7. **`app.use(express.json());`**
   - Adds middleware to parse incoming JSON data in HTTP request bodies.
   - This is essential for handling POST and PUT requests where the client sends JSON payloads.

8. **`const PORT = process.env.PORT || 5000;`**
   - Defines the port number on which the server will run.
   - It first checks for the `PORT` variable in the environment (from the `.env` file).
   - If no `PORT` variable is defined, it defaults to port `5000`.

9. **`app.use("/api/products", productRoutes);`**
   - Mounts the `productRoutes` at the `/api/products` path.
   - Any requests to URLs starting with `/api/products` will be forwarded to the handlers defined in `product.route.js`.

10. **`app.listen(PORT, () => { ... });`**
    - Starts the Express server on the defined `PORT`.
    - The server begins listening for incoming requests, and the callback function is executed once the server starts.

11. **`connectDB();`**
    - Called inside the callback to establish a connection to the MongoDB database when the server starts.

12. **`console.log("server started at http://localhost:" + PORT);`**
    - Logs a message to the console to confirm that the server is running and provides the URL where it can be accessed (e.g., `http://localhost:5000`).

---

### **Functionality**
1. **Backend Server Creation:**
   - The `express` application (`app`) is responsible for handling all incoming HTTP requests and delegating them to appropriate route handlers.

2. **Environment Variable Usage:**
   - The `dotenv` library loads sensitive information like the database URI and port number from a `.env` file, improving security and configurability.

3. **API Endpoint Routing:**
   - The `/api/products` base route groups all product-related endpoints, keeping the code modular and organized.

4. **Dynamic Port Allocation:**
   - The server can use a custom port defined in the environment (`process.env.PORT`) or default to port `5000`.

5. **MongoDB Connection:**
   - The `connectDB` function ensures the server establishes a connection with the MongoDB database before handling requests.

6. **Middleware for JSON Parsing:**
   - The server can process JSON payloads sent in the request body, enabling it to handle data efficiently in POST and PUT requests.
 */




/*/

// Importing the Express library, which is used to create and manage the backend server
import express from 'express';

// Importing the dotenv library to load environment variables from a `.env` file into `process.env`
import dotenv from 'dotenv';

// Importing the `connectDB` function, which handles connecting the application to the MongoDB database
import { connectDB } from './config/db.js';

// Importing the product-related routes defined in `product.route.js`
import productRoutes from './routes/product.route.js';

// Loading environment variables from the `.env` file into the `process.env` object
dotenv.config();

// Initializing an Express application by calling the `express` function
const app = express();

// Middleware to parse incoming JSON requests
// This ensures that the server can understand and process JSON data in the request body
app.use(express.json());

// Defining a base route for all product-related endpoints
// When a request starts with "/api/products", the server delegates the handling of those routes to `productRoutes`
app.use("/api/products", productRoutes);

// Starting the server on port 5000 and passing a callback function to execute when the server starts
//here the port is hardcoded value, so instead of using this value from here we will get this value from enviroment variable:which is shown above in uncoomented code
app.listen(5000, () => {

    // Establishing a connection to the MongoDB database when the server starts
    connectDB();

    // Logging a message to the console to indicate that the server has successfully started
    console.log("server started at http://localhost:5000");
});

*/


/*/


### **Detailed Explanation of Functionality**
1. **Importing Libraries:**
   - `express`: Used to create the backend server and handle HTTP requests and responses.
   - `dotenv`: Loads environment variables from a `.env` file to `process.env`, ensuring sensitive configuration values (e.g., database URIs, API keys) are kept secure and not hardcoded.
   - `connectDB`: A custom function for connecting the application to a MongoDB database.
   - `productRoutes`: Contains the route handlers for managing product-related endpoints, making the code modular and maintainable.

2. **Environment Configuration (`dotenv.config()`):**
   - Ensures that environment variables defined in a `.env` file are accessible through `process.env`.

3. **Initializing the Express Application:**
   - `express()` creates an instance of an Express application, which will handle all incoming HTTP requests.

4. **Middleware (`app.use(express.json())`):**
   - Parses incoming JSON requests and makes the parsed data available in `req.body`.
   - Required for handling requests where the client sends JSON payloads, such as in POST or PUT requests.

5. **Defining Routes (`app.use("/api/products", productRoutes)`):**
   - This mounts the `productRoutes` under the `/api/products` path.
   - Any request starting with `/api/products` is handled by the route handlers defined in `product.route.js`.

6. **Starting the Server (`app.listen(5000, ...)`):**
   - Starts the Express server on port `5000`.
   - The callback function is executed once the server starts successfully.
   - Inside the callback:
     - `connectDB()`: Connects the application to the MongoDB database.
     - `console.log(...)`: Logs the message `server started at http://localhost:5000` to inform the developer that the server is running.

### **Key Functionalities**
- **Backend Server Creation:** 
  The Express application serves as the backend server, which listens for incoming HTTP requests and routes them to appropriate handlers.

- **Modularity:**
  - Database connection logic (`connectDB`) and route handling (`productRoutes`) are modularized for better maintainability and separation of concerns.

- **Environment Configuration:**
  - Sensitive values (e.g., database URIs) are securely loaded through the `dotenv` library.

- **RESTful API Design:**
  - Routes such as `/api/products` follow RESTful conventions, making the API intuitive and easy to use for clients.
*/






//original by me
/*/

import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
//we are importing productRoutes from the product.route.js file
import productRoutes from './routes/product.route.js';


//we are using dotenv to load environment variables from a.env file
dotenv.config();

//we are creating an express app, and we are setting up the port for the server
const app = express();


//to able to use req.body -> to grab the data
//we will have to use this req.body , we will have to use this configuration here
app.use(express.json());//so this is the midddleware that allows us to parse the req.body 
//or we can say it allows us to accept the json data in thr req.body
//Note:MIDDLE-WARE is just the function that runs before we sed back the response to the client 



//we are using app.use to use the routes from product.route.js file
app.use("/api/products",productRoutes);


//we are starting the server on port 5000
app.listen(5000, () => {

    connectDB();

    console.log("server started at http://localhost:5000");
    
})

*/