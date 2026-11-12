//imports
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { About, Activities, TheAshram, Believes, Resources, Founder, Contact } from '../features/home';

//page imports
import './App.css';
import MainLayout from './MainLayout/MainLayout';
import Navbar from '../components/Navbar/Navbar';
import Home from '../features/Home/Home'
import Gallery from '../features/Gallary/Gallary'
import GetInvolved from '../features/GetInvolved/GetInvolved';
// ADMISSIONS DISABLED — the admission routes below are commented out, but keep these
// three imports: they pull in global stylesheets (AdmissionStyle.css sets site-wide
// .btn sizing, body and scrollbar styles), so dropping them would change other pages.
import AdmissionsPage from '../features/Admission/Admission'
import StudentForm from '../components/Forms/StudentForm';
import AdmissionForm from '../components/Forms/AdmissionForm';
import GurukulJourney from '../features/Journey/GurukulJourney'
import { useTranslation } from '../hooks/useTranslation';

// Catch-all — shown when no route matches (bad link, typo, removed page).
function NotFound() {
    const { t } = useTranslation();
    return (
        <div className="not-found section">
            <span className="not-found-mark" aria-hidden="true">ॐ</span>
            <p className="not-found-text">{t('notFound.text')}</p>
            <Link to="/home" className="not-found-link">{t('notFound.link')}</Link>
        </div>
    );
}

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
                    <Route path="/ashram" element={<GurukulJourney />} />
                    {/* RESOURCES DISABLED — uncomment to re-enable
                    <Route path="/resources" element={<Resources />} />
                    */}
                    <Route path="/founder" element={<Founder />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/getInvolved" element={<GetInvolved />} />
                    {/* ADMISSIONS DISABLED — uncomment to re-enable
                    <Route path="/admission" element={<AdmissionsPage />} />
                    */}

                    {/* test */}
                    <Route path="/gurukuljourney" element={<GurukulJourney />} />
                    {/* ADMISSIONS DISABLED — uncomment to re-enable (application forms)
                    <Route path="/studentform" element={<StudentForm />} />
                    <Route path="/admissionForm" element={<AdmissionForm />} />
                    */}

                    <Route path="*" element={<NotFound />} />
                </Route>
              
            </Routes>
        </>

)
}