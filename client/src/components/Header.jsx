import { Navbar, Nav, Image } from "rsuite";
import MoveDownIcon from "@rsuite/icons/MoveDown";
import CogIcon from "@rsuite/icons/legacy/Cog";
import logo from "../assets/Logo.png";
import {Link} from "react-router-dom";

const Header = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar {...props} appearance="inverse" className="shadow-sm">
      <Navbar.Brand as={Link} to="/"
      style={{ display: "flex", alignItems: "center" }}>
        <Image
          circle
          src={logo}
          alt="Logo"
          style={{
            position: "relative",
            width: "65px",
            height: "65px",
            objectFit: "contain",
          }}
        />
      </Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Menu title="Inventario">
        <Nav.Item as={Link} to="/inventario" eventKey="1">Productos y Servicios</Nav.Item>
        <Nav.Item as={Link} to="/solicitudes" eventKey="1">Solicitudes</Nav.Item>
        </Nav.Menu>
        <Nav.Item eventKey="3">Trabajadores</Nav.Item>
        <Nav.Item eventKey="4">Clientes</Nav.Item>
        <Nav.Menu title="Administrativo">
        <Nav.Item as={Link} to="/perfil-crear" eventKey="5">CrearPerfil</Nav.Item>
        </Nav.Menu>
      </Nav>
      <Nav pullRight>
        <Nav.Menu icon={<CogIcon />} title="Ajustes">
          <Nav.Item eventKey="2">
            Cerrar Sesion 
            <MoveDownIcon />
          </Nav.Item>
        </Nav.Menu>
      </Nav>
    </Navbar>
  );
};

export default Header;
