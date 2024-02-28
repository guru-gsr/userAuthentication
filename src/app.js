
import dotenv from "dotenv/config.js";
import mongoose, { connect } from "mongoose";
import express from "express";
import connectDB from "./db/db.js";
import router from "./routes/User.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";


const app=express();
app.use(express.json());

const PORT=process.env.PORT || 3000;

connectDB();

// routing middleware
app.use("/api/users",router);


// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(express.static("public"))
// app.use(cookieParser())

app.use(errorHandler);

app.listen(PORT,()=>{
    console.log("servers is started at port",PORT);
});

export {app}