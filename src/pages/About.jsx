const About = () => {
    return (
        <div className="animate-fade-in">
            <div style={{
                position: 'relative',
                height: '50vh',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'var(--color-white)',
                backgroundImage: 'url(https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 }}></div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '15px' }}>Our Story</h1>
                    <p style={{ fontSize: '1.2rem', fontWeight: 300, letterSpacing: '1px' }}>The pursuit of olfactory perfection.</p>
                </div>
            </div>

            <div className="container section" style={{ maxWidth: '800px' }}>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-dark-gray)', marginBottom: '30px', textAlign: 'center', lineHeight: '1.8', fontFamily: 'var(--font-serif)' }}>
                    Founded in 2024, L & S PARFUMS was born from a passion for rare ingredients and timeless elegance. We believe that a fragrance should not only smell exquisite but should tell a story upon the skin.
                </p>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-gray)', marginBottom: '60px', textAlign: 'center', lineHeight: '1.8' }}>
                    Every bottle of our perfume is hand-blended in small batches by master artisans, ensuring that quality and luxury are consistently met and exceeded. We meticulously select every note, from the brightest bergamot to the darkest oud, from sustainable sources around the world.
                </p>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
                    <div className="text-center">
                        <h4 style={{ color: 'var(--color-gold)', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Quality</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-gray)' }}>Only the finest, high-concentration oils used in every batch.</p>
                    </div>
                    <div className="text-center">
                        <h4 style={{ color: 'var(--color-gold)', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Ethical</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-gray)' }}>Sustainably sourced ingredients from local farmers worldwide.</p>
                    </div>
                    <div className="text-center">
                        <h4 style={{ color: 'var(--color-gold)', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Timeless</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-gray)' }}>Scents designed to transcend trends and leave a lasting legacy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
