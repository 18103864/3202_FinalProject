import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = (token) => {
    let auth = localStorage.getItem("userID");
    // let token = Cookies.get('access_token');

    return(
        auth? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes