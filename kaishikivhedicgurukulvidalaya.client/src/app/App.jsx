//imports
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { About, Activities, TheAshram, Believes } from '../features/home';

//page imports
import './App.css';
import MainLayout from './MainLayout/MainLayout';

export default function App() {
    return(
        <>
            <Routes>
                 
                <Route path="/" element={<Navigate to="/home" />} /> 
                <Route path="/navbar" element={<Navbar />} />
                <Route path="/home" element={<MainLayout />} />
                <Route path="/activities" element={<Activities />} />
            </Routes>
        </>

)
}