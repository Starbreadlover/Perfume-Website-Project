import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import { Upload, X, AlertCircle } from 'lucide-react';

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

    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            const product = getProduct(id);
            if (product) {
                setFormData({ ...product });
                setPreviewUrl(product.image);
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
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                setError('Image size too large. Please select a file under 10MB.');
                return;
            }
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            if (isEditing) {
                await updateProduct(id, formData, imageFile);
            } else {
                if (!imageFile && !formData.image) {
                    throw new Error("Please upload an image for the new product.");
                }
                await addProduct(formData, imageFile);
            }
            navigate('/admin/dashboard');
        } catch (err) {
            console.error("Save error:", err);
            setError(err.message || 'Failed to save product. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="animate-fade-in" style={{ backgroundColor: 'var(--color-white)', padding: '40px', borderRadius: 'var(--border-radius)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)' }}>{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
                <Link to="/admin/dashboard" style={{ color: 'var(--color-gray)' }}>Cancel</Link>
            </div>

            {error && (
                <div style={{ 
                    padding: '15px', 
                    backgroundColor: '#fff1f0', 
                    border: '1px solid #ffa39e', 
                    borderRadius: '4px', 
                    color: '#cf1322', 
                    marginBottom: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                        <div className="form-group">
                            <label className="form-label">Product Name</label>
                            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required disabled={saving} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Price (₱)</label>
                            <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required disabled={saving} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select className="form-control" name="category" value={formData.category} onChange={handleChange} disabled={saving}>
                                <option value="Eau de Parfum">Eau de Parfum</option>
                                <option value="Eau de Toilette">Eau de Toilette</option>
                                <option value="Extrait de Parfum">Extrait de Parfum</option>
                                <option value="Parfum">Parfum</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Stock Quantity</label>
                            <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleChange} required disabled={saving} />
                        </div>
                    </div>

                    <div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" name="description" rows="5" value={formData.description} onChange={handleChange} required disabled={saving}></textarea>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Product Image</label>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ position: 'relative' }}>
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: 'var(--border-radius)', border: '1px solid #ddd' }} />
                                    ) : (
                                        <div style={{ width: '120px', height: '120px', backgroundColor: 'var(--color-cream)', borderRadius: 'var(--border-radius)', border: '1px dashed #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ color: 'var(--color-gray)' }}>No image</span>
                                        </div>
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div className="file-upload-wrapper" style={{ 
                                        display: 'block', 
                                        textAlign: 'center', 
                                        padding: '25px', 
                                        backgroundColor: 'var(--color-cream)', 
                                        borderRadius: 'var(--border-radius)', 
                                        border: '1px dashed var(--color-gold)', 
                                        color: 'var(--color-gold)', 
                                        opacity: saving ? 0.5 : 1,
                                        cursor: 'pointer',
                                        position: 'relative'
                                    }}>
                                        <Upload size={24} style={{ display: 'block', margin: '0 auto 10px' }} />
                                        <span style={{ fontWeight: 600 }}>{saving ? 'Processing...' : 'Click to Upload Image'}</span>
                                        <p style={{ fontSize: '0.75rem', marginTop: '5px', color: 'var(--color-gray)' }}>JPG, PNG or WebP (Max 10MB)</p>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleImageUpload} 
                                            disabled={saving}
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                        />
                                    </div>
                                    {imageFile && (
                                        <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span>Ready: {imageFile.name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'right' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 40px', minWidth: '180px' }} disabled={saving}>
                        {saving ? 'Processing...' : (isEditing ? 'Save Changes' : 'Create Product')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;

