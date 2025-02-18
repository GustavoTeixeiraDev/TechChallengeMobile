const express = require('express');
const professorController = require('../controllers/professorController');
const authMiddleware = require('../middlewares/authMiddleware');

console.log("Conteúdo do professorController:", professorController); // Debug

const router = express.Router();

// Verifica se todas as funções existem
if (!professorController.getAllProfessors) {
  console.error("ERRO: professorController.getAllProfessors está undefined!");
}

// Definição de rotas
router.post('/register', professorController.register);
router.post('/login', professorController.login);
router.get('/', authMiddleware.authenticate, professorController.getAllProfessors);
router.get('/:id', authMiddleware.authenticate, professorController.getProfessorById);
router.put('/:id', authMiddleware.authenticate, professorController.updateProfessor);
router.delete('/:id', authMiddleware.authenticate, professorController.deleteProfessor);

module.exports = router;
