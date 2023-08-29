import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true 
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: [true, "price must be provided"],
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image:
    {
        type: String,
        required: true,
    },
    sold:{
        type:Boolean,
        required:true,
    },
    dateOfSale:{
        type:Date,
        required:true,
    }
});

export const productModel= mongoose.model("product",productSchema);