import { BrowserRouter as Router, Route, Routes, Link} from "react-router";
import { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Tikrinam ar yra token
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <Router>
      <nav>
        {!isLoggedIn && <Link to="/register">Register |</Link>}  
        {!isLoggedIn && <Link to="/login">Login </Link>} 
        {isLoggedIn && <Link to="/profile">Profile |</Link>}  
        {isLoggedIn && <Link to="/users">Users</Link>}  
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </nav>

      <Routes>
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/users" element={isLoggedIn ? <Users /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
