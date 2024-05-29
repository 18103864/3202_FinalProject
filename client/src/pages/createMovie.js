import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/getUserId";
import { useNavigate } from "react-router-dom";

export const CreateMovie = () => {
    const navigate = useNavigate();
    const userID = useGetUserID();
    const [movie, setMovie] = useState({
        movie_name: "",
        movie_description: "",
        movie_img_url: "",
        movie_releaseDate: "",
        movie_addedUser: userID
    });
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setMovie({...movie, [name]: value});
    }
    // console.log(movie);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/movies/", movie);
            alert("Movie Successfully Added!");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label" >Movie Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="movie_name" 
                        placeholder="Input Name of Movie"
                        name="movie_name" 
                        onChange={handleChange}
                        />
                </div>
                <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label" >Movie Description:</label>
                    <textarea 
                        type="text" 
                        className="form-control" 
                        id="movie_description" 
                        placeholder="Input Description of Movie"
                        name="movie_description" 
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Movie Cover Image URL:</label>
                    <input 
                        className="form-control" 
                        id="movie_img_url" 
                        placeholder="Past URL of Movie Image"
                        name="movie_img_url" 
                        onChange={handleChange}
                        />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Movie Release Date:</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="movie_releaseDate" 
                        placeholder="Past URL of Movie Image"
                        name="movie_releaseDate" 
                        onChange={handleChange}
                        />
                </div>
                <button type="submit" className="btn btn-primary">Add Movie</button>
            </form>
        </div>
    )
}