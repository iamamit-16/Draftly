
import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"
const app = express();

dotenv.config();
app.use(express.json());


//middleware
app.use(express.json());//this middleware will parse json body:req.body
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use("/api/notes",notesRoutes);
const PORT = process.env.PORT||5050;

connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log("server started",PORT)
})
})


