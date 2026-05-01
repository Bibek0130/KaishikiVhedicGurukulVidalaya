//imports
import { Routes, Route, Navigate } from 'react-router-dom';
import { About, Activities, TheAshram, Believes, Resources, Founder, Contact } from '../features/home';

//page imports
import './App.css';
import MainLayout from './MainLayout/MainLayout';
import Navbar from '../components/Navbar/Navbar';
import Home from '../features/Home/Home'
import Gallery from '../features/Gallary/Gallary'
import GetInvolved from '../features/GetInvolved/GetInvolved';
export default function App() {
    return(
        <>
            <Routes>
                 
                <Route element={<MainLayout />} > 
                    <Route index element={<Navigate to="/home" />} />
                    <Route  path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                   
                    <Route path="/activities" element={<Activities />} />
                    <Route path="/believes" element={<Believes />} />
                    <Route path="/ashram" element={<TheAshram />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/founder" element={<Founder />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/getInvolved" element={<GetInvolved />} />

                </Route>
              
            </Routes>
        </>

)
}