import React, { useState, useEffect } from 'react';
import ImageSearch from './components/BooksList';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // adjust the path as necessary

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <section>
          <Routes>
            <Route path="/" element={<Home />}/>  
            <Route path="/library" element={isUserLoggedIn ? <ImageSearch /> : <Navigate to="/login" />}/>
            <Route path="/signup" element={!isUserLoggedIn ? <Signup /> : <Navigate to="/library" />}/>
            <Route path="/login" element={!isUserLoggedIn ? <Login /> : <Navigate to="/library" />}/>
          </Routes>  
        </section>
      </div>
    </Router>
  );
}

export default App;
{/* <script async src="https://cse.google.com/cse.js?cx=628e804c6c4e74ae6"></script>
      <div class="gcse-search"></div> */}
      {/* KEY = AIzaSyA_GfjyCL8EplRD4-aZ-sv2KsvIGMaIrog */}