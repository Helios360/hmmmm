import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleLogout = async () => {
      try {
        
        const response = await fetch("https://offers-api.digistos.com/api/auth/logout", {
          method: "POST",
          credentials:"include",
        });
        
        if (!response.ok) {
          throw new Error("Erreur lors de la déconnexion");
        }
      } catch (err) {
        console.error(err);
      } finally {
        localStorage.removeItem("auth");
        navigate("/connexion");
      }
    };

    handleLogout();
  }, [navigate]);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;