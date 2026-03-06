import { Link } from "react-router-dom";

function Navbar() {

  const navStyle = {
    background: "#1a1a2e",
    padding: "15px 30px",
  }

  const logoStyle = {
    color: "#e94560",
    fontSize: "22px",
    fontWeight: "bold",
    textDecoration: "none"
  }

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        🎬 MovieZone
      </Link>
    </nav>
  );
}

export default Navbar;