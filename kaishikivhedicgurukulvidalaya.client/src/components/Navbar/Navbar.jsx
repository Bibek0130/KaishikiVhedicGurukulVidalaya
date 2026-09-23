import { useState, useEffect } from "react";
import { NAV_ITEMS, contactNumber, whatsappNumber, email } from "../../data/constants";
import { NavLink, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from '../../hooks/useTranslation';
import './Navbar.css';

export default function NavbarSection() {
    const [activeLink, setActiveLink] = useState("/home");
    const [expanded, setExpanded] = useState(false);
    const { t, language, setLanguage } = useTranslation();

    // Highlight nav link on scroll
    useEffect(() => {
        const ids = NAV_ITEMS.map(l => l.href.replace("#", ""));
        const onScroll = () => {
            for (const id of [...ids].reverse()) {
                const el = document.getElementById(id);
                if (el && window.scrollY + 160 >= el.offsetTop) {
                    setActiveLink(`${id}`);
                    return;
                }
            }
            setActiveLink("home");
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [activeLink]);

    return (
        <>
                <div id="topbar">
                    <div className="topbar-left">
                    <a href={`mailto:${email}`}>✉ {email}</a>
                        <span className="topbar-sep">|</span>
                    <a href={`tel:+977${contactNumber}`}>☏ {contactNumber}</a>
                        <span className="topbar-sep">|</span>
                        <span>{t('common.addressShort')}</span>
                    </div>
                    <div className="topbar-right">
                    <a href="https://www.facebook.com/ram.chandra.timalsina.630659" target="_blank" rel="noopener noreferrer"  aria-label={t('common.facebook')}>{t('common.facebook')}</a>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label={t('common.whatsapp')}>{t('common.whatsapp')}</a>
                        <span className="topbar-sep" aria-hidden="true">|</span>
                        <div className="lang-toggle" role="group" aria-label={t('common.languageToggleLabel')}>
                            <button
                                type="button"
                                className={`lang-btn${language === 'en' ? ' active' : ''}`}
                                onClick={() => setLanguage('en')}
                                aria-pressed={language === 'en'}
                            >
                                {t('common.languageEn')}
                            </button>
                            <span className="lang-sep" aria-hidden="true">/</span>
                            <button
                                type="button"
                                className={`lang-btn${language === 'np' ? ' active' : ''}`}
                                onClick={() => setLanguage('np')}
                                aria-pressed={language === 'np'}
                            >
                                {t('common.languageNp')}
                            </button>
                        </div>
                    </div>
                </div>

                <div id="brandbar">
                    <div className="brand-wrap">
                        <NavLink className="brand-om" to="/home" aria-label="Kaushiki Vaidik Gurukul Vidyalaya — Home">
                            <span aria-hidden="true">ॐ</span>
                        </NavLink>
                        <div className="brand-text">
                            <div className="deva-name">कौशिकी वैदिक गुरुकुल विद्यालय</div>
                            <div className="en-name">Kaushiki Vaidik Gurukul School</div>
                            <div className="tagline">{t('common.tagline')}</div>
                        </div>
                </div>
                <div className="brand-actions">
                    <NavLink to="/getInvolved" className="donate-btn">🪔 {t('common.getInvolved')}</NavLink>
                    <NavLink to="/admission" className="donate-btn">{t('common.applyAdmission')}</NavLink>
                </div>

                </div>

                <Navbar
                    id="navbar"
                    expand={false }
                    className="sticky-bar"
                    expanded={expanded}
                    onToggle={setExpanded}
                    style={{ /* topbar + brandbar */ }}
                >
                    <Container fluid>
                    <Navbar.Toggle aria-controls="nav-ul" className="custom-toggler" > 
                        <span className="hamburger-icon">|||</span>
                    </Navbar.Toggle>
                        <Navbar.Collapse id="nav-ul">
                            <Nav className="ms-auto nav-ul">
                                {NAV_ITEMS.map(({ href }) => (
                                    <Nav.Link
                                        key={href}
                                        as={NavLink}
                                        className={activeLink === href ? "active" : ""}
                                        onClick={() => {  setExpanded(false); setActiveLink(href) }}
                                        to={href}
                                    >
                                        {t(`nav.${href}`)}
                                    </Nav.Link>
                                ))}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        </>
    );
}