import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#050403',
            color: '#f0ebe4',
            padding: '70px 5% 40px',
            marginTop: '100px',
            borderTop: '1px solid rgba(201, 169, 110, 0.15)',
        }}>
            <div className="grid" style={{ marginBottom: '60px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <div>
                    <h3 style={{
                        color: '#f0ebe4',
                        marginBottom: '20px',
                        fontFamily: 'var(--font-serif)',
                        letterSpacing: '6px',
                        textTransform: 'uppercase',
                        fontSize: '1.1rem',
                        fontWeight: 400,
                    }}>L & S<br/>Parfums</h3>
                    <p style={{ color: 'var(--color-gray)', fontSize: '0.85rem', maxWidth: '260px', lineHeight: '1.9' }}>
                        A modern luxury fragrance house dedicated to evoking deep memories and sophisticated style.
                    </p>
                </div>
                <div>
                    <h4 style={{
                        color: '#f0ebe4',
                        marginBottom: '24px',
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 500,
                    }}>Shop</h4>
                    <ul style={{ listStyle: 'none', color: 'var(--color-gray)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li><Link to="/catalog" style={{ transition: 'color 0.2s' }}>All Fragrances</Link></li>
                        <li style={{ color: 'var(--color-gray)' }}>Eau de Parfum</li>
                        <li style={{ color: 'var(--color-gray)' }}>Eau de Toilette</li>
                        <li style={{ color: 'var(--color-gray)' }}>Extrait de Parfum</li>
                    </ul>
                </div>
                <div>
                    <h4 style={{
                        color: '#f0ebe4',
                        marginBottom: '24px',
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 500,
                    }}>Connect</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'var(--color-gray)', fontSize: '0.85rem' }}>Instagram</a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: 'var(--color-gray)', fontSize: '0.85rem' }}>Facebook</a>
                    </div>
                    <p style={{ color: 'var(--color-gray)', fontSize: '0.78rem', marginTop: '20px', lineHeight: 1.7 }}>
                        Send us a DM for faster transactions.
                    </p>
                </div>
            </div>

            <div style={{ width: '100%', height: '1px', background: 'rgba(201, 169, 110, 0.1)', marginBottom: '28px' }} />

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'var(--color-gray)',
                fontSize: '0.72rem',
                letterSpacing: '1px',
                flexWrap: 'wrap',
                gap: '10px',
            }}>
                <p>&copy; {new Date().getFullYear()} L & S PARFUMS. All Rights Reserved.</p>
                <p style={{ color: 'rgba(201, 169, 110, 0.5)', letterSpacing: '3px', fontSize: '0.6rem', textTransform: 'uppercase' }}>
                    Luxury Fragrances
                </p>
            </div>
        </footer>
    );
};

export default Footer;
