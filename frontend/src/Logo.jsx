import './Logo.css';

const Logo = () => {
    return (
        <div className="Logo">
            <div className="left-image">
                <img src="src/assets/images/Avatar_Logo.svg" alt="Avatar Logo" style={{ width: '200px' }} />
            </div>
            <h1 style={{ fontSize: '100px', color: 'black', gridColumn: '2 / span 1', whiteSpace: 'nowrap' }}>Avatar Universe Hub</h1>
            <div className="right-image">
                <img src="src/assets/images/Legend_of_Korra_logo.png" alt="Legend of Korra Logo" style={{ width: '200px' }} />
            </div>
        </div>
    );
}

export default Logo;
