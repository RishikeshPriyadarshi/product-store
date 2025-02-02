import mongoose  from "mongoose";

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },

},{
    timestamps:true //this will automatically create a timestamp when the product is created or updated(createdAT, updatedAT)
});

//since we have the schema above, depending on the schema we wwill to create our product model
const Product = mongoose.model('Product', productSchema);

export default Product;//because we will be using it in the diffrent files we will have later
//once we create the Product model,we will see in databse products collection

//collection have diffrent documents

//so basically this asks the mongoose to that w should create a model or a collection called Product and this is the schema (productschema) we shold take a look, so each products should have the field we created
//and one more question is that why dont we call this products instead we r calling Product i.e. it is upper case and singular --> well mongoose will going to take a look at it and and going to convert it to something like products, so this is the thing that mongoose will handle for us, and it just want us to put the singular and Captalized version of it
