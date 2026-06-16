import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav style={{
            padding: '0 5%',
            height: '72px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(201, 169, 110, 0.1)',
            backgroundColor: 'rgba(10, 9, 6, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            {/* Left nav */}
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flex: 1 }}>
                <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="mobile-only"
                    style={{ cursor: 'pointer', zIndex: 101, color: 'var(--color-black)' }}
                >
                    {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </div>

                <div style={{ display: 'flex', gap: '32px' }} className="desktop-only">
                    <Link to="/catalog" style={{
                        fontSize: '0.68rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '2.5px',
                        color: 'var(--color-dark-gray)',
                        transition: 'color 0.2s ease',
                    }}>Shop</Link>
                    <Link to="/about" style={{
                        fontSize: '0.68rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '2.5px',
                        color: 'var(--color-dark-gray)',
                        transition: 'color 0.2s ease',
                    }}>About</Link>
                    <Link to="/contact" style={{
                        fontSize: '0.68rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '2.5px',
                        color: 'var(--color-dark-gray)',
                        transition: 'color 0.2s ease',
                    }}>Contact</Link>
                </div>
            </div>

            {/* Center brand */}
            <div style={{ textAlign: 'center', flex: 1 }}>
                <Link to="/" style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    letterSpacing: '8px',
                    color: '#f0ebe4',
                    textTransform: 'uppercase',
                    display: 'block',
                }}>
                    L & S PARFUMS
                </Link>
            </div>

            {/* Right spacer (keeps brand centered) */}
            <div style={{ flex: 1 }} />

            {/* Mobile overlay */}
            {isMenuOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#0a0906',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '40px',
                }}>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.7rem', letterSpacing: '6px', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '10px' }}>
                        L & S Parfums
                    </p>
                    {[['/', 'Home'], ['/catalog', 'Shop'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '2rem',
                                fontWeight: 300,
                                textTransform: 'uppercase',
                                letterSpacing: '6px',
                                color: '#f0ebe4',
                            }}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navigation;
