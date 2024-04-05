import './Logo.css';
// logo
const Logo = () => {
    return (
        <div className="Logo">
            <div className="left-image">
                <img src="src/assets/images/Avatar_Logo.svg" alt="Avatar Logo" style={{ width: '150px' }} />
            </div>
            <h1 className="avatar-3d-text" style={{ fontSize: '100px', gridColumn: '2 / span 1', whiteSpace: 'nowrap' }}>Avatar Universe Hub</h1>
            <div className="right-image">
                <img src="src/assets/images/Legend_of_Korra_logo.png" alt="Legend of Korra Logo" style={{ width: '150px' }} />
            </div>
        </div>
    );
}

export default Logo;
