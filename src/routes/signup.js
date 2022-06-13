"use strict";
const express = require("express");
// const base64 = require("base-64");
const bcrypt = require('bcrypt');
//in this line we are taking the routing functionality from express

const { Users } = require("../models/index");
const signUpRouter = express.Router();

signUpRouter.get('/',(req,res)=>{
  res.send("Welcome to my server!");
})
signUpRouter.post('/signup', async (req, res) => {

    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const record = await Users.create(req.body);
      res.status(201).json(record);
    } catch (e) { res.status(403).send('Error Creating User'); }
  });





  module.exports=signUpRouter;