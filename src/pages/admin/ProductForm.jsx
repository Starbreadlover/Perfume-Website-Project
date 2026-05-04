import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import { Upload } from 'lucide-react';

const ProductForm = () => {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    const { addProduct, updateProduct, getProduct } = useContext(ProductContext);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Eau de Parfum',
        description: '',
        stockStatus: 'Available',
        stock: 0,
        image: ''
    });

    useEffect(() => {
        if (isEditing) {
            const product = getProduct(id);
            if (product) {
                setFormData({ ...product });
            }
        }
    }, [id, getProduct, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateProduct(id, formData);
        } else {
            addProduct(formData);
        }
        navigate('/admin/dashboard');
    };

    return (
        <div className="animate-fade-in" style={{ backgroundColor: 'var(--color-white)', padding: '40px', borderRadius: 'var(--border-radius)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)' }}>{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
                <Link to="/admin/dashboard" style={{ color: 'var(--color-gray)' }}>Cancel</Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                        <div className="form-group">
                            <label className="form-label">Product Name</label>
                            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Price (₱)</label>
                            <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
                                <option value="Eau de Parfum">Eau de Parfum</option>
                                <option value="Eau de Toilette">Eau de Toilette</option>
                                <option value="Extrait de Parfum">Extrait de Parfum</option>
                                <option value="Parfum">Parfum</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Stock Quantity</label>
                            <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleChange} required />
                        </div>
                    </div>

                    <div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" name="description" rows="5" value={formData.description} onChange={handleChange} required></textarea>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Image</label>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                {formData.image ? (
                                    <img src={formData.image} alt="Preview" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: 'var(--border-radius)', border: '1px solid #ddd' }} />
                                ) : (
                                    <div style={{ width: '120px', height: '120px', backgroundColor: 'var(--color-cream)', borderRadius: 'var(--border-radius)', border: '1px dashed #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ color: 'var(--color-gray)' }}>No image</span>
                                    </div>
                                )}
                                <div style={{ flex: 1 }}>
                                    <input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL (or upload below)" style={{ marginBottom: '10px' }} />
                                    <div className="file-upload-wrapper" style={{ display: 'block', textAlign: 'center', padding: '10px', backgroundColor: 'var(--color-cream)', borderRadius: 'var(--border-radius)', border: '1px dashed var(--color-gold)', color: 'var(--color-gold)' }}>
                                        <Upload size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                        <span>Upload Image</span>
                                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'right' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 40px' }}>
                        {isEditing ? 'Save Changes' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
