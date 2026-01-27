const poolConexao = require('../database/database');

const dados = async (req, res) => {
    try {
        const { id } = req.params;
        const [usuario] = await poolConexao.query('SELECT id, nome, sobrenome, email, turno, tipo, status FROM usuarios WHERE id = ?',[id]);

        if (usuario.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        res.json(usuario[0]);
    }   
    catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }   
};

module.exports = {dados};