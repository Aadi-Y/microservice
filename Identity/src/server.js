const express = require("express");
const dotenv = require("dotenv")
dotenv.config();
const authRouter = require("./routes/authRoute");
const helmet = require("helmet");
const cors = require("cors");
const handleDatabase = require("./Database/database");


const PORT = process.env.PORT || 3001;


const app = express();
app.use(express.json());
app.use("/api/auth",authRouter);
app.use(helmet);
app.use(cors({
    origin:"*"
}))
app.listen(PORT,()=>{
    handleDatabase()
    console.log("Server running at the port : ", PORT);
})
