const express = require('express');
const routes = express.Router();
const { validate } = require('./middlewares/auth');
const isAdmin = require('./middlewares/isAdmin');

const Plantas = require('./controller/controllerplantas');
const User = require('./controller/controlleruser');

routes.get('/', (req, res) => {
    res.json({
        message: 'API de Gerenciamento de Plantas',
        routes: [
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

routes.post('/register', User.register);
routes.post('/login', User.login);
routes.patch('/user', User.update);

routes.post('/plantas', validate, isAdmin, Plantas.create);
routes.put('/plantas/:id', validate, isAdmin, Plantas.update);
routes.delete('/plantas/:id', validate, isAdmin, Plantas.remove);

routes.get('/plantas', Plantas.read);
routes.get('/plantas/:id', Plantas.readOne);

module.exports = routes;