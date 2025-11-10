const express = require('express');
const routes = express.Router();
const { validate, createHash, validatePassword } = require('./middlewares/auth');
const isAdmin = require('./middlewares/isAdmin');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Plantas = require('./controller/controllerplantas');

routes.get('/', (req, res) => {
    res.json({ message: 'API de Gerenciamento de Plantas',
        routes:[
            { method: 'POST', path: '/register', description: 'Registrar um novo usuário' },
            { method: 'POST', path: '/login', description: 'Login de usuário' },
            { method: 'POST', path: '/plantas', description: 'Criar uma nova planta (autenticado)' },
            { method: 'PUT', path: '/plantas/:id', description: 'Atualizar uma planta existente (autenticado)' },
            { method: 'DELETE', path: '/plantas/:id', description: 'Deletar uma planta (autenticado)' },
            { method: 'GET', path: '/plantas', description: 'Listar todas as plantas' },
            { method: 'GET', path: '/plantas/:id', description: 'Obter detalhes de uma planta específica' }
        ]
     });
});

routes.post('/register', async (req, res) => {
    const { nome, email, tipo, password } = req.body;
    try {
        const hash = await createHash(password);
        const user = await prisma.user.create({
            data: { nome, email, tipo, password: hash }
        });
        res.json({ message: 'Usuário criado', user: { id: user.id, nome: user.nome, email: user.email, tipo: user.tipo } });
    } catch (e) {
        res.status(400).json({ error: 'Erro ao criar usuário ou email já cadastrado.' });
    }
});

routes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const valid = await validatePassword(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ userId: user.id, tipo: user.tipo, nome: user.nome, email: user.email }, process.env.SECRET_JWT, { expiresIn: '1h' });
    res.json({ token });
});

routes.post('/plantas', validate, isAdmin, Plantas.create);
routes.put('/plantas/:id', validate, isAdmin, Plantas.update);
routes.delete('/plantas/:id', validate, isAdmin, Plantas.remove);

routes.get('/plantas', Plantas.read);
routes.get('/plantas/:id', Plantas.readOne);

module.exports = routes;