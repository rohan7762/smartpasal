const mongoose=require('mongoose');
const expenseSchema=new mongoose.Schema({title:{type:String,required:true,trim:true,maxlength:120},amount:{type:Number,required:true,min:0.01},category:{type:String,trim:true,maxlength:60,default:'General'},date:{type:Date,default:Date.now},user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true}},{timestamps:true});
expenseSchema.index({user:1,date:-1});
module.exports=mongoose.model('Expense',expenseSchema);
