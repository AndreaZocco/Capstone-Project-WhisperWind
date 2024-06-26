import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/Profile';
import AboutASMR from './pages/AboutASMR';
import CategoryPage from './pages/CategoryPage';
import News from './pages/News';
import PrivacyPage from './pages/PrivacyPage';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import logo from './assets/logo.png'; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about-asmr" element={<AboutASMR />} />
            <Route path="/news" element={<News />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/privacy" element={<PrivacyPage />} /> {}
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
