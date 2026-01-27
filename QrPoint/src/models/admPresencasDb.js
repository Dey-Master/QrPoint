const poolConexao = require('../database/database');

const cadastrarPresenca = async (dados) => {
    try {
        const sql = 'INSERT INTO presencas (userId, qrId, data, horaEntrada, status) VALUES (?, ?, ?, ?, ?)';
        
        const valores = [
            dados.userId,
            dados.qrId,
            dados.data,
            dados.horaEntrada,
            dados.status
        ];
        await poolConexao.query(sql,valores);
        return {sucesso:true};
        
    } catch (error) {
        console.error(error);
    }
};

module.exports = {cadastrarPresenca};