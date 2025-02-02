// Importing the Mongoose library, which is used to interact with MongoDB databases
import mongoose from "mongoose";

// Exporting a function named `connectDB` that will be used to establish a connection to the MongoDB database
export const connectDB = async () => {

    // Using a try-catch block to handle potential errors that may occur during the connection process
    try {
        // Attempting to connect to the MongoDB database using the `connect` method from Mongoose
        // The connection string is retrieved from the environment variable `MONGO_URI`
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Logging a success message to the console to indicate that the database is connected
        // `conn.connection.host` displays the host name of the connected database server
        console.log(`MONGODB connected: ${conn.connection.host}`);
        
    } 
    // Catch block to handle any errors that occur during the connection process
    catch (error) {

        // Logging the error message to the console for debugging purposes
        console.error(`Error: ${error.message}`);

        // Exiting the process with an error code `1`, which signals failure
        // This ensures the application stops running if the database connection fails
        process.exit(1);  // Process exit codes: 0 indicates success, 1 indicates failure
    }
};


/*

### **Explanation of Functionality**
1. **Purpose of `connectDB`:**
   - This function is responsible for connecting the application to a MongoDB database using the Mongoose library.

2. **Detailed Steps:**
   - **Importing Mongoose:**  
     Mongoose is imported to use its methods for connecting and interacting with the MongoDB database.
   - **Environment Variable (`process.env.MONGO_URI`):**  
     The connection string (URI) is stored in an environment variable for security reasons, preventing sensitive information from being hardcoded into the codebase.
   - **Connection Attempt:**  
     The `mongoose.connect()` method is asynchronous and returns a promise, so `await` is used to wait for the connection to complete before proceeding.
   - **Logging Connection Success:**  
     If the connection is successful, a success message with the database host is logged to the console.
   - **Error Handling:**  
     If an error occurs, the catch block logs the error message to the console and terminates the application using `process.exit(1)`.

3. **Error Management:**
   - Exiting the process when the database connection fails ensures that the application doesn't continue running without a database, which could lead to unexpected issues.

This code snippet is a critical part of initializing the backend of an application, ensuring that the database connection is established before handling any incoming requests.

 */