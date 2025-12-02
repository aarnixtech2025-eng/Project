const mongoose=require("mongoose");

//subcategory schema
const subcategorySchema=new mongoose.Schema({

    name:{type:String,required:true},
},{timestamps:true});


//category schema

const categorySchema=new mongoose.Schema({
    name:{type:String,required:true},
    subcategories:[subcategorySchema],
},{timestamps:true});

const Category=mongoose.model("Category",categorySchema);

module.exports=Category;