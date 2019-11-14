const queries = require('./queries')

exports.getComments = (request, response) => {
  db.query('SELECT * FROM comments ORDER BY commentId ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

exports.getCommentById = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM comments WHERE postId = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

exports.createComment = (request, response) => {
  const { comment, authorId, Id } = request.body
  db.query('INSERT INTO comments (comment, authorId, postid) VALUES ($1, $2, $3) RETURNING commentId', [comment, authorId, Id], (error, results) => {
    if (error) {
      console.log(error)
      response.status(400).json({
        "status": "error",
        "error": error
      })
    }
    // console.log(results)
    response.status(201).json({
      "status": "success",
      "data": {
        "message": "Comment created Successfully",
        "commentId": results.rows[0].commentid,
        "comment": comment,
        "authorId": authorId,
        "Id": Id,
        "createdOn": results.rows[0].createdOn
      }
    })
  })
}

exports.deleteComment = (request, response) => {
  const commentId = parseInt(request.params.id)

  db.query('DELETE FROM comments WHERE commentId = $1', [commentId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Comment deleted with ID: ${commentId}`)
  })
}
