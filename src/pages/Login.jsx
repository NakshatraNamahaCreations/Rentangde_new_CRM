import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import logo from '../assets/icons/logo.png';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    if (email === 'admin@gmail.com' && password === 'admin') {
      handleLogin();
      navigate('/');
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center login-container"
      style={{
        height: '100vh',
        backgroundImage: 'url(https://cdn.pixabay.com/photo/2023/11/15/16/23/hydrangea-8390432_1280.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Row className="w-100">
        <Col md={4} className="mx-auto">
          <div className="login-box bg-white p-4 rounded shadow-lg" style={{ opacity: 0.9 }}>
            <h6 className="text-center mb-4">Welcome to Classy Captures</h6>
            <div className="text-center mb-4">
              <Image src={logo} alt="Logo" fluid style={{ width: '100px' }} />
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" style={{ marginBottom: '10px' }}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" style={{ marginBottom: '20px' }}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
