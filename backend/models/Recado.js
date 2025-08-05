const mongoose = require('mongoose');

const RecadoSchema = new mongoose.Schema({
  mensagem: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recado', RecadoSchema);
