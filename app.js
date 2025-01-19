const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());  

let temas = [];
let categorias = [];

app.use((req, res, next) => {
    if (req.headers.accept === 'application/json') {
        res.setHeader('Content-Type', 'application/json');
    } else {
        res.setHeader('Content-Type', 'text/html');
    }
    next();
});

app.get('/temas', (req, res) => {
    res.status(200).json(temas);
});

app.post('/temas', (req, res) => {
    const novoTema = req.body;
    temas.push(novoTema);
    res.status(201).json(novoTema);
});

app.put('/temas/:id', (req, res) => {
    const { id } = req.params;
    const temaIndex = temas.findIndex(t => t.id === id);
    if (temaIndex !== -1) {
        temas[temaIndex] = req.body;
        res.status(200).json(temas[temaIndex]);
    } else {
        res.status(404).json({ message: 'Tema não encontrado' });
    }
});

app.delete('/temas/:id', (req, res) => {
    const { id } = req.params;
    temas = temas.filter(t => t.id !== id);
    res.status(200).json({ message: 'Tema deletado com sucesso' });
});

app.get('/categorias', (req, res) => {
    res.status(200).json(categorias);
});

app.post('/categorias', (req, res) => {
    const novaCategoria = req.body;
    categorias.push(novaCategoria);
    res.status(201).json(novaCategoria);
});

app.put('/categorias/:id', (req, res) => {
    const { id } = req.params;
    const categoriaIndex = categorias.findIndex(c => c.id === id);
    if (categoriaIndex !== -1) {
        categorias[categoriaIndex] = req.body;
        res.status(200).json(categorias[categoriaIndex]);
    } else {
        res.status(404).json({ message: 'Categoria não encontrada' });
    }
});

app.delete('/categorias/:id', (req, res) => {
    const { id } = req.params;
    categorias = categorias.filter(c => c.id !== id);
    res.status(200).json({ message: 'Categoria deletada com sucesso' });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
