export const UpdateModal = ({ movie, onUpdate, onInputChange }) => {
    return (
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Modal</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label" >Movie Name:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="movie_name" 
                                placeholder="Input Name of Movie"
                                name="movie_name" 
                                value={movie.movie_name}
                                onChange={(e) => onInputChange(e.target.value, "movie_name")}
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
                                value={movie.movie_description}
                                onChange={(e) => onInputChange(e.target.value, "movie_description")}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Movie Cover Image URL:</label>
                            <input 
                                className="form-control" 
                                id="movie_img_url" 
                                placeholder="Past URL of Movie Image"
                                name="movie_img_url" 
                                value={movie.movie_img_url}
                                onChange={(e) => onInputChange(e.target.value, "movie_img_url")}
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
                                value={movie.movie_releaseDate}
                                onChange={(e) => onInputChange(e.target.value, "movie_releaseDate")}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" onClick={onUpdate}>Update Movie</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
