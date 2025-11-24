const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
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
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const valid = await validatePassword(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ userId: user.id, tipo: user.tipo, nome: user.nome, email: user.email }, process.env.SECRET_JWT, { expiresIn: '1h' });
    res.json({ token });
}

const update = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: dados
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
    update
};