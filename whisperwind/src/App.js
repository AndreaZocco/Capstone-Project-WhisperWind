import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomNavbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import AboutASMR from './pages/AboutASMR';
import PrivacyPage from './pages/PrivacyPage';
import News from './pages/News';
import LiveEventsPage from './pages/LiveEventsPage';
import StreamingPage from './pages/StreamingPage';
import CategoryPage from './pages/CategoryPage';
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
          <CustomNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/about-asmr" element={<AboutASMR />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/news" element={<News />} />
            <Route path="/live-events" element={<LiveEventsPage />} />
            <Route path="/streaming" element={<StreamingPage />} />  {}
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
