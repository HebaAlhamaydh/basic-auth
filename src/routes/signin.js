"use strict";
const express = require("express");

//in this line we are taking the routing functionality from express

const { Users } = require("../models/index");
const signInRouter = express.Router();
const base64 = require("base-64");
const bcrypt = require('bcrypt');
const basicAuth = require('../auth/basicAuth');

signInRouter.post("/signin", basicAuth,async (req, res) => {
        
            //Basic YWhtYWQ6YWhtYWQxMjM=
            let basicHeaderParts = req.headers.authorization.split(" ");  //basicHeaderParts = ['Basic','YWhtYWQ6YWhtYWQxMjM=']
            let encoded = basicHeaderParts[1];        //encoded = 'YWhtYWQ6YWhtYWQxMjM='
            let decoded = base64.decode(encoded);    //decoded = "username:password"
            
            // let username = decoded.split(":")[0];
            // let password = decoded.split(":")[1];
             let [username,password] = decoded.split(":");
            try {
                const user = await Users.findOne({ where: { username: username } });
                const valid = await bcrypt.compare(password, user.password);
                if (valid) {
                    res.status(200).json({
                        user
                    });
                } else {
                    res.status(500).send("wrong password");
                 }
            } catch {
                res.status(500).send("invalid user name ");
            }
        
    });
    module.exports=signInRouter;