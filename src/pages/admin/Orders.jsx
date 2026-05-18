import { useContext, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';

const Orders = () => {
    const { orders, ordersError, updateOrderStatus, deleteOrder } = useContext(ProductContext);
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this order? This cannot be undone.')) return;
        setDeletingId(id);
        try {
            await deleteOrder(id);
        } catch (e) {
            alert('Failed to delete order: ' + e.message);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="animate-fade-in">
            <h1 style={{ marginBottom: '30px' }}>Customer Orders</h1>
            {ordersError && (
                <div style={{ backgroundColor: '#fff1f0', border: '1px solid #f5222d', color: '#f5222d', padding: '12px 20px', borderRadius: '6px', marginBottom: '20px' }}>
                    <strong>Database error:</strong> {ordersError}
                </div>
            )}

            <div style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--border-radius)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-dark-gray)', borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '20px' }}>Date</th>
                            <th style={{ padding: '20px' }}>Customer</th>
                            <th style={{ padding: '20px' }}>Product</th>
                            <th style={{ padding: '20px' }}>Proof of Payment</th>
                            <th style={{ padding: '20px' }}>Status</th>
                            <th style={{ padding: '20px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '15px 20px', fontSize: '0.9rem' }}>
                                    {new Date(order.date).toLocaleDateString()}<br />
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-gray)' }}>
                                        {new Date(order.date).toLocaleTimeString()}
                                    </span>
                                </td>
                                <td style={{ padding: '15px 20px' }}>
                                    <strong>{order.customer.name}</strong><br />
                                    <span style={{ fontSize: '0.85rem', color: 'var(--color-gray)' }}>{order.customer.email}</span><br />
                                    <span style={{ fontSize: '0.85rem', color: 'var(--color-gray)' }}>{order.customer.address}</span>
                                </td>
                                <td style={{ padding: '15px 20px' }}>
                                    {order.product.name}<br />
                                    <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>₱{order.product.price}</span>
                                </td>
                                <td style={{ padding: '15px 20px' }}>
                                    <code style={{ backgroundColor: 'var(--color-light-gray)', padding: '4px 8px', borderRadius: '4px' }}>
                                        {order.customer.proof}
                                    </code>
                                </td>
                                <td style={{ padding: '15px 20px' }}>
                                    <select 
                                        value={order.status} 
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                        style={{
                                            padding: '6px 10px',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            border: '1px solid #ddd',
                                            cursor: 'pointer',
                                            backgroundColor: 
                                                order.status === 'Pending' ? '#fff7e6' : 
                                                order.status === 'Paid' ? '#e6f7ff' : 
                                                order.status === 'Shipped' ? '#f6ffed' : 
                                                order.status === 'Cancelled' ? '#fff1f0' : '#fff',
                                            color: 
                                                order.status === 'Pending' ? '#faad14' : 
                                                order.status === 'Paid' ? '#1890ff' : 
                                                order.status === 'Shipped' ? '#52c41a' : 
                                                order.status === 'Cancelled' ? '#f5222d' : '#000'
                                        }}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td style={{ padding: '15px 20px' }}>
                                    <button
                                        onClick={() => handleDelete(order.id)}
                                        disabled={deletingId === order.id}
                                        style={{
                                            padding: '6px 12px',
                                            backgroundColor: deletingId === order.id ? '#ccc' : '#fff1f0',
                                            color: '#f5222d',
                                            border: '1px solid #f5222d',
                                            borderRadius: '4px',
                                            cursor: deletingId === order.id ? 'not-allowed' : 'pointer',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {deletingId === order.id ? 'Deleting…' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-gray)' }}>
                        No orders yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
