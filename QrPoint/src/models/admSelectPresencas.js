const poolConexao = require('../database/database');

const tablePresencas = async () => {
    const [presencas] = await poolConexao.query(`
        SELECT p.id, u.nome, u.sobrenome,
               u.email, u.turno, p.data, 
               p.horaEntrada, p.horaSaida, p.status
        FROM presencas p
        LEFT JOIN usuarios u ON u.id = p.userId
        ORDER BY p.createdAt DESC
    `);

    return presencas;
};

module.exports = { tablePresencas };
