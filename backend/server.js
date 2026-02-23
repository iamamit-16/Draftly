import express from "express";
import cors from "cors"
import path from "path"
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./config/db.js";

dotenv.config();




const app = express(); 


const PORT = process.env.PORT || 5001
const __dirname = path.resolve() // backend source



if(process.env.NODE_ENV!="production"){
    app.use(cors({
    origin:"http://localhost:5175"
}));
}

app.use(express.json());//this middleware will parse json body:req.body


app.use("/api/notes",notesRoutes);
app.use("/api/auth", authRoutes)

if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(__dirname, "..", "frontend", "Draftly", "dist");
    
    app.use(express.static(distPath));

    app.get("/{*splat}", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });
}


connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log("server started",PORT)
})
})


