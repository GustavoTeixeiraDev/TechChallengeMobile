const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('profile');
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

    // Comparar a senha fornecida com a senha salva no banco de dados
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch)
    {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retornar token e função do usuário
    res.json({
      token,
      role: user.role,
      profile: user.profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};