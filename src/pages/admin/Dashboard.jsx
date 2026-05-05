import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import { Edit, Trash2 } from 'lucide-react';

const Dashboard = () => {
    const { products, deleteProduct, loading } = useContext(ProductContext);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px', color: 'var(--color-gray)' }}>Loading products...</div>;
    }

    return (
        <div className="animate-fade-in">

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)' }}>Products Dashboard</h1>
                <Link to="/admin/products/new" className="btn btn-primary">+ Add Product</Link>
            </div>

            <div style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--border-radius)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-dark-gray)', borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '20px' }}>Image</th>
                            <th style={{ padding: '20px' }}>Name</th>
                            <th style={{ padding: '20px' }}>Category</th>
                            <th style={{ padding: '20px' }}>Price</th>
                            <th style={{ padding: '20px' }}>Status</th>
                            <th style={{ padding: '20px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '15px 20px' }}>
                                    <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                </td>
                                <td style={{ padding: '15px 20px', fontWeight: 500 }}>{product.name}</td>
                                <td style={{ padding: '15px 20px', color: 'var(--color-gray)' }}>{product.category}</td>
                                <td style={{ padding: '15px 20px', color: 'var(--color-gold)' }}>₱{product.price}</td>
                                <td style={{ padding: '15px 20px' }}>
                                    <span style={{ 
                                        padding: '4px 8px', 
                                        borderRadius: '4px', 
                                        fontSize: '0.8rem', 
                                        fontWeight: 600,
                                        backgroundColor: product.stock > 0 ? '#e6f4ea' : '#fce8e6',
                                        color: product.stock > 0 ? '#1e7e34' : '#d93025'
                                    }}>
                                        {product.stock} In Stock
                                    </span>
                                </td>
                                <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                    <Link to={`/admin/products/${product.id}/edit`} style={{ padding: '8px', color: 'var(--color-gray)', display: 'inline-block', marginRight: '10px' }}>
                                        <Edit size={18} />
                                    </Link>
                                    <button onClick={() => handleDelete(product.id)} style={{ padding: '8px', color: '#ff4d4f', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-gray)' }}>
                        No products available.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
