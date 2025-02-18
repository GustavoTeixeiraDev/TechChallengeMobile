const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const professorRoutes = require('./routes/professorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const postRoutes = require('./routes/postRoutes')
const cors = require('cors');


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/students', studentRoutes);


// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/professors', professorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/posts', postRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});