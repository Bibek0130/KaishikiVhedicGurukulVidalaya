import { NavLink, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavbarSection from '../../components/Navbar/Navbar';

const MainLayout = () => {

    return (
        <>
            <NavbarSection />

            <Container style={scrollable}>
                <Outlet />
            </Container>
        </>
    )
}

export default MainLayout;

const scrollable = {
    position: "sticky",
    zIndex: 100
}