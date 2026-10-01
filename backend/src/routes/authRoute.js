const router=require('express').Router();
const c=require('../controllers/authController');
const protect=require('../middlewares/authMiddleware');
router.post('/register',c.register);
router.get('/me',protect,c.me);
router.put('/me',protect,c.updateProfile);
module.exports=router;
