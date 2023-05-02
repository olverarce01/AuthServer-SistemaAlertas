import * as dotenv from 'dotenv'
dotenv.config()

import asyncHandler from 'express-async-handler';
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import userSchema from './schemas/User.schema.js';
import validateCreate from './validators/user.js';

const app = express();

mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB,{useNewUrlParser:true});

const User = mongoose.model('User',userSchema);

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.post('/credentials', validateCreate, asyncHandler(async function(req,res){
  const {username, password} = req.body;
  const user = await User.findOne({username: username});
  if(user){
    if(await bcrypt.compare(password, user.password)){
      res.json(generateTokenAuthServerToUser(
        {
        tokenAuthServerToUser: {
          name: user.name,
          username: user.username,
          address: user.address,
          tokenAuthServerToAPI: generateTokenAuthServerToAPI(user._id)
        }
        }
      ));
    }else{
      res.status(401).send({error: "invalid password"});  
    }
  }else{
    res.status(404).send({error: "user not found"});
  }
}));

const generateTokenAuthServerToUser = (user) =>{
  return jwt.sign({user},process.env.JWT_SECRET_AUTHSERVER_USER,{
    expiresIn:'30d'
  })
}
const generateTokenAuthServerToAPI = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET_AUTHSERVER_API,{
    expiresIn:'30d'
  })
}

const port = 3000||process.env.PORT;
app.listen(port,function(){
  console.log('AuthServer running on port '+port);
})