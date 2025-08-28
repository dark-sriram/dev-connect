const express = require('express');
const router = express.Router();
const {check,validationResult}=require('express-validator/check');
const User=require('../../models/User.js');

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Password must be at least 6 characters').isLength({min:6})
],
async (req, res) => {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const { name,email,password } = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:'User already exists'});
        }
        res.send('user page')
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;