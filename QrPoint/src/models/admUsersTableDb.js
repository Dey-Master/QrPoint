const poolConexao = require('../database/database');

const selectTable = async (req, res) => {
    try {
            [usuarios] =  await poolConexao.query('SELECT id, nome, sobrenome, email, turno, tipo, status FROM usuarios ORDER BY nome');
            return res.json(usuarios);

        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao buscar usuarios" });
        }
}

module.exports = {selectTable}