var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PollSchema   = new Schema({
  id: String,
  question: String,
  options: Schema.Types.Mixed,
  multiple_answers: Boolean,
  duplicate_ip: Boolean,
  ip_addresses: Schema.Types.Mixed,
  total_votes: Number
});

module.exports = mongoose.model('Poll', PollSchema);