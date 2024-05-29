import axios from "axios";
import { useEffect, useState } from "react"
import { useGetUserID } from '../hooks/getUserId'

export const SavedMovies = () => {
    const cardBody = {
        height: '250px',
    };

    const [savedMovies, setSaveMovies] = useState([]);
    const [hoveredButtonId, setHoveredButtonId] = useState(null);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchSavedMovies = async () => {
            try {
                const response = await axios.get(`/movies/savedMovies/${userID}`);
                setSaveMovies(response.data);
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchSavedMovies();
    }, []);

    const handleHover = (movieId) => {
        setHoveredButtonId(movieId);
    };
    
    const handleMouseLeave = () => {
        setHoveredButtonId(null);
    };

    const remFavorites = async (id) => {
        try {
            // console.log(id);
            const response = await axios.delete(`/movies/deleteFav/${userID}/${id}`);
            if(response.data.response){
                alert(response.data.message);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <h2>List of Favorite Movies</h2>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {savedMovies.map((movie) => (
                        <div className="col" key={movie._id}>
                            <div className="card">
                                <img src={movie.movie_img_url} className="card-img-top" alt={movie.movie_name} height={200}/>
                                <div className="card-body" style={cardBody}>
                                    <h5 className="card-title">{movie.movie_name}</h5>
                                    <p className="card-text">{movie.movie_description}</p>
                                </div>
                                <div className="card-footer text-body-secondary d-flex flex-column justify-content-center">
                                    <span>Release Date: <span>{formatDate(movie.movie_releaseDate)}</span></span>
                                    <div>
                                        <button 
                                            className="btn btn-outline-info mt-3"
                                            onMouseEnter={() => handleHover(movie._id)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={() => remFavorites(movie._id)}
                                        >
                                            <i className="fa-solid fa-star"></i>{hoveredButtonId === movie._id ? "Remove from Favorites" : "Favorites"}
                                        </button>
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