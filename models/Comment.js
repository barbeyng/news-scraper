var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema constructor that creates new Note schema
var CommentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;