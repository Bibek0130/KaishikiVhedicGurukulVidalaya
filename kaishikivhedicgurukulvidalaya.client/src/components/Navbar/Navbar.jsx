import { useState, useEffect } from "react";
import { NAV_ITEMS, SECTION_IDS } from "../../data/constants";
import { useScrollSpy } from "../../hooks/UseReveal";
import { NavLink, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';

export default function NavbarSection() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("/home");
    const [expanded, setExpanded] = useState(false);

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
                        <a href="mailto:kaushiki@vaidik.org">✉ kaushiki@vaidik.org</a>
                        <span className="topbar-sep">|</span>
                        <a href="tel:+9779851234199">☏ +977 9851234199</a>
                        <span className="topbar-sep">|</span>
                        <span>Subedi Gau, Nepal</span>
                    </div>
                    <div className="topbar-right">
                    <a href="https://www.facebook.com/ram.chandra.timalsina.630659" target="_blank" rel="noopener noreferrer"  aria-label="Facebook">Facebook</a>
                    <a href="https://wa.me/9851234199" target="_blank" rel="noopener noreferrer" aria-label="Whatsapp">Whatsapp</a>
                        {/*
                        <a href="#" aria-label="YouTube">YouTube</a>
                        <a href="#" aria-label="Instagram">Instagram</a>    
                        */ }
                    </div>
                </div>

                <div id="brandbar">
                    <div className="brand-wrap">
                        <div className="brand-om" aria-hidden="true"><NavLink className="brand-om" to="/home">ॐ</NavLink></div>
                        <div className="brand-text">
                            <div className="deva-name">कौशिकी वैदिक गुरुकुल विद्यालय</div>
                            <div className="en-name">Kaushiki Vaidik Gurukul Vidyalaya</div>
                            <div className="tagline">Sanskrit · Seva · Sadhana · Since 2001</div>
                        </div>
                    </div>
                    <NavLink to="/getInvolved" className="donate-btn">🪔 Get Involved</NavLink>
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
                                {NAV_ITEMS.map(({ href, label }) => (
                                    <Nav.Link
                                        key={href}
                                        as={NavLink}
                                        className={activeLink === href ? "active" : ""}
                                        onClick={() => {  setExpanded(false); setActiveLink(href) }}
                                        to={href}
                                    >
                                        {label}
                                    </Nav.Link>
                                ))}
                            </Nav>
                            {/*<a href="#getInvolved" className="nav-puja" onClick={() => setExpanded(false)}>*/}
                            {/*    🪔 Getting Involved*/}
                            {/*</a>*/}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        </>
    );
}