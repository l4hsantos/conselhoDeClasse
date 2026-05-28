// ================= IMPORTAÇÕES =================
const express = require('express');
const cors = require('cors');

const app = express();

// ================= CONFIG =================
app.use(cors());
app.use(express.json());

const PORT = 3000;

// ================= ROTA INICIAL =================
app.get('/', (req, res) => {
  res.send('API do sistema escolar funcionando 🚀');
});

// ================= BANCO TEMPORÁRIO =================
let professores = [];

let alunos = [
  {
    id: 1,
    nome: 'Ana Silva',
    matricula: '2024001',
    turma: '9A',
    situacao: 'Cursando',
  },
  {
    id: 2,
    nome: 'Bruno Costa',
    matricula: '2024002',
    turma: '9A',
    situacao: 'Cursando',
  },
];

// ================= LOGIN =================
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      erro: 'Preencha email e senha',
    });
  }

  const professor = professores.find(
    (p) => p.email === email && p.senha === senha
  );

  if (!professor) {
    return res.status(401).json({
      erro: 'Credenciais inválidas',
    });
  }

  res.status(200).json({
    mensagem: 'Login realizado com sucesso',
    professor,
  });
});

// ================= CADASTRO PROFESSOR =================
app.post('/professores', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      erro: 'Preencha todos os campos',
    });
  }

  const professorExiste = professores.find(
    (p) => p.email === email
  );

  if (professorExiste) {
    return res.status(400).json({
      erro: 'Professor já cadastrado',
    });
  }

  const novoProfessor = {
    id: professores.length + 1,
    nome,
    email,
    senha,
  };

  professores.push(novoProfessor);

  res.status(201).json({
    mensagem: 'Professor cadastrado com sucesso',
    novoProfessor,
  });
});

// ================= LISTAR PROFESSORES =================
app.get('/professores', (req, res) => {
  res.status(200).json(professores);
});

// ================= LISTAR ALUNOS =================
app.get('/alunos', (req, res) => {
  res.status(200).json(alunos);
});

// ================= BUSCAR ALUNO POR ID =================
app.get('/alunos/:id', (req, res) => {
  const { id } = req.params;

  const aluno = alunos.find(
    (a) => a.id == id
  );

  if (!aluno) {
    return res.status(404).json({
      erro: 'Aluno não encontrado',
    });
  }

  res.status(200).json(aluno);
});

// ================= CADASTRAR ALUNO =================
app.post('/alunos', (req, res) => {
  const {
    nome,
    matricula,
    turma,
    situacao,
  } = req.body;

  if (!nome || !matricula || !turma) {
    return res.status(400).json({
      erro: 'Preencha todos os campos',
    });
  }

  const alunoExiste = alunos.find(
    (a) => a.matricula === matricula
  );

  if (alunoExiste) {
    return res.status(400).json({
      erro: 'Matrícula já cadastrada',
    });
  }

  const novoAluno = {
    id: alunos.length + 1,
    nome,
    matricula,
    turma,
    situacao: situacao || 'Cursando',
  };

  alunos.push(novoAluno);

  res.status(201).json({
    mensagem: 'Aluno cadastrado com sucesso',
    novoAluno,
  });
});

// ================= EDITAR ALUNO =================
app.put('/alunos/:id', (req, res) => {
  const { id } = req.params;

  const aluno = alunos.find(
    (a) => a.id == id
  );

  if (!aluno) {
    return res.status(404).json({
      erro: 'Aluno não encontrado',
    });
  }

  const {
    nome,
    matricula,
    turma,
    situacao,
  } = req.body;

  aluno.nome = nome || aluno.nome;
  aluno.matricula = matricula || aluno.matricula;
  aluno.turma = turma || aluno.turma;
  aluno.situacao = situacao || aluno.situacao;

  res.status(200).json({
    mensagem: 'Aluno atualizado com sucesso',
    aluno,
  });
});

// ================= DELETAR ALUNO =================
app.delete('/alunos/:id', (req, res) => {
  const { id } = req.params;

  const alunoExiste = alunos.find(
    (a) => a.id == id
  );

  if (!alunoExiste) {
    return res.status(404).json({
      erro: 'Aluno não encontrado',
    });
  }

  alunos = alunos.filter(
    (a) => a.id != id
  );

  res.status(200).json({
    mensagem: 'Aluno removido com sucesso',
  });
});

// ================= SERVIDOR =================
app.listen(PORT, () => {
  console.log(
    `Servidor rodando em http://localhost:${PORT}`
  );
});