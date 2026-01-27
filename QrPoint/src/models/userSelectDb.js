const poolConexao = require('../database/database');

const tabelaUser = async (req, res) => {
    const userId = req.session.user.id;
    const [presencas] = await poolConexao.query(`
        SELECT 
            p.data,
            p.horaEntrada,
            p.horaSaida,
            p.status
        FROM presencas p
        WHERE p.userId = ?
        ORDER BY p.data DESC;
    `,[userId]);

    return res.json({sucesso: true, presencas});
};

module.exports = { tabelaUser };
