import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    setIsAuthenticated(!!auth?.token && new Date(auth.expiresAt) > new Date());
  };

  useEffect(() => {
    checkAuth();
    
    const handleAuthChange = () => {
      checkAuth();
    };
    
    window.addEventListener("authChange", handleAuthChange);
    
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <main>
        <Container className="my-3">
          <Outlet context={{ checkAuth }} />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
