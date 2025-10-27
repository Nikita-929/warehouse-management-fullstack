import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const About = () => {
  return (
    <Container>
      <Row>
        <Col md={8} className="mx-auto">
          <h2>About the Warehouse Management System</h2>
          <p>This system helps you manage inventory, track products, and streamline warehouse operations.</p>
          
          <Card className="mt-4">
            <Card.Header>
              <h5>System Features</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>Product management</ListGroup.Item>
                <ListGroup.Item>Inventory tracking</ListGroup.Item>
                <ListGroup.Item>Batch number tracking</ListGroup.Item>
                <ListGroup.Item>CSV export functionality</ListGroup.Item>
                <ListGroup.Item>Real-time autocomplete suggestions</ListGroup.Item>
                <ListGroup.Item>Advanced search and filtering</ListGroup.Item>
                <ListGroup.Item>Material type classification</ListGroup.Item>
                <ListGroup.Item>Responsive modern UI</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          
          <Card className="mt-4">
            <Card.Header>
              <h5>Technology Stack</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>Backend:</h6>
                  <ul>
                    <li>Java 17</li>
                    <li>Spring Boot 3.2</li>
                    <li>Spring Data JPA</li>
                    <li>MySQL Database</li>
                    <li>Spring Security</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6>Frontend:</h6>
                  <ul>
                    <li>React 18</li>
                    <li>React Router</li>
                    <li>Bootstrap 5</li>
                    <li>Axios</li>
                    <li>React Toastify</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
