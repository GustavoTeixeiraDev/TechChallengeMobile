const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  console.log("Cabeçalhos da requisição:", req.headers); // 🔍 Depuração

  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  // Extrai o token do formato "Bearer <token>"
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded); // 🔍 Depuração
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

module.exports = { authenticate };
