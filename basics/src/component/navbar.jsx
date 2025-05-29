import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#f3f3f3' }}>
      <Link to="/home" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/about" style={{ marginRight: '1rem' }}>About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;
