import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function MovieList({ movies }) {


  return (
    <div>
      <h1>Movies</h1>
      <Container>
        <Row>
          {movies.map((movie) => (
            <Col key={movie._id} xs={12} md={3}>
              <Card>
                <Card.Img variant="top" src={movie.imageUrl} alt={movie.title} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MovieList;
