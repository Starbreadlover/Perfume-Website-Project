import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

const MainLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navigation />
            <main style={{ flexGrow: 1 }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
