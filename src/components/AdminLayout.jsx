import { useEffect } from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut, ClipboardList } from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('ls_admin_token');

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    const handleLogout = () => {
        localStorage.removeItem('ls_admin_token');
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <div className="admin-sidebar">
                <div style={{ marginBottom: '40px', padding: '0 10px' }}>
                    <h2 style={{ fontFamily: 'var(--font-serif)', color: '#f0ebe4', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '1rem', fontWeight: 400 }}>L & S Admin</h2>
                    <p style={{ color: 'var(--color-gray)', fontSize: '0.8rem' }}>Management Portal</p>
                </div>

                <nav style={{ flex: 1 }}>
                    <Link
                        to="/admin/dashboard"
                        className={`admin-nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/products/new"
                        className={`admin-nav-link ${location.pathname === '/admin/products/new' ? 'active' : ''}`}
                    >
                        <PlusCircle size={20} />
                        Add Product
                    </Link>
                    <Link
                        to="/admin/orders"
                        className={`admin-nav-link ${location.pathname === '/admin/orders' ? 'active' : ''}`}
                    >
                        <ClipboardList size={20} />
                        Orders
                    </Link>
                </nav>

                <div>
                    <button
                        onClick={handleLogout}
                        className="admin-nav-link"
                        style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="admin-main">
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
