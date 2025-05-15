import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
   const navigate = useNavigate();
   useEffect(() => {
    const handleLogout = async () => {
      // (1) Appel API pour notifier la déconnexion
	try{
		const auth = JSON.parse(localStorage.getItem("auth"));
		const response = await fetch("https://offers-api.digistos.com/api/auth/logout",{
			method:"POST",
			headers:{
				"Content-Type":"application/json",
				"Authorization":`Bearer ${auth.token}`
			},
		});
		if(!response.ok){
			throw new Error("Erreur lors de la déco");
		}
	} catch (err) {
		console.error(err);
	}
      // (2) Suppression du token côté frontend
	localStorage.removeItem("auth");
      // (3) Redirection vers la page de login
    	navigate("/connexion");
    };

    handleLogout();
  }, [navigate]);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
