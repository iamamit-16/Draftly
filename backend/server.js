import express from "express";
import cors from "cors"
import path from "path"
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";

dotenv.config();




const app = express();

const PORT = process.env.PORT || 5001
const __dirname = path.resolve() // backend source

//middleware

if(process.env.NODE_ENV!="production"){
    app.use(cors({
    origin:"http://localhost:5173"
}));
}

app.use(express.json());//this middleware will parse json body:req.body


app.use("/api/notes",notesRoutes);


if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(__dirname, "..", "frontend", "Draftly", "dist");
    
    app.use(express.static(distPath));

    app.get("/:any*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });
}


connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log("server started",PORT)
})
})


