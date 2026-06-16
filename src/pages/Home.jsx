import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import heroBg from '../assets/hero.png';

const MARQUEE_TEXT = 'L & S PARFUMS · LUXURY FRAGRANCES · PREMIUM SCENTS · HANDCRAFTED ELEGANCE · ';

const Home = () => {
    const { products, loading } = useContext(ProductContext);

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                <div className="loader" />
                <p style={{ color: 'var(--color-gray)', fontSize: '0.72rem', letterSpacing: '4px', textTransform: 'uppercase' }}>L & S PARFUMS</p>
            </div>
        );
    }

    const featured = products.slice(0, 4);

    return (
        <div className="animate-fade-in">
            {/* Hero */}
            <section style={{
                minHeight: '92vh',
                backgroundImage: `url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(10,9,6,0.45) 0%, rgba(10,9,6,0.72) 100%)',
                }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '680px', padding: '0 5%' }}>
                    <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        fontSize: '1.05rem',
                        letterSpacing: '5px',
                        color: 'var(--color-gold)',
                        marginBottom: '28px',
                        fontWeight: 300,
                    }}>
                        Est. 2024
                    </p>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 300,
                        fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                        letterSpacing: '12px',
                        color: '#f0ebe4',
                        marginBottom: '0',
                        lineHeight: 1,
                        textTransform: 'uppercase',
                    }}>
                        L & S
                    </h1>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 300,
                        fontSize: 'clamp(1.4rem, 4vw, 2.4rem)',
                        letterSpacing: '14px',
                        color: '#f0ebe4',
                        marginBottom: '36px',
                        lineHeight: 1,
                        textTransform: 'uppercase',
                    }}>
                        Parfums
                    </h1>
                    <div style={{ width: '60px', height: '1px', background: 'var(--color-gold)', margin: '0 auto 32px' }} />
                    <p style={{
                        fontSize: '0.72rem',
                        letterSpacing: '4px',
                        color: 'rgba(240,235,228,0.6)',
                        marginBottom: '52px',
                        fontWeight: 300,
                        textTransform: 'uppercase',
                    }}>
                        Premium Fragrances · Proof of Payment
                    </p>
                    <Link to="/catalog" className="btn btn-primary">Explore Collection</Link>
                </div>
            </section>

            {/* Marquee strip */}
            <div className="marquee-strip">
                <div className="marquee-content">
                    {(MARQUEE_TEXT + MARQUEE_TEXT).split('').map((ch, i) => ch).join('')}
                    {MARQUEE_TEXT + MARQUEE_TEXT}
                </div>
            </div>

            {/* Featured */}
            <section className="section container">
                <div className="text-center" style={{ marginBottom: '64px' }}>
                    <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        color: 'var(--color-gold)',
                        letterSpacing: '2px',
                        marginBottom: '14px',
                        fontSize: '1.1rem',
                        fontWeight: 300,
                    }}>
                        Best Sellers
                    </p>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '6px', marginBottom: '20px' }}>
                        Our Signatures
                    </h2>
                    <div className="gold-line" />
                </div>
                <div className="grid">
                    {featured.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
                <div className="flex-center" style={{ marginTop: '60px' }}>
                    <Link to="/catalog" className="btn btn-primary">View All Fragrances</Link>
                </div>
            </section>

            {/* Brand strip */}
            <section style={{
                padding: '80px 5%',
                borderTop: '1px solid rgba(201,169,110,0.1)',
                textAlign: 'center',
                background: '#0d0c0a',
            }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                        color: 'var(--color-dark-gray)',
                        lineHeight: 1.7,
                        fontWeight: 300,
                        letterSpacing: '1px',
                    }}>
                        "A fragrance is the invisible part of your personality that leaves a lasting impression."
                    </p>
                    <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)', margin: '32px auto 0' }} />
                </div>
            </section>
        </div>
    );
};

export default Home;
