import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { getProduct } = useContext(ProductContext);
    const product = getProduct(id);

    if (!product) {
        return (
            <div className="container section text-center animate-fade-in" style={{ padding: '120px 5%' }}>
                <h2 style={{ letterSpacing: '6px', marginBottom: '20px' }}>Not Found</h2>
                <p style={{ margin: '20px 0 40px', color: 'var(--color-gray)', letterSpacing: '1px' }}>The fragrance you're looking for does not exist.</p>
                <Link to="/catalog" className="btn btn-primary">Return to Catalog</Link>
            </div>
        );
    }

    const inStock = product.stock > 0;

    return (
        <div className="container section animate-fade-in">
            <Link to="/catalog" style={{
                display: 'inline-block',
                marginBottom: '40px',
                color: 'var(--color-gray)',
                fontSize: '0.68rem',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
            }}>
                &larr; Back to Catalog
            </Link>

            <div style={{ display: 'flex', gap: '70px', flexWrap: 'wrap' }}>
                {/* Image */}
                <div style={{
                    flex: '1 1 400px',
                    background: '#0d0c0a',
                    border: '1px solid rgba(201, 169, 110, 0.1)',
                    overflow: 'hidden',
                    position: 'relative',
                    minHeight: '500px',
                }}>
                    {product.stockStatus === 'Sold Out' && <span className="badge badge-sold-out">Sold Out</span>}
                    {product.stockStatus === 'Sold' && <span className="badge badge-sold">Sold</span>}
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '500px', filter: 'brightness(0.92)' }}
                    />
                </div>

                {/* Info */}
                <div style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {product.category && (
                        <p style={{
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            color: 'var(--color-gold)',
                            fontSize: '0.68rem',
                            marginBottom: '16px',
                            fontWeight: 500,
                        }}>
                            {product.category}
                        </p>
                    )}
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '5px', marginBottom: '24px' }}>
                        {product.name}
                    </h1>
                    <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)', marginBottom: '28px' }} />
                    <p style={{ fontSize: '1.6rem', marginBottom: '28px', color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', fontWeight: 300, letterSpacing: '2px' }}>
                        ₱{product.price}
                    </p>

                    <div style={{ marginBottom: '32px' }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '6px 14px',
                            fontSize: '0.62rem',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            border: `1px solid ${inStock ? 'rgba(201,169,110,0.4)' : 'rgba(255,255,255,0.15)'}`,
                            color: inStock ? 'var(--color-gold)' : 'var(--color-gray)',
                            background: inStock ? 'rgba(201,169,110,0.06)' : 'transparent',
                        }}>
                            {inStock ? 'Available' : 'Sold Out'}
                        </span>
                        {inStock && (
                            <span style={{ marginLeft: '14px', fontSize: '0.8rem', color: 'var(--color-gray)', letterSpacing: '1px' }}>
                                {product.stock} left in stock
                            </span>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {inStock ? (
                            <>
                                <Link to={`/checkout/${product.id}`} className="btn btn-primary" style={{ width: '100%', padding: '18px 0' }}>
                                    Buy Now
                                </Link>
                                <Link to="/contact" className="btn btn-secondary" style={{ width: '100%', padding: '18px 0' }}>
                                    Inquire via Email
                                </Link>
                            </>
                        ) : (
                            <>
                                <button className="btn btn-secondary" disabled style={{ width: '100%', padding: '18px 0', cursor: 'not-allowed', opacity: 0.4 }}>
                                    Sold Out
                                </button>
                                <Link to="/contact" className="btn btn-outline-gold" style={{ width: '100%', padding: '18px 0' }}>
                                    Join the Waitlist
                                </Link>
                                <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--color-gray)', letterSpacing: '1px', marginTop: '4px' }}>
                                    Be notified when this scent returns
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
