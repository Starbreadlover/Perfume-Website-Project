import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
    const { products, loading } = useContext(ProductContext);

    if (loading) {
        return (
            <div style={{ height: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                <div className="loader" />
                <p style={{ color: 'var(--color-gray)', fontSize: '0.68rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Discovering Scents</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            {/* Page header */}
            <div style={{
                padding: '80px 5% 60px',
                textAlign: 'center',
                borderBottom: '1px solid rgba(201, 169, 110, 0.1)',
                background: '#0d0c0a',
            }}>
                <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    color: 'var(--color-gold)',
                    letterSpacing: '2px',
                    marginBottom: '14px',
                    fontSize: '1.05rem',
                    fontWeight: 300,
                }}>
                    The Collection
                </p>
                <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '8px', marginBottom: '20px' }}>
                    Our Fragrances
                </h1>
                <div className="gold-line" />
                <p style={{ color: 'var(--color-gray)', maxWidth: '520px', margin: '24px auto 0', fontSize: '0.88rem', lineHeight: 1.8, letterSpacing: '0.5px' }}>
                    From light citrus notes to deep woody undertones — find your signature scent.
                </p>
            </div>

            <div className="container" style={{ padding: '50px 5%' }}>
                {/* Filter bar */}
                <div className="flex-between" style={{
                    marginBottom: '36px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid rgba(201, 169, 110, 0.1)',
                }}>
                    <span style={{ color: 'var(--color-gray)', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        {products.length} Products
                    </span>
                    <select style={{
                        padding: '9px 14px',
                        border: '1px solid rgba(201, 169, 110, 0.2)',
                        borderRadius: '0',
                        outline: 'none',
                        fontFamily: 'var(--font-sans)',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        background: 'var(--color-light-gray)',
                        color: 'var(--color-dark-gray)',
                    }}>
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>

                {products.length === 0 ? (
                    <div className="text-center" style={{ padding: '100px 0', color: 'var(--color-gray)' }}>
                        <h3 style={{ letterSpacing: '4px' }}>No Products Found</h3>
                    </div>
                ) : (
                    <div className="grid">
                        {products.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;
