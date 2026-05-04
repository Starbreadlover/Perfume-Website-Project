import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { getProduct } = useContext(ProductContext);
    const product = getProduct(id);

    if (!product) {
        return (
            <div className="container section text-center animate-fade-in">
                <h2>Product Not Found</h2>
                <p style={{ margin: '20px 0', color: 'var(--color-gray)' }}>The fragrance you are looking for does not exist.</p>
                <Link to="/catalog" className="btn btn-primary">Return to Catalog</Link>
            </div>
        );
    }

    return (
        <div className="container section animate-fade-in">
            <Link to="/catalog" style={{ display: 'inline-block', marginBottom: '30px', color: 'var(--color-gray)' }}>
                &larr; Back to Catalog
            </Link>

            <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
                {/* Product Image */}
                <div style={{ flex: '1 1 400px', backgroundColor: 'var(--color-light-gray)', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', height: '100%' }}>
                        {product.stockStatus === 'Sold Out' && <span className="badge badge-sold-out">Sold Out</span>}
                        {product.stockStatus === 'Sold' && <span className="badge badge-sold">Sold</span>}
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>

                {/* Product Info */}
                <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-gold)', fontSize: '0.9rem', marginBottom: '10px' }}>
                        {product.category}
                    </p>
                    <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>{product.name}</h1>
                    <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>₱{product.price}</p>

                    <div style={{ marginBottom: '20px' }}>
                        <span className="badge" style={{ backgroundColor: product.stock > 0 ? '#e6f4ea' : '#fce8e6', color: product.stock > 0 ? '#1e7e34' : '#d93025', padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                            {product.stock > 0 ? 'Available' : 'Sold Out'}
                        </span>
                        {product.stock > 0 && (
                            <span style={{ marginLeft: '10px', fontSize: '0.9rem', color: 'var(--color-gray)' }}>
                                {product.stock} pieces left in stock
                            </span>
                        )}
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        {product.stock > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <Link to={`/checkout/${product.id}`} className="btn btn-primary" style={{ width: '100%', padding: '18px 0', fontSize: '1rem' }}>
                                    Buy Now (Proof of Payment)
                                </Link>
                                <Link to="/contact" className="btn btn-secondary" style={{ width: '100%', padding: '18px 0', fontSize: '1rem' }}>
                                    Inquire via Email
                                </Link>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <button className="btn btn-secondary" disabled style={{ width: '100%', padding: '18px 0', fontSize: '1rem', cursor: 'not-allowed', opacity: 0.7 }}>
                                    Sold Out
                                </button>
                                <Link to="/contact" className="btn btn-outline-gold" style={{ width: '100%', padding: '18px 0', fontSize: '1rem' }}>
                                    Join the Waitlist
                                </Link>
                            </div>
                        )}
                        {product.stock <= 0 && (
                            <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.85rem', color: 'var(--color-gray)' }}>
                                Be notified when this scent is back in stock
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
