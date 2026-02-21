import Note from "../model/Note.js";

export async function getAllNotes(req,res){
    try{
    const notes = await Note.find().sort({createdAt:-1});//newest one
    console.log("Notes found:", notes);
    res.status(200).json(notes)
    }
    catch(error){
        console.error("Error in getAllNotes",error);
        res.status(500).json({message:"Internal Server Error"})
    }

}

export async function getNotesById(req,res){
    try {
        const getNotesById = await Note.findById(req.params.id);
        if (!getNotesById)return res.status(404).json({message:"Note Not Found"});
        res.json(getNotesById);
    } catch (error) {
        console.error("Error in Geting Note By ID",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function createNote(req,res){
    try {
        const {title,content}=req.body;
        const newNote= new Note({title,content});
        await newNote.save();
        res.status(201).json({message:"Notes sucessfully Created"});

    } catch (error) {
        console.error("Error in createNotes controller",error);
        res.status(500).json({message:"Internal server error"});
    }

}

export async function updateNote(req,res){
    try {
        const {title,content} = req.body
        const updateNote = await Note.findByIdAndUpdate(req.params.id,{title,content});
        if(!updateNote)return res.status(404).json({message:"Note not found"},{new:true,})

        res.status(201).json({message:"Notes Update Sucessfully"});

    } catch (error) {
        console.error("Error in updateNote controller",error);
        res.status(500).json({message:"Internal server error"});

    }

}

export async function deleteNote(req,res){
    try{
    const deleteNote = await Note.findByIdAndDelete(req.params.id)
    if(!deleteNote)return res.status(404).json({message:"Note not found"})
    res.status(200).json({message:"Notes Delete Sucessfully"});
    }
    catch(error){
         console.error("Error in deleteNote controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}
