import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
    const { products } = useContext(ProductContext);

    return (
        <div className="container section animate-fade-in">
            <div className="text-center" style={{ marginBottom: '60px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Our Collection</h1>
                <p style={{ color: 'var(--color-gray)', maxWidth: '600px', margin: '0 auto' }}>
                    Explore our full range of luxury fragrances. From light citrus notes to deep, woody undertones, find your signature scent.
                </p>
            </div>

            <div className="flex-between" style={{ marginBottom: '30px', borderBottom: '1px solid #ddd', paddingBottom: '15px' }}>
                <span style={{ color: 'var(--color-gray)' }}>Showing {products.length} Products</span>
                <select style={{
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer'
                }}>
                    <option value="featured">Sort by: Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>

            {products.length === 0 ? (
                <div className="text-center" style={{ padding: '100px 0', color: 'var(--color-gray)' }}>
                    <h3>No products found.</h3>
                </div>
            ) : (
                <div className="grid">
                    {products.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Catalog;
