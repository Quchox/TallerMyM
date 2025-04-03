import { Link } from "react-router-dom";
import "../styles/style.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/crear-perfil" className="rs-navbar-item">
        Administrativo
      </Link>
    </nav>
  );
};

export default Navbar;