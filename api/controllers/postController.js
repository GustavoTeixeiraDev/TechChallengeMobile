const Post = require('../models/Post');
const User = require('../models/User')

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name')
      .populate('comments.user', 'name');

    res.json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    res.status(500).json({ message: "Erro interno do servidor", error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    console.log("Usuário autenticado:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const { title, content } = req.body;
    const userName = req.user.id;

    const post = new Post({
      title,
      content,
      author: userName,
    });

    await post.save();
    res.status(201).json({ message: 'Post criado com sucesso', post });

  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getPostsForStudents = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name')
      .populate('comments.user', 'name');

    res.json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    res.status(500).json({ message: "Erro interno do servidor", error: error.message });
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
    res.status(500).json({ message: error.message });
  }
};
