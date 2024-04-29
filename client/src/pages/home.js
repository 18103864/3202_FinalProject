import axios from "axios";
import { useEffect, useState } from "react"
import { useGetUserID } from '../hooks/getUserId'
import { useCookies } from "react-cookie";
import { redirect } from "react-router-dom";

export const Home = () => {
    const cardBody = {
        height: '300px',
    };

    const [cookies,] = useCookies(["access_token"]);
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSaveMovies] = useState([]);
    const userID = useGetUserID();


    useEffect(() => {
        if(!localStorage.getItem("userID")){
            redirect("/login");
        }
    

        const fetchMovies = async () => {
            try {
                const response = await axios.get("http://localhost:3001/movies/");
                setMovies(response.data);
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchSavedMovies = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/movies/savedMovies/ids/${userID}`);
                setSaveMovies(response.data.savedMovies);
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchMovies();
        fetchSavedMovies();
    }, []);

    const saveMovie = async (movieID) => {
        try {
            console.log(movieID, userID)
            const response = await axios.put("http://localhost:3001/movies/",
            {
                movieID,
                userID
            }, {
                headers: {
                    authorization: cookies.access_token
                }});
            console.log(response);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    function isMovieFave(id){
        return savedMovies.includes(id)?true:false;
    }
    return (
        <div className="container">
            <h2>List of Movies</h2>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {movies.map((movie) => (
                        <div className="col" key={movie._id}>
                            <div className="card">
                                <img src={movie.movie_img_url} className="card-img-top" alt={movie.movie_name} height={200}/>
                                <div className="card-body" style={cardBody}>
                                    <h5 className="card-title">{movie.movie_name}</h5>
                                    <p className="card-text">{movie.movie_description}</p>
                                </div>
                                <div className="card-footer text-body-secondary d-flex flex-column justify-content-center">
                                    <span>Release Date: {formatDate(movie.movie_releaseDate)}</span>
                                    <div>
                                        {movie && !isMovieFave(movie._id) ? (
                                            <button 
                                                className="btn btn-info mt-3"
                                                onClick={() => saveMovie(movie._id)}
                                            >
                                                <i className="fa-regular fa-star"></i>Add to Favorites
                                            </button>
                                        ):(
                                            <button 
                                                className="btn btn-outline-info mt-3"
                                                disabled
                                            >
                                                <i className="fa-solid fa-star"></i>Favorites
                                            </button>
                                        )}
                                        
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function formatDate(dateString) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}