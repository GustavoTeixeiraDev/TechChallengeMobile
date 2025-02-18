const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Professor = require('../models/Professor');

const register = async (req, res) => {
  try {
    const { name, email, password, department, title } = req.body;

    if (!email || !password || !department) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // 🚀 Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'professor',
    });

    await user.save();

    const professor = new Professor({
      user: user._id,
      department,
      title,
    });

    await professor.save();

    user.profile = professor._id;
    await user.save();

    res.status(201).json({ message: 'Professor registrado com sucesso' });
  } catch (error) {
    console.error("Erro no register:", error);
    res.status(500).json({ message: error.message });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const professor = await Professor.findOne({ user: user._id });
    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }

    // Geramos o token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: error.message });
  }
};


const getAllProfessors = async (req, res) => {
  try {
    const professors = await Professor.find().populate('user', 'name email');
    res.json(professors);
  } catch (error) {
    console.error("Erro ao buscar professores:", error);
    res.status(500).json({ message: error.message });
  }
};

const getProfessorById = async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id).populate('user', 'name email');
    if (!professor) return res.status(404).json({ message: 'Professor não encontrado' });
    res.json(professor);
  } catch (error) {
    console.error("Erro ao buscar professor por ID:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateProfessor = async (req, res) => {
  try {
    const { department, title } = req.body;
    const professor = await Professor.findByIdAndUpdate(
      req.params.id,
      { department, title },
      { new: true }
    );
    if (!professor) return res.status(404).json({ message: 'Professor não encontrado' });
    res.json(professor);
  } catch (error) {
    console.error("Erro ao atualizar professor:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProfessor = async (req, res) => {
  try {
    const professor = await Professor.findByIdAndDelete(req.params.id);
    if (!professor) return res.status(404).json({ message: 'Professor não encontrado' });

    await User.findByIdAndDelete(professor.user); // Também remove o usuário associado

    res.json({ message: 'Professor excluído com sucesso' });
  } catch (error) {
    console.error("Erro ao deletar professor:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getAllProfessors,
  getProfessorById,
  updateProfessor,
  deleteProfessor
};
