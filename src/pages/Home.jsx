import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const { products } = useContext(ProductContext);
    const featured = products.slice(0, 4);

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section style={{
                padding: '100px 5%',
                backgroundColor: 'var(--color-light-gray)',
                textAlign: 'center'
            }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '3.5rem', marginBottom: '20px' }}>
                        L & S PARFUMS
                    </h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--color-gray)' }}>
                        Premium fragrances. Simple checkout. Proof of payment required.
                    </p>
                    <Link to="/catalog" className="btn btn-primary">Shop Our Collection</Link>
                </div>
            </section>

            {/* Featured Section */}
            <section className="section container">
                <div className="text-center" style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Our Best Sellers</h2>
                    <p style={{ color: 'var(--color-gray)' }}>Select your favorite fragrance below</p>
                </div>
                <div className="grid">
                    {featured.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
                <div className="flex-center" style={{ marginTop: '50px' }}>
                    <Link to="/catalog" className="btn btn-primary">View All Fragrances</Link>
                </div>
            </section>

        </div>
    );
};

export default Home;
