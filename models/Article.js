var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema constructor that creates new Article schema
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },

  // uses ObjectId to link note to associated article
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
