const Contact = () => {
    return (
        <div className="container section animate-fade-in">
            <div className="text-center" style={{ marginBottom: '50px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Contact Us</h1>
                <p style={{ color: 'var(--color-gray)' }}>We are here to assist you with any inquiries.</p>
            </div>

            <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ flex: '1 1 400px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>Get In Touch</h3>
                    <p style={{ color: 'var(--color-dark-gray)', marginBottom: '30px' }}>
                        Fill out the form below and one of our fragrance concierges will respond within 24 hours.
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
                            <textarea className="form-control" rows="5" placeholder="How can we help?"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                    </form>
                </div>

                <div style={{ flex: '1 1 300px', backgroundColor: 'var(--color-cream)', padding: '40px', borderRadius: 'var(--border-radius)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', fontFamily: 'var(--font-serif)' }}>Contact Information</h3>
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}>Email</h4>
                        <p style={{ color: 'var(--color-gray)' }}>concierge@lsparfums.com</p>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}>Phone</h4>
                        <p style={{ color: 'var(--color-gray)' }}>+1 (800) 123-4567</p>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}>Boutique Address</h4>
                        <p style={{ color: 'var(--color-gray)' }}>
                            123 Luxury Avenue<br />
                            New York, NY 10022<br />
                            USA
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
