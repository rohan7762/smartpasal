const mongoose=require('mongoose');
const saleSchema=new mongoose.Schema({product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},productName:{type:String,required:true},quantity:{type:Number,required:true,min:1},sellPrice:{type:Number,required:true,min:0},costPrice:{type:Number,required:true,min:0},total:{type:Number,required:true,min:0},profit:{type:Number,required:true},user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},date:{type:Date,default:Date.now}},{timestamps:true});
saleSchema.index({user:1,date:-1});
module.exports=mongoose.model('Sale',saleSchema);
