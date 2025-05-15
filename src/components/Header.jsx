import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router";
import { useEffect, useState } from "react";
import "../assets/styles/Header.css";

function Header() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const checkAuth = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const isValid = auth && new Date(auth.expiresAt) > new Date();
    setIsAuthenticated(isValid);
  };
  
  useEffect(() => {
    checkAuth();
  }, [location]); // Vérifie à chaque changement d'URL

  return (
    <Navbar bg="light">
      <Container>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">Accueil</Nav.Link>
          <Nav.Link as={NavLink} to="/offres/publiques">Offres Publiques</Nav.Link>
          
          {isAuthenticated && (
            <Nav.Link as={NavLink} to="/offres/professionnelles">Offres Professionnelles</Nav.Link>
          )}
          
          {!isAuthenticated ? (
            <>
              <Nav.Link as={NavLink} to="/inscription">Inscription</Nav.Link>
              <Nav.Link as={NavLink} to="/connexion">Connexion</Nav.Link>
            </>
          ) : (
            <Nav.Link as={NavLink} to="/deconnexion">Déconnexion</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;