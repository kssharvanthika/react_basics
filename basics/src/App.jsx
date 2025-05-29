import { Routes, Route, Navigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import Login from './pages/login';
import Navbar from './component/navbar';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import ContactList from './pages/ContactList';
//function App() {
  // return (
  //   <>
  //     <Navbar />
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/about" element={<About />} />
  //       <Route path="/contact" element={<Contact />} /> {/* New route */}
  //     </Routes>
  //   </>
  // );
//}



import ProtectedRoute from './component/protectedroute';

 function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulate session check (optional)
  // useEffect(() => {
  //   const saved = localStorage.getItem('auth');
  //   if (saved === 'true') setIsLoggedIn(true);
  // }, []);

  return (
    <>
    {
      !isLoggedIn?<Navigate to='/'/>:<Navbar/>
    } 
    <Routes>
      <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route
        path="/home"
        element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home /></ProtectedRoute>}
      />
      <Route
        path="/about"
        element={<ProtectedRoute isLoggedIn={isLoggedIn}><About /></ProtectedRoute>}
      />
      <Route
        path="/contact"
        element={<ProtectedRoute isLoggedIn={isLoggedIn}><Contact /></ProtectedRoute>}
      />
      <Route
        path="/"
        element={<ProtectedRoute isLoggedIn={isLoggedIn}><Login/></ProtectedRoute>}
      />
     

<Route path="/contact-list" element={<ContactList />} />

      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
    </>
  );
}


export default App;
