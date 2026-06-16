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
                    <h3 className="card-title">{product.name}</h3>
                    <p className="card-price">₱{product.price}</p>
                </div>
                <div>
                    <span style={{
                        fontSize: '0.62rem',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontWeight: 500,
                        color: product.stock > 0 ? 'var(--color-gold)' : 'var(--color-gray)',
                    }}>
                        {product.stock > 0 ? `${product.stock} In Stock` : 'Sold Out'}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
