import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { MoviesRouter } from './routes/movies.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/movies", MoviesRouter);

mongoose.connect(
    "mongodb+srv://18103694:finalproject@movielibrary.m89pnzs.mongodb.net/MovieLibrary?retryWrites=true&w=majority&appName=MovieLibrary"
).then(()=> {
    console.log("CONNECTED TO DATABASE");
    app.listen(3001, () => {
        console.log(`SERVER STARTED RUNNING ON GIVEN PORT`);
    })
})
.catch((err) => console.log(err))