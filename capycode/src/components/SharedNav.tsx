import { useNavigate } from 'react-router-dom';

export default function SharedNav() {
  const navigate = useNavigate();

  return (
    <nav className="landing-nav">
      <a href="/" className="nav-logo">CAPYCODE</a>
      <button
        className="nav-cta"
        onClick={() => { void navigate('/dashboard'); }}
      >
        Get Started
      </button>
    </nav>
  );
}
