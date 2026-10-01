const admin=require('../config/firebase');
const User=require('../models/User');
module.exports=async(req,res,next)=>{
  try{
    const header=req.headers.authorization||'';
    if(!header.startsWith('Bearer ')) return res.status(401).json({message:'Authentication required'});
    const decoded=await admin.auth().verifyIdToken(header.slice(7),true);
    let user=await User.findOne({firebaseUid:decoded.uid});
    if(!user){
      const email=String(decoded.email||'').trim().toLowerCase();
      if(!email) return res.status(401).json({message:'Authenticated account has no email address'});
      // Allows a deliberate migration of an existing MongoDB shop record by matching its unique email once.
      user=await User.findOne({email});
      if(user){user.firebaseUid=decoded.uid;await user.save();}
      else return res.status(403).json({message:'SmartPasal profile not found. Please complete registration.'});
    }
    req.firebaseUser=decoded; req.user=user; next();
  }catch(e){return res.status(401).json({message:'Invalid or expired session'});}
};
