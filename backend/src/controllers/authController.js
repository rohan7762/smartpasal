const User=require('../models/User');
const admin=require('../config/firebase');
const publicUser=u=>({id:u._id,name:u.name,email:u.email,shopName:u.shopName,firebaseUid:u.firebaseUid});
exports.register=async(req,res,next)=>{try{
  const header=req.headers.authorization||'';
  if(!header.startsWith('Bearer ')) return res.status(401).json({message:'Firebase authentication required'});
  const decoded=await admin.auth().verifyIdToken(header.slice(7),true);
  const name=String(req.body.name||decoded.name||'').trim();
  const shopName=String(req.body.shopName||'SmartPasal').trim()||'SmartPasal';
  const email=String(decoded.email||'').trim().toLowerCase();
  if(name.length<2||!email) return res.status(400).json({message:'Name and authenticated email are required'});
  let user=await User.findOne({$or:[{firebaseUid:decoded.uid},{email}]});
  if(user){
    if(user.firebaseUid!==decoded.uid && user.firebaseUid) return res.status(409).json({message:'This email is already linked to another account'});
    user.firebaseUid=decoded.uid; user.name=name; user.shopName=shopName; await user.save();
  }else user=await User.create({firebaseUid:decoded.uid,name,email,shopName});
  res.status(201).json(publicUser(user));
}catch(e){if(e?.code===11000)return res.status(409).json({message:'This account is already registered'});next(e)}};
exports.me=async(req,res)=>res.json(publicUser(req.user));
exports.updateProfile=async(req,res,next)=>{try{const name=String(req.body.name||'').trim(),shopName=String(req.body.shopName||'').trim();if(name.length<2||!shopName)return res.status(400).json({message:'Name and shop name are required'});const u=await User.findByIdAndUpdate(req.user._id,{name,shopName},{new:true,runValidators:true});res.json(publicUser(u));}catch(e){next(e)}};
