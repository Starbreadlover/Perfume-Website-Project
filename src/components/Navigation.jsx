import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav style={{
            padding: '20px 5%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--color-light-gray)',
            backgroundColor: 'var(--color-cream)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-only" style={{ cursor: 'pointer', zIndex: 101 }}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
                
                <div style={{ display: 'flex', gap: '24px' }} className="desktop-only">
                    <Link to="/catalog" style={{ fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Shop</Link>
                    <Link to="/contact" style={{ fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</Link>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <Link to="/" style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.8rem',
                    fontWeight: 600,
                    letterSpacing: '4px',
                    color: 'var(--color-black)',
                    textTransform: 'uppercase'
                }}>
                    L & S PARFUMS
                </Link>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {/* Icons removed for simplicity */}
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'var(--color-white)',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '30px',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '2px' }}>Home</Link>
                    <Link to="/catalog" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '2px' }}>Shop</Link>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '2px' }}>Contact</Link>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
