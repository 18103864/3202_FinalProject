import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from '../hooks/getUserId';
import { UpdateModal } from "../components/updateModal";

export const AddedMovies = () => {
    const cardBody = {
        height: '300px',
    };
    const customButton = {
        fontSize: ".75rem"
    }

    const [addedMovies, setAddedMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modalMovie, setModalMovie] = useState({
        _id: "",
        movie_name: "",
        movie_description: "",
        movie_img_url: "",
        movie_releaseDate: ""
    });
    const userID = useGetUserID();

    useEffect(() => {
        const fetchAddedMovies = async () => {
            try {
                const response = await axios.get(`/movies/addedMovies/${userID}`);
                setAddedMovies(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchAddedMovies();
    }, []);

    const removeMovieFromList = async (movieID) => {
        try {
            const response = await axios.delete(`/movies/delete/addedMovie/${movieID}`);
            if(response.data.status == 1){
                alert(response.data.message);
                window.location.reload();
            } else{
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    } 

    const updateModal = (movie) => {
        setSelectedMovie(movie);
        setModalMovie({
            _id: movie._id,
            movie_name: movie.movie_name,
            movie_description: movie.movie_description,
            movie_img_url: movie.movie_img_url,
            movie_releaseDate: movie.movie_releaseDate
        });
    };

    const updateMovie = async () => {
        try {
            const response = await axios.put(`/movies/editMovie/${modalMovie._id}`,{
                movie_name: modalMovie.movie_name,
                movie_description: modalMovie.movie_description,
                movie_img_url: modalMovie.movie_img_url,
                movie_releaseDate: modalMovie.movie_releaseDate,
            })

            if(response.data.data){
                alert(response.data.message);
                window.location.reload();
            }else{
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (value, field) => {
        setModalMovie(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return (
        <>
            <div className="container">
                <h2>Movies that are added by Me</h2>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {addedMovies.map((movie) => (
                            <div className="col" key={movie._id}>
                                <div className="card">
                                    <img src={movie.movie_img_url} className="card-img-top" alt={movie.movie_name} height={200}/>
                                    <div className="card-body" style={cardBody}>
                                        <h5 className="card-title">{movie.movie_name}</h5>
                                        <p className="card-text">{movie.movie_description}</p>
                                        <div>
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-info mx-1"
                                                style={customButton}
                                                data-bs-toggle="modal" 
                                                data-bs-target="#updateModal"
                                                onClick={() => updateModal(movie)}
                                            >
                                                Update
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-danger mx-1"
                                                style={customButton}
                                                onClick={() => removeMovieFromList(movie._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-footer text-body-secondary d-flex flex-column justify-content-center">
                                        <span>Release Date: <span>{formatDate(movie.movie_releaseDate)}</span></span>  
                                    </div>                                
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <UpdateModal 
                movie={modalMovie} 
                onUpdate={updateMovie} 
                onInputChange={handleInputChange} 
            />
        </>
    )
}

function formatDate(dateString) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}
