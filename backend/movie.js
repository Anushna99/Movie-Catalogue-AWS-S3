const mongoose = require('mongoose');

// Define the Movie schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  // You can add more fields here for other movie details
  // For example, you might want to include a description, release date, etc.
});

// Create a Movie model using the schema
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
