import React from "react"
import { Link } from "react-router-dom";

const Form = ({ username, setUsername, password, setPassword, label, onSubmit, linktext, link }) => {
    const formBody = {
        width: '500px',
    };

    return(
        <div className="container mt-5 px-5" style={formBody}>
            <h2>{label} Page</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="exusernameInputEmail1" className="form-label">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exusernameInputEmail1" 
                        required
                        value={username} 
                        onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        required
                        value={password} 
                        onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">{label}</button>
            </form>
            <div>
                <span>{linktext} <Link to={"/"+link}>{link.charAt(0).toUpperCase() + link.slice(1)} Now</Link></span>
            </div>
        </div>
    )
}

export default Form;