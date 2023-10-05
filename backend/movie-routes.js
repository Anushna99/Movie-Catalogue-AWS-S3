const { v4: uuidv4 } = require('uuid');
const express = require('express');
const axios = require('axios');
const multer = require('multer'); // For handling file uploads (if needed)
const Movie = require('./movie');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3'); // AWS SDK v3

const router = express.Router();

// Create an S3 client instance
const s3 = new S3Client({
  region: 'ap-south-1', // Specify your AWS region here
  credentials: {
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// Define a storage location for uploaded files (if you want to accept file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-movie', upload.single('image'), async (req, res) => {
  const { title, imageUrl } = req.body;

  try {
    // Download the image from the provided URL
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Generate a unique key for the S3 object (you can use a library like `uuid`)
    const key = `${uuidv4()}.jpg`;

    // Upload the image to S3 using AWS SDK v3
    const uploadParams = {
      Bucket: 'images-for-mern',
      Key: key,
      Body: imageResponse.data,
      ContentType: 'image/jpeg', // Adjust based on the image type
    };

    await s3.send(new PutObjectCommand(uploadParams));

    // Store the S3 object URL in your database
    const movie = new Movie({
      title,
      imageUrl: `https://images-for-mern.s3.amazonaws.com/${key}`,
    });

    await movie.save();

    //res.status(200).json({ message: 'Movie and image uploaded successfully.' });
    res.status(200).json(movie);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;















// const { v4: uuidv4 } = require('uuid');
// const express = require('express');
// const axios = require('axios');
// const multer = require('multer'); // For handling file uploads (if needed)
// const Movie = require('./movie');

// const router = express.Router();

// const AWS = require('aws-sdk'),
//       {
//         S3
//       } = require("@aws-sdk/client-s3");

// AWS.config.update({
//   accessKeyId: 'AKIAXZSKKOH4K77QY2LB',
//   secretAccessKey: '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',
//   region:'Asia Pacific (Mumbai) ap-south-1',

// });

// const s3 = new S3();


// // Define a storage location for uploaded files (if you want to accept file uploads)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post('/upload-movie', upload.single('image'), async (req, res) => {
//   const { title, imageUrl } = req.body;

//   try {
//     // Download the image from the provided URL
//     const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

//     // Generate a unique key for the S3 object (you can use a library like `uuid`)
//     const key = `${uuidv4()}.jpg`;

//     // Upload the image to S3
//     await s3.putObject({
//       Bucket: 'images-for-mern',
//       Key: key,
//       Body: imageResponse.data,
//       ContentType: 'image/jpeg', // Adjust based on the image type
//     });

//     // Store the S3 object URL in your database
//     const movie = new Movie({
//       title,
//       imageUrl: `https://images-for-mern.s3.amazonaws.com/${key}`,
//     });

//     await movie.save();

//     res.status(200).json({ message: 'Movie and image uploaded successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;
