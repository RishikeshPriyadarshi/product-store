// Importing the Mongoose library, which provides functionality for interacting with a MongoDB database
import mongoose from "mongoose";

// Importing the Product model, which represents the structure of the product data in the database
import Product from "../models/product.model.js";

// Exporting the getProducts function, which handles fetching all products from the database
export const getProducts = async (req, res) => {

    // Using a try-catch block to handle potential errors while accessing the database
    try {
        // Fetching all products from the database using the Mongoose `find` method
        // An empty object `{}` is passed to `find` to match all documents
        const products = await Product.find({});

        // Sending a successful HTTP response (status code 200) along with the fetched products in JSON format
        res.status(200).json({ success: true, data: products });
        
    } 
    // If an error occurs, it is caught in this block
    catch (error) {
        // Logging the error message to the console for debugging purposes
        console.error(error.message);

        // Sending an error response (status code 500) indicating a server error
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Exporting the createProduct function, which handles creating a new product in the database
export const createProduct = async (req, res) => {
    // Extracting product data sent by the user from the request body
    const product = req.body;

    // Checking if all required fields (name, price, image) are provided in the request
    // If any field is missing, respond with a 400 status (bad request) and an error message
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    // Creating a new instance of the Product model with the provided data
    const newProduct = new Product(product);

    // Using a try-catch block to handle potential errors while saving the product to the database
    try {
        // Saving the new product to the database using the `save` method
        await newProduct.save();

        // Sending a successful response (status code 201) along with the created product in JSON format
        res.status(201).json({ success: true, data: newProduct });
        
    } 
    // If an error occurs, it is caught in this block
    catch (error) {
        // Logging the error message to the console for debugging purposes
        console.error("Error in create product", error.message);

        // Sending an error response (status code 500) indicating a server error
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Exporting the updateProduct function, which handles updating an existing product in the database
export const updateProduct = async (req, res) => {
    // Extracting the `id` parameter from the request URL
    const { id } = req.params;

    // Extracting the updated product data from the request body
    const product = req.body;

    // Checking if the provided `id` is a valid MongoDB ObjectId
    // If the ID is invalid, respond with a 404 status (not found) and an error message
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product ID" });
    }

    // Using a try-catch block to handle potential errors while updating the product in the database
    try {
        // Finding the product by ID and updating it with the provided data
        // The `{ new: true }` option ensures the updated document is returned
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        // Sending a successful response (status code 200) along with the updated product in JSON format
        res.status(200).json({ success: true, data: updatedProduct });
        
    } 
    // If an error occurs, it is caught in this block
    catch (error) {
        // Sending an error response (status code 500) indicating a server error
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Exporting the deleteProduct function, which handles deleting a product from the database
export const deleteProduct = async (req, res) => {
    // Extracting the `id` parameter from the request URL
    const { id } = req.params;

    // Checking if the provided `id` is a valid MongoDB ObjectId
    // If the ID is invalid, respond with a 404 status (not found) and an error message
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product ID" });
    }

    // Using a try-catch block to handle potential errors while deleting the product from the database
    try {
        // Finding the product by ID and deleting it using the `findByIdAndDelete` method
        await Product.findByIdAndDelete(id);

        // Sending a successful response (status code 200) with a success message
        res.status(200).json({ success: true, message: "Product deleted successfully" });
        
    } 
    // If an error occurs, it is caught in this block
    catch (error) {
        // Logging the error message to the console for debugging purposes
        console.log("Error in deleting product", error.message);

        
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
