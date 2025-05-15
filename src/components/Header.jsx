import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import "../assets/styles/Header.css";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    setIsAuthenticated(!!auth?.token);
  }, []);

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">
            Accueil
          </Nav.Link>
          <Nav.Link as={NavLink} to="/offres/publiques">
            Offres Publiques
          </Nav.Link>
          {isAuthenticated && (
            <Nav.Link as={NavLink} to="/offres/professionnelles">
              Offres Professionnelles
            </Nav.Link>
          )}
          {!isAuthenticated ? (
            <>
              <Nav.Link as={NavLink} to="/inscription">
                Inscription
              </Nav.Link>
              <Nav.Link as={NavLink} to="/connexion">
                Connexion
              </Nav.Link>
            </>
          ) : (
            <Nav.Link as={NavLink} to="/deconnexion">
              Déconnexion
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header;

