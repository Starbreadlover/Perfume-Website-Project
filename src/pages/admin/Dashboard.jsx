import { useContext, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import { Edit, Trash2, Search, AlertCircle, Package, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const { products, deleteProduct, loading, error } = useContext(ProductContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    const filteredProducts = useMemo(() => {
        return products.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setDeletingId(id);
            try {
                await deleteProduct(id);
            } catch (err) {
                alert("Failed to delete product.");
            } finally {
                setDeletingId(null);
            }
        }
    };

    const stats = useMemo(() => {
        return {
            total: products.length,
            lowStock: products.filter(p => p.stock > 0 && p.stock < 5).length,
            outOfStock: products.filter(p => p.stock <= 0).length
        };
    }, [products]);

    if (loading) {
        return (
            <div className="flex-center" style={{ height: '60vh', flexDirection: 'column', gap: '20px' }}>
                <div className="loader"></div>
                <p style={{ color: 'var(--color-gray)' }}>Loading your inventory...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-center" style={{ height: '60vh', flexDirection: 'column', gap: '20px' }}>
                <AlertCircle size={48} color="#d93025" />
                <p style={{ color: '#d93025' }}>{error}</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary">Retry</button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            {/* Quick Stats */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
                <div style={{ backgroundColor: 'var(--color-white)', padding: '20px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-gray)', marginBottom: '10px' }}>
                        <Package size={18} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Total Products</span>
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{stats.total}</div>
                </div>
                <div style={{ backgroundColor: 'var(--color-white)', padding: '20px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#f2994a', marginBottom: '10px' }}>
                        <TrendingUp size={18} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Low Stock</span>
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{stats.lowStock}</div>
                </div>
                <div style={{ backgroundColor: 'var(--color-white)', padding: '20px', borderRadius: 'var(--border-radius)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#d93025', marginBottom: '10px' }}>
                        <AlertCircle size={18} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Out of Stock</span>
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{stats.outOfStock}</div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', gap: '20px' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', margin: 0 }}>Inventory</h1>
                
                <div style={{ display: 'flex', gap: '15px', flex: 1, justifyContent: 'flex-end' }}>
                    <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gray)' }} />
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            className="form-control"
                            style={{ paddingLeft: '40px', marginBottom: 0 }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link to="/admin/products/new" className="btn btn-primary">+ Add New</Link>
                </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--border-radius)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-dark-gray)', borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '20px' }}>Product</th>
                            <th style={{ padding: '20px' }}>Category</th>
                            <th style={{ padding: '20px' }}>Price</th>
                            <th style={{ padding: '20px' }}>Stock Status</th>
                            <th style={{ padding: '20px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id} style={{ borderBottom: '1px solid #eee', opacity: deletingId === product.id ? 0.5 : 1 }}>
                                <td style={{ padding: '15px 20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <img src={product.image} alt={product.name} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#f9f9f9' }} />
                                        <div style={{ fontWeight: 600 }}>{product.name}</div>
                                    </div>
                                </td>
                                <td style={{ padding: '15px 20px', color: 'var(--color-gray)', fontSize: '0.9rem' }}>{product.category}</td>
                                <td style={{ padding: '15px 20px', color: 'var(--color-gold)', fontWeight: 600 }}>₱{product.price}</td>
                                <td style={{ padding: '15px 20px' }}>
                                    <span style={{ 
                                        padding: '4px 10px', 
                                        borderRadius: '20px', 
                                        fontSize: '0.75rem', 
                                        fontWeight: 700,
                                        backgroundColor: product.stock <= 0 ? '#fce8e6' : (product.stock < 5 ? '#fff4e6' : '#e6f4ea'),
                                        color: product.stock <= 0 ? '#d93025' : (product.stock < 5 ? '#f2994a' : '#1e7e34')
                                    }}>
                                        {product.stock <= 0 ? 'Out of Stock' : (product.stock < 5 ? `Low Stock (${product.stock})` : `${product.stock} In Stock`)}
                                    </span>
                                </td>
                                <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                    <Link to={`/admin/products/${product.id}/edit`} style={{ padding: '8px', color: 'var(--color-gray)', display: 'inline-block', marginRight: '10px' }}>
                                        <Edit size={18} />
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(product.id)} 
                                        disabled={deletingId === product.id}
                                        style={{ padding: '8px', color: '#ff4d4f', border: 'none', background: 'transparent', cursor: 'pointer' }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProducts.length === 0 && (
                    <div style={{ padding: '60px', textAlign: 'center', color: 'var(--color-gray)' }}>
                        <Package size={40} style={{ marginBottom: '15px', opacity: 0.3 }} />
                        <p>{searchTerm ? 'No products match your search.' : 'Your inventory is empty.'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

