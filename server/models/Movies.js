import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    movie_name: {
        type: String,
        required: true,
    },
    movie_description:{
        type: String, 
        require: true
    },
    movie_img_url:{
        type: String, 
        require: true
    },
    movie_releaseDate:{
        type: Date, 
        require: true
    },
    movie_addedUser:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users",
        require: true
    },
});

export const MovieModel = mongoose.model("movies", MovieSchema);