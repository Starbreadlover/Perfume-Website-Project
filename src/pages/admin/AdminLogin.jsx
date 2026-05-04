import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'ShrodLinus') {
            localStorage.setItem('ls_admin_token', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid password.');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-cream)'
        }}>
            <div style={{
                backgroundColor: 'var(--color-white)',
                padding: '50px',
                borderRadius: 'var(--border-radius)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>L & S Admin</h1>
                <p style={{ color: 'var(--color-gray)', marginBottom: '30px' }}>Enter password to access the portal.</p>

                {error && <div style={{ color: 'red', marginBottom: '20px', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password..."
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
