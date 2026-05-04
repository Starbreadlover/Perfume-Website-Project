import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'var(--color-black)',
            color: 'var(--color-white)',
            padding: '60px 5% 40px',
            marginTop: '100px'
        }}>
            <div className="grid" style={{ marginBottom: '60px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <div>
                    <h3 style={{ color: 'var(--color-white)', marginBottom: '20px', fontFamily: 'var(--font-sans)', letterSpacing: '2px', textTransform: 'uppercase' }}>L & S PARFUMS</h3>
                    <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem', maxWidth: '300px', lineHeight: '1.8' }}>
                        A modern luxury fragrance house dedicated to evoking deep memories and sophisticated style.
                    </p>
                </div>
                <div>
                    <h4 style={{ color: 'var(--color-white)', marginBottom: '20px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Shop</h4>
                    <ul style={{ listStyle: 'none', color: 'var(--color-gray)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <li><Link to="/catalog">All Fragrances</Link></li>
                        <li>Eau de Parfum</li>
                        <li>Eau de Toilette</li>
                        <li>Extrait de Parfum</li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ color: 'var(--color-white)', marginBottom: '20px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Connect With Us</h4>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'var(--color-gray)', textDecoration: 'underline' }}>Instagram</a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: 'var(--color-gray)', textDecoration: 'underline' }}>Facebook</a>
                    </div>
                    <p style={{ color: 'var(--color-gray)', fontSize: '0.8rem', marginTop: '20px' }}>
                        Send us a DM for faster transactions.
                    </p>
                </div>
            </div>
            <div style={{
                borderTop: '1px solid var(--color-dark-gray)',
                paddingTop: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                color: 'var(--color-gray)',
                fontSize: '0.8rem'
            }}>
                <p>&copy; {new Date().getFullYear()} L & S PARFUMS. All Rights Reserved.</p>
                <div style={{ display: 'flex', gap: '15px' }}>
                    {/* Footnote links removed */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
