const express = require('express');
const User = require('../model/User');
const router = express.Router(); //mini instance/application;
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const bodyParser = require('body-parser');
const cors=require('cors')//to handle the different domains
router.post('/signUp',async (req, res)=>{
    //get all data from body
    const {name,email,password,confirmPassword}=req.body;
    //check if all data exists
    if(!(name && email && password && confirmPassword))
    {
        console.log("All Fields Are Necessary")
        return res.status(400).send("All Fields are necessary");
    }
    //check if user already exists
    const existingUser=await User.findOne({email});
    if(existingUser)
    {
        console.log("Already exists")
        return res.status(401).send("User With This Name Already Exists");
    }
    //encrypt the password
    else if(password==confirmPassword)
    {
        const myEncPassword=await bcrypt.hash(password,10);
        //save the user in database
        const user=await User.create({
            name,
            email,
            password:myEncPassword
        })
        return res.status(200).json(user);
    }
})

router.post('/login',async (req,res)=>{
    try{
        //get all the data from frontend
        const {email,password}=req.body;
        //validation
        if(!(email && password))
        {
            console.log("All Fields Are Necessary")
            return res.status(400).send("All details are necessary")
        }
        //find user in db
        const user=await User.findOne({email: email})
        //if user is not there
        if(!user)
        {
            console.log("Not exists")
            return res.status(401).send("User does not exists")
        }
        //match the password
        if(user && await bcrypt.compare(password,user.password))
        {
                const token=jwt.sign(
                {
                    id:user._id,email//payload
                },
                'shhhh',//process.env.jwtsecret (secretKey) 
                {
                    expiresIn:"2h" //extra optional 
                }
            );
            user.password = undefined;
            return res.status(200).json({
                success:true,
                token,
                user
            });
        }
        else
        {
            console.log("Password is incorrect");
            return res.status(400).send("Password is incorrect");
        }
    }
    catch{
        
    }
})

module.exports =router;