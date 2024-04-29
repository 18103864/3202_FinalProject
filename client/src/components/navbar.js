import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/login");
    }

    return(
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand text-info" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {!cookies.access_token?(
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link active">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link active">Register</Link>
                                </li>
                            </>
                        ): null}
                        
                        {cookies.access_token?(
                            <>
                                <li className="nav-item mx-2">
                                    <Link to="/" className="nav-link active">Home</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/create" className="nav-link active">Add Movie</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/added" className="nav-link active">Added Movies</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link to="/saved" className="nav-link active">Favorites</Link>
                                </li>
                            </>
                        ): null}
                    </ul>
                    <div className="d-flex" role="search">
                        {cookies.access_token?(
                            <button className="btn btn-outline-secondary mx-2" onClick={logout}>Logout</button>
                        ): null}
                    </div>
                </div>
            </div>
        </nav>
    );
}