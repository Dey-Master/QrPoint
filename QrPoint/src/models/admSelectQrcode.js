const poolConexao = require('../database/database');

const buscarQrAtivo = async (createdBy) => {
    try {
        const colunas = 'id, data, horaInicio, horaFim, qrPath, status, turnos, createdBy';

        if (createdBy) {
            const sql = `SELECT ${colunas} FROM qrcodes WHERE status = 'ativo' AND createdBy = ? ORDER BY createdAt DESC LIMIT 1`;
            const [rows] = await poolConexao.query(sql, [createdBy]);
            return rows[0] || null;
        }

        const sql = `SELECT ${colunas} FROM qrcodes WHERE status = 'ativo' ORDER BY createdAt DESC LIMIT 1`;
        const [rows] = await poolConexao.query(sql);
        return rows[0] || null;

    } catch (error) {
        console.error('Erro em buscarQrAtivo:', error);
        throw error;
    }
}

const tableQrcodes = async (req, res) => {
    try {
        [qrcodes] =  await poolConexao.query(`SELECT q.id, q.data, q.horaInicio, q.horaFim, q.turnos, q.status, q.createdAt, q.createdBy,
                COALESCE(CONCAT(IFNULL(u.nome, ''), ' ', IFNULL(u.sobrenome, ''))) AS criadoPor
                FROM qrcodes q LEFT JOIN usuarios u ON u.id = q.createdBy ORDER BY q.createdAt DESC;`);
        return res.json(qrcodes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar qrcodes" });
    }
}


module.exports = {buscarQrAtivo, tableQrcodes}