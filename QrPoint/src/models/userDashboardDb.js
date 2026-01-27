const poolConexao = require('../database/database');

const obterStatusHoje = async (userId, dataHoje) => {
    const [statusHoje] = await poolConexao.query(
        `SELECT status FROM presencas WHERE userId = ? AND data = ? LIMIT 1`,
        [userId, dataHoje]
    );
    return statusHoje[0]?.status ? statusHoje[0].status.toUpperCase() : 'SEM REGISTRO';
};

const obterEntradaHoje = async (userId, dataHoje) => {
    const [entradaHoje] = await poolConexao.query(
        `SELECT horaEntrada FROM presencas WHERE userId = ? AND data = ? ORDER BY horaEntrada DESC LIMIT 1`,
        [userId, dataHoje]
    );
    return entradaHoje[0]?.horaEntrada ? entradaHoje[0].horaEntrada.slice(0, 5) : '--:--';
};

const obterSaidaHoje = async (userId, dataHoje) => {
    const [saidaHoje] = await poolConexao.query(
        `SELECT horaSaida FROM presencas WHERE userId = ? AND data = ? ORDER BY horaSaida DESC LIMIT 1`,
        [userId, dataHoje]
    );
    return saidaHoje[0]?.horaSaida ? saidaHoje[0].horaSaida.slice(0, 5) : '--:--';
};

const obterTotalPresencas = async (userId) => {
    const [totalPresencas] = await poolConexao.query(
        `SELECT COUNT(*) as total FROM presencas WHERE userId = ?`,
        [userId]
    );
    return totalPresencas[0]?.total || 0;
};

module.exports = {
    obterStatusHoje,
    obterEntradaHoje,
    obterSaidaHoje,
    obterTotalPresencas
};
