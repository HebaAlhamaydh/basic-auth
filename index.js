"use strict";
require('dotenv').config();
const PORT=process.env.PORT||3050;

const server=require("./src/server");

const {db}=require("./src/models/index");

db.sync().then(()=>{
    server.start(PORT);
})
.catch(console.error);
