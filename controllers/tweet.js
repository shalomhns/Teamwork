const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();
const queries = require('./queries');

// set your env variable CLOUDINARY_URL or set the following configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Get Routes

exports.getPosts = (request, response) => {
  db.query('SELECT * FROM tweets ORDER BY createdOn DESC', (error, results) => {
    if (error) {
      response.status(400).json({
        status: 'error',
        error
      });
    }
    response.status(201).json({
      status: 'success',
      data: {
        message: 'All posts returned successfully',
        posts: results.rows
      }
    });
  });
};

exports.getPostById = (request, response) => {
  // eslint-disable-next-line radix
  const id = parseInt(request.params.id);
  db.query('SELECT * FROM tweets WHERE postId = $1', [id], (error, results) => {
    if (error) {
      response.status(400).json({
        status: 'error',
        error
      });
    }
    const { title, article, imageUrl, createdon } = results.rows[0];
    db.query('SELECT * FROM comments WHERE tweetID = $1', [id], (err, res) => {
      if (err) {
        throw err;
      }
      response.status(200).json({
        status: 'success',
        data: {
          id,
          title,
          article,
          imageUrl,
          createdon,
          comments: res.rows
        }
      });
    });
  });
};

exports.getPostsWithAtag = (request, response) => {
  db.query(
    'SELECT * FROM tweets WHERE tag = $1 ORDER BY createdOn DESC',
    [request.params.tag],
    (error, results) => {
      if (error) {
        response.status(400).json({
          status: 'error',
          error
        });
      }
      response.status(201).json({
        status: 'success',
        data: {
          message: `${request.params.tag} posts returned successfully`,
          posts: results.rows
        }
      });
    }
  );
};

exports.getAllTags = (request, response) => {
  db.query('SELECT DISTINCT tag FROM tweets', (error, results) => {
    if (error) {
      response.status(400).json({
        status: 'error',
        error
      });
    }
    response.status(201).json({
      status: 'success',
      data: {
        message: `All unique tags returned successfully`,
        tags: results.rows
      }
    });
  });
};

// Post Routes

exports.createArticle = (request, response) => {
  const { title, article, authorId, tag } = request.body;

  db.query(
    'INSERT INTO tweets (title, article, authorId, tag) VALUES ($1, $2, $3, $4) RETURNING tweetID',
    [title, article, authorId, tag],
    (error, results) => {
      if (error) {
        response.status(400).json({
          status: 'error',
          error
        });
      }
      response.status(201).json({
        status: 'success',
        data: {
          message: 'Article Created Successfully',
          articleId: results.rows[0].tweetID,
          title,
          article,
          authorId,
          tag
          
        }
      });
    }
  );
};

exports.createGif = (request, response) => {
  const { title, authorId, tag } = request.body;
  const filename = request.files.dataFile.path;
  cloudinary.uploader.upload(filename, (err, result) => {
    if (err) {
      throw err;
    }
    db.query(
      'INSERT INTO tweets (title, imageUrl, authorId, tag) VALUES ($1, $2, $3, $4) RETURNING tweetID',
      [title, result.url, authorId, tag],
      (error, results) => {
        if (error) {
          response.status(400).json({
            status: 'error',
            error
          });
        }
        response.status(201).json({
          status: 'success',
          data: {
            message: 'Gif created Successfully',
            gifId: results.rows[0].postid,
            title,
            imageUrl: result.url,
            authorId,
            tag
          }
        });
      }
    );
  });
};

// Delete Routes

exports.deleteArticle = (request, response) => {
  // eslint-disable-next-line radix
  const articleID = parseInt(request.params.id);
  db.query('DELETE FROM posts WHERE postId = $1', [articleId], error => {
    if (error) {
      response.status(400).json({
        status: 'error',
        error
      });
    }

    response.status(201).json({
      status: 'success',
      data: {
        message: 'Article and comments deleted successfully',
        articleId
      }
    });
  });
};

exports.deleteGif = (request, response) => {
  // eslint-disable-next-line radix
  const gifId = parseInt(request.params.id);
  db.query('DELETE FROM tweets WHERE tweetID = $1', [gifId], error => {
    if (error) {
      response.status(400).json({
        status: 'error',
        error
      });
    }
    response.status(201).json({
      status: 'success',
      data: {
        message: 'Gif and comments deleted Successfully',
        gifId
      }
    });
  });
};

// Put Routes

exports.updateArticle = (request, response) => {
  // eslint-disable-next-line radix
  const articleID = parseInt(request.params.id);
  const { title, article, tag } = request.body;
  db.query(
    'UPDATE tweets SET title = $1, article = $2, tag = $3 WHERE tweettId = $4',
    [title, article, tag, articleId],
    error => {
      if (error) {
        response.status(400).json({
          status: 'error',
          error
        });
      }
      response.status(201).json({
        status: 'success',
        data: {
          message: 'Article updated Successfully',
          articleId,
          title,
          article,
          tag
        }
      });
    }
  );
};

exports.updateGif = (request, response) => {
  // eslint-disable-next-line radix
  const gifId = parseInt(request.params.id);
  const { title, imageUrl, tag } = request.body;
  db.query(
    'UPDATE posts SET title = $1, imageUrl = $2, tag = $3 WHERE postId = $4',
    [title, imageUrl, tag, gifId],
    error => {
      if (error) {
        response.status(400).json({
          status: 'error',
          error
        });
      }
      response.status(201).json({
        status: 'success',
        data: {
          message: 'Gif updated Successfully',
          gifId,
          title,
          imageUrl,
          tag
        }
      });
    }
  );
};