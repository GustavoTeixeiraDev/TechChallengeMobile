const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

exports.register = async (req, res) => {
    try {
      const { name, email, password, course, enrollmentYear } = req.body;

      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'Usuário já existe' });

      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({
        name,
        email,
        password: hashedPassword,
        role: 'student',
      });
      await user.save();

      // Cria o perfil de estudante no modelo `Student`
      const student = new Student({
        user: user._id,
        course,
        enrollmentYear,
      });
      await student.save();

      // Associa o perfil ao usuário
      user.profile = student._id;
      await user.save();

      res.status(201).json({ message: 'Estudante registrado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Student.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await compare(password, student.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const student = await Student.findOne({ user: user._id });
            if (!student) {
              return res.status(404).json({ message: 'Estudante não encontrado' });
            }

        // Geramos o token JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getStudentPosts = async (req, res) => {
    try {
      console.log("Recebendo requisição para /students/posts do usuário:", req.user);

      const posts = await Post.find()
        .populate('author', 'name role')
        .populate('comments.user', 'name');

      res.json(posts);
    } catch (error) {
      console.error("Erro ao buscar posts para estudantes:", error);
      res.status(500).json({ message: error.message });
    }
  };

exports.addComment = async (req, res) => {
try {
    const { text } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post não encontrado' });

    post.comments.push({ user: userId, text });
    await post.save();

    res.json(post);
} catch (error) {
    console.error("Erro ao adicionar comentário:", error);
    res.status(500).json({ message: error.message });
}
};
