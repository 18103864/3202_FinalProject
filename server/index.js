import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from "dotenv";

import { userRouter } from './routes/users.js';
import { MoviesRouter } from './routes/movies.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/movies", MoviesRouter);
dotenv.config();

const PORT = process.env.WEB_APP_API_PORT;

mongoose.connect(process.env.MONGO_DB_CONNECTION)
.then(()=> {
    console.log("CONNECTED TO DATABASE");
    app.listen(PORT, () => {
        console.log(`SERVER STARTED RUNNING ON GIVEN PORT: ${PORT}`);
    })
})
.catch((err) => console.log(err))