const poolConexao = require('../database/database');

const criarQrcode = async (dados) => {
    try {
        const sql = 'INSERT INTO qrcodes (token, data, horaInicio, horaFim, qrPath, createdBy, turnos) VALUES (?,?,?,?,?,?,?)';
        const valores = [
            dados.token,
            dados.data,
            dados.horaInicio,
            dados.horaFim,
            dados.qrPath,
            dados.createdBy,
            dados.turnos
        ];

        await poolConexao.query(sql, valores);
        return { sucesso: true };

    } catch (error) {
        console.error('Erro em criarQrcode:', error);
        throw error;
    }
}

module.exports = {criarQrcode}
