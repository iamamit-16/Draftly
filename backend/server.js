
import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"
import path from "path"


dotenv.config();

const app = express();
const PORT =process.env.PORT||5001
const __dirname = path.resolve() // backend source


app.use(express.json());


//middleware
app.use(express.json());//this middleware will parse json body:req.body

if(process.env.NODE_ENV!="production"){
    app.use(cors({
    origin:"http://localhost:5173"
}));
}


app.use("/api/notes",notesRoutes);



if (process.env.NODE_ENV === "production") {
    // Ensure this path points exactly to where your Vite build is
    app.use(express.static(path.join(__dirname, "frontend", "Draftly", "dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "Draftly", "dist", "index.html"));
    });
}


connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log("server started",PORT)
})
})


