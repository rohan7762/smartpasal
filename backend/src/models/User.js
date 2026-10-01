const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
  firebaseUid:{type:String,required:true,unique:true,index:true,trim:true},
  name:{type:String,required:true,trim:true,minlength:2,maxlength:80},
  email:{type:String,required:true,unique:true,lowercase:true,trim:true,index:true},
  shopName:{type:String,trim:true,maxlength:100,default:'SmartPasal'}
},{timestamps:true});
module.exports=mongoose.model('User',userSchema);
