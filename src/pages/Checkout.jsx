import { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';

const Checkout = () => {
    const { id } = useParams();
    const { getProduct, addOrder } = useContext(ProductContext);
    const product = getProduct(id);
    
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        proof: ''
    });

    if (!product) return <div className="container section">Product not found.</div>;

    const handleSubmit = (e) => {
        e.preventDefault();
        addOrder({
            product: {
                id: product.id,
                name: product.name,
                price: product.price
            },
            customer: formData
        });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="container section text-center animate-fade-in">
                <h1 style={{ fontFamily: 'var(--font-sans)', marginBottom: '20px' }}>Order Submitted</h1>
                <p style={{ color: 'var(--color-gray)', marginBottom: '30px' }}>
                    Thank you for your order. We will verify your payment and process your shipment shortly.
                </p>
                <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="container section animate-fade-in">
            <h1 style={{ fontFamily: 'var(--font-sans)', marginBottom: '40px', textAlign: 'center' }}>Checkout</h1>
            
            <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
                {/* Order Summary & Payment Info */}
                <div style={{ flex: '1 1 400px' }}>
                    <div style={{ backgroundColor: 'var(--color-light-gray)', padding: '30px', borderRadius: 'var(--border-radius)', marginBottom: '30px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <img src={product.image} alt={product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                            <div>
                                <h4 style={{ margin: 0 }}>{product.name}</h4>
                                <p style={{ color: 'var(--color-gold)', fontWeight: 500 }}>₱{product.price}</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '30px', border: '1px solid var(--color-light-gray)', borderRadius: 'var(--border-radius)' }}>
                        <h3 style={{ marginBottom: '20px' }}>Payment Instructions</h3>
                        <p style={{ marginBottom: '15px' }}>Please transfer the total amount to one of the following accounts:</p>
                        <div style={{ marginBottom: '15px' }}>
                            <strong>GCash:</strong><br />
                            Name: L & S PARFUMS<br />
                            Number: 0912 345 6789
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <strong>Bank Transfer:</strong><br />
                            Bank: BDO Unibank<br />
                            Account Name: L & S PARFUMS<br />
                            Account Number: 1234 5678 9012
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-gray)' }}>
                            *Please include your name in the payment notes.
                        </p>
                    </div>
                </div>

                {/* Proof of Payment Form */}
                <div style={{ flex: '1 1 400px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Upload Proof of Payment</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                required 
                                value={formData.email} 
                                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Shipping Address</label>
                            <textarea 
                                className="form-control" 
                                rows="3" 
                                required 
                                value={formData.address} 
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Proof of Payment (Reference ID or Screenshot URL)</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                placeholder="Enter Transaction Reference ID" 
                                value={formData.proof} 
                                onChange={(e) => setFormData({...formData, proof: e.target.value})} 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>
                            Submit Proof of Payment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
