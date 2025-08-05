require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.log(err));

// Models
const User = require('./models/User');
const Recado = require('./models/Recado');

// Middleware para proteger rotas
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) return res.status(401).json({ message: 'Token inválido' });
    req.userId = decoded.id;
    next();
  });
}

// Rotas

// Registro
app.post('/api/register', async (req, res) => {
  const { nome, email, senha, aniversarioNamoro, aniversarioNoivado } = req.body;
  if(!nome || !email || !senha) return res.status(400).json({ message: 'Preencha todos os campos' });

  const existe = await User.findOne({ email });
  if(existe) return res.status(400).json({ message: 'Usuário já existe' });

  const bcrypt = require('bcryptjs');
  const senhaHash = await bcrypt.hash(senha, 10);

  const user = new User({
    nome,
    email,
    senha: senhaHash,
    aniversarioNamoro,
    aniversarioNoivado
  });

  await user.save();
  res.json({ message: 'Usuário criado com sucesso' });
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  if(!email || !senha) return res.status(400).json({ message: 'Preencha todos os campos' });

  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ message: 'Usuário não encontrado' });

  const bcrypt = require('bcryptjs');
  const valido = await bcrypt.compare(senha, user.senha);
  if(!valido) return res.status(400).json({ message: 'Senha incorreta' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({
    token,
    nome: user.nome,
    aniversarioNamoro: user.aniversarioNamoro,
    aniversarioNoivado: user.aniversarioNoivado
  });
});

// Rotas de recados protegidas
app.get('/api/recados', auth, async (req, res) => {
  const recados = await Recado.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(recados);
});

app.post('/api/recados', auth, async (req, res) => {
  const { mensagem } = req.body;
  if(!mensagem) return res.status(400).json({ message: 'Mensagem vazia' });

  const recado = new Recado({ mensagem, userId: req.userId });
  await recado.save();
  res.json(recado);
});

// Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
