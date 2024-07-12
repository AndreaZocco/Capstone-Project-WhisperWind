import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/Profile';
import AdminPage from './pages/AdminPage';
import CategoryPage from './pages/CategoryPage';
import AboutASMR from './pages/AboutASMR';
import PrivacyPage from './pages/PrivacyPage';
import News from './pages/News';
import LiveEventsPage from './pages/LiveEventsPage';
import StreamingPage from './pages/StreamingPage';
import { AuthProvider } from './context/AuthContext';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/logo.png';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <CustomNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} /> {}
            <Route path="/about-asmr" element={<AboutASMR />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/news" element={<News />} />
            <Route path="/live-events" element={<LiveEventsPage />} />
            <Route path="/streaming" element={<StreamingPage />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
