import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className="card">
            <div className="card-img-container">
                {product.stockStatus === 'Sold Out' && <span className="badge badge-sold-out">Sold Out</span>}
                {product.stockStatus === 'Sold' && <span className="badge badge-sold">Sold</span>}
                <img src={product.image} alt={product.name} className="card-img" loading="lazy" />

            </div>
            <div className="card-content">
                <div>
                    <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{product.name}</h3>
                    <p className="card-price" style={{ color: 'var(--color-black)' }}>
                        ₱{product.price}
                    </p>
                </div>
                <div style={{ marginTop: '12px' }}>
                    <span style={{ 
                        fontSize: '0.75rem', 
                        textTransform: 'uppercase', 
                        letterSpacing: '1px', 
                        fontWeight: 600,
                        color: 'var(--color-gold)'
                    }}>
                        {product.stock > 0 ? `On Stock: ${product.stock} Left` : 'Sold Out'}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
