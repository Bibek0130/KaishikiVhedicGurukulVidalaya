import { NavLink, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavbarSection from '../../components/Navbar/Navbar';

const MainLayout = () => {

    return (
        <>
            <NavbarSection />

            <Container fluid>
                <Outlet />
            </Container>
        </>
    )
}

export default MainLayout;
