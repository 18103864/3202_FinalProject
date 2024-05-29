import express from "express";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { MovieModel } from "../models/Movies.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req,res) => {
    try {
        const response = await MovieModel.find({});
        res.json(response);

    } catch (error) {
        console.log(error);
    }
});

router.get("/getSpecMovie/:movieID", async (req,res) => {
    const movieID = req.params.movieID;

    try {
        const response = await MovieModel.find({_id:movieID});
        res.json(response);

    } catch (error) {
        console.log(error);
    }
});

router.get("/addedMovies/:userID", async (req,res) => {
    const userID = req.params.userID;
    try {
        // res.json(userID);
        const response = await MovieModel.find({movie_addedUser: userID});
        res.json(response);

    } catch (error) {
        console.log(error);
    }
});

router.get("/savedMovies/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({savedMovies: user?.savedMovies});
    } catch (error) {
        console.log(error);
    }
})

router.get("/savedMovies/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedMovies = await MovieModel.find({
            _id: {
                $in: user.savedMovies
            },
        });

        res.json(savedMovies);
    } catch (error) {
        console.log(error);
    }
})

router.post("/", async (req, res) => {
    const movie = new MovieModel(req.body);
    try {
        const response = await movie.save();
        res.json({message: "Movie Successfully Added in the Library", response});

    } catch (error) {
        console.log(error);
    }
});

router.put("/", verifyToken, async (req,res) => {
    try {
        const movie =  await MovieModel.findById(req.body.movieID);
        const user = await UserModel.findById(req.body.userID);

        user.savedMovies.push(movie);
        await user.save();

        res.json({savedMovies: user.savedMovies});
    } catch (error) {
        console.log(error);
    }
});

router.put("/editMovie/:movieID", async (req, res) => {
    const movieID = req.params.movieID;

    try {
        const data = await MovieModel.findOneAndUpdate(
            {_id : movieID},
            {
                ...req.body
            }
        )
        res.json({data, message: "Movie Successfully Edited."})
    } catch (error) {
        console.log(error);
    }
});

router.delete("/deleteFav/:userID/:movieID", async (req, res) => {
    const movieID = req.params.movieID;
    const userID = req.params.userID;
    try {
        const response = await UserModel.updateOne(
            {_id: userID},
            {$pull: { savedMovies: movieID}}
        )

        if(response){
            res.json({movieID, userID, response, message: "Successfully removed from favorites"});
        } else{
            res.json({message: "Something went wrong! Contact Administrator"})
        }
        
    } catch (error) {
        console.log(error);
    }
})

router.delete("/delete/addedMovie/:movieID", async (req, res) => {
    const movieID = req.params.movieID;
    try {
        const response1 = await MovieModel.findByIdAndDelete({_id: movieID});
        const response2 = await UserModel.updateMany(
            {},
            {$pull: { savedMovies: movieID}}
        )

        if(response1 && response2){
            res.json({status:1, message: "Successfully removed from Main List"});
        } else{
            res.json({status: 0, message: "Something went wrong! Contact Administrator"})
        }
        
    } catch (error) {
        console.log(error);
    }
})

export { router as MoviesRouter };

