import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import logo from "../img/logo.png";

const Root = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className="navbar-brand">
            <NavLink to="/">
              <img
                width="45"
                height="45"
                className="d-inline-block align-top"
                src={logo}
                alt="Home"
              />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/map" className="nav-link">
                Карта
              </NavLink>
              <NavLink to="/heroes" className="nav-link">
                Герои
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Root;
