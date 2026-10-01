const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({name:{type:String,required:true,trim:true,maxlength:120},price:{type:Number,required:true,min:0},cost:{type:Number,required:true,min:0},stock:{type:Number,required:true,default:0,min:0},lowStockAt:{type:Number,default:5,min:0},user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true}},{timestamps:true});
productSchema.index({user:1,name:1});
module.exports=mongoose.model('Product',productSchema);
