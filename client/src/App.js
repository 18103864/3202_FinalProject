import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { Home } from './pages/home';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { CreateMovie } from './pages/createMovie';
import { SavedMovies } from './pages/savedMovies';
import { Navbar } from './components/navbar';
import { AddedMovies } from './pages/addedMovies';
import PrivateRoutes from './hooks/PrivateRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateMovie />} />
            <Route path="/saved" element={<SavedMovies />} />
            <Route path="/added" element={<AddedMovies />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
