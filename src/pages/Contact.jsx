const Contact = () => {
    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div style={{
                padding: '80px 5% 60px',
                textAlign: 'center',
                borderBottom: '1px solid rgba(201, 169, 110, 0.1)',
                background: '#0d0c0a',
            }}>
                <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    color: 'var(--color-gold)',
                    letterSpacing: '2px',
                    marginBottom: '14px',
                    fontSize: '1.05rem',
                    fontWeight: 300,
                }}>
                    Get In Touch
                </p>
                <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '8px', marginBottom: '20px' }}>
                    Contact Us
                </h1>
                <div className="gold-line" />
            </div>

            <div className="container" style={{ padding: '70px 5%' }}>
                <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
                    {/* Form */}
                    <div style={{ flex: '1 1 400px' }}>
                        <p style={{ color: 'var(--color-gray)', marginBottom: '36px', fontSize: '0.88rem', lineHeight: 1.9 }}>
                            Fill out the form and one of our fragrance concierges will respond within 24 hours.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" placeholder="Your Name" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" placeholder="Your Email" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea className="form-control" rows="5" placeholder="How can we help?" />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Info panel */}
                    <div style={{
                        flex: '1 1 280px',
                        padding: '40px',
                        border: '1px solid rgba(201, 169, 110, 0.15)',
                        background: '#0d0c0a',
                        alignSelf: 'flex-start',
                    }}>
                        <h3 style={{ fontSize: '0.65rem', letterSpacing: '3px', marginBottom: '36px', fontFamily: 'var(--font-sans)', fontWeight: 500, color: 'var(--color-gold)' }}>
                            Contact Information
                        </h3>
                        {[
                            { label: 'Email', value: 'concierge@lsparfums.com' },
                            { label: 'Phone', value: '+1 (800) 123-4567' },
                            { label: 'Boutique', value: '123 Luxury Avenue\nNew York, NY 10022\nUSA' },
                        ].map(({ label, value }) => (
                            <div key={label} style={{ marginBottom: '28px' }}>
                                <p style={{ fontSize: '0.62rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-gray)', marginBottom: '8px', fontWeight: 500 }}>
                                    {label}
                                </p>
                                <p style={{ color: 'var(--color-dark-gray)', fontSize: '0.88rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                                    {value}
                                </p>
                            </div>
                        ))}
                        <div style={{ width: '100%', height: '1px', background: 'rgba(201, 169, 110, 0.12)', margin: '28px 0' }} />
                        <p style={{ color: 'var(--color-gray)', fontSize: '0.78rem', lineHeight: 1.8 }}>
                            For faster transactions, send us a DM on Instagram or Facebook.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
