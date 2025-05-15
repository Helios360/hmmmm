import { useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

const LoginPage = () => {	
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
	const [error, setError] = useState(null);
	const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
			const response = await fetch("https://offers-api.digistos.com/api/auth/login", {
			method: "POST",
			headers:{ "Content-Type":"application/json", "Accept": "application/json",},
			body:JSON.stringify(formData),
		});
		const data = await response.json();
		if (!response.ok){
			throw {
				status: response.status,
				message: data.message
			};
		}
		const auth = {
			token:data.access_token,
			expiresAt:new Date().getTime() + data.expires_in * 1000,
		}
		localStorage.setItem("auth", JSON.stringify(auth));
	    	console.log(localStorage);	
		navigate("/offres/professionnelles");
		} catch (err) {
			console.error(err);
			if (err.status ===  401){
				setError("Identifiants invalides. boowamp");
			} else {
				setError("Erreur de connexion jsp ptdr force");
			}
		}
	 console.log(formData);	   
	};

	
    // Don't forget to handle errors, both for yourself (dev) and for the client (via a Bootstrap Alert):
    //   - Show an error if credentials are invalid
    //   - Show a generic error for all other cases
    // On success, redirect to the Pro Offers page
    
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg">
            <h2 className="text-center mb-4">Se connecter</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Se connecter
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
