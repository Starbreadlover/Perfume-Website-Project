import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ProductProvider } from './contexts/ProductContext.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '60px auto' }}>
          <h2 style={{ color: '#d93025' }}>Something went wrong</h2>
          <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '6px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '0.85rem' }}>
            {this.state.error.message}
          </pre>
          <p style={{ color: '#555', marginTop: '16px' }}>
            Check that <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> are set in your <code>.env</code> file and in your deployment environment variables.
          </p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '16px', padding: '8px 20px', cursor: 'pointer' }}>
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ProductProvider>
          <App />
        </ProductProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
