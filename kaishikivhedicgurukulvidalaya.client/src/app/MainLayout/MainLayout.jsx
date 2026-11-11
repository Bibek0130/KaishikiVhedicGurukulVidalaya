import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavbarSection from '../../components/Navbar/Navbar';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

const MainLayout = () => {
    const { pathname } = useLocation();

    return (
        <>
            <NavbarSection />

            <Container fluid>
                {/* A crash on one page keeps the navbar usable; moving to another page starts fresh. */}
                <ErrorBoundary resetKey={pathname}>
                    <Outlet />
                </ErrorBoundary>
            </Container>
        </>
    )
}

export default MainLayout;
