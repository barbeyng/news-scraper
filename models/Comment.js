var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema constructor that creates new Note schema
var CommentSchema = new Schema({
  body: String,
  user: String,
  date: {type: Date, default: Date.now}
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
