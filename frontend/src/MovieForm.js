import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function MovieForm({ onMovieSubmit }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response=await axios.post('http://localhost:5000/api/upload-movie', { title, imageUrl });
      const newMovie = response.data; // Assuming the API returns the newly added movie data
      onMovieSubmit(newMovie); 
      // Handle success (e.g., show a success message)
    } catch (err) {
      setError('An error occurred while submitting the form.');
    } finally {
      setLoading(false);
      setTitle('');
      setImageUrl('');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={8} md={6}>
          <Card>
            <Card.Header as="h5">Movie Form</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="movieTitle">
                  <Form.Label>Movie Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Movie Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="imageUrl">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </Form.Group>

                {error && <div className="text-danger">{error}</div>}

                <div className="mt-3">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieForm;
