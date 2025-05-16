import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // (1) Appel API pour notifier la déconnexion
        if (token) {
          await fetch('https://offers-api.digistos.com/api/auth/logout', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Accept': 'application/json'
            },
          });
        }
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      } finally {
        // (2) Suppression du token côté frontend
        dispatch(logout());
        
        // (3) Redirection vers la page de login
        navigate('/connexion');
      }
    };

    handleLogout();
  }, [dispatch, navigate, token]);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;

 