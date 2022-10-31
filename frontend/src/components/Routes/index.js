import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Login from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import Navbar from '../Navbar';
import Footer from '../Footer';

class index extends Component {
    render() {
        return (
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/profil" exact element={<Profil />} />
                    <Route path="/" exact element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
        );
    }
}

export default index;