const express = require("express");
const dotenv = require("dotenv")
dotenv.config();
const logger = require("./utils/logger");

const PORT = process.env.PORT || 3001;

const app = express();

console.log(logger);


app.listen(PORT,()=>{
    console.log("Server running at the port : ", PORT);
})