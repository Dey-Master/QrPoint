const cron = require('node-cron');
const poolConexao = require('../database/database');

// Roda a cada minuto e marca qrcodes cujo horário final já passou como 'expirado'
cron.schedule('* * * * *', async () => {
    try {
        const [ativar] = await poolConexao.query(`UPDATE qrcodes SET status = 'ativo' WHERE status = 'pendente' AND TIMESTAMP(data, horaInicio) <= NOW();`)

        const [result] = await poolConexao.query(`UPDATE qrcodes SET status = 'expirado' WHERE status = 'ativo' AND TIMESTAMP(data, horaFim) <= NOW()`);
        
    } catch (error) {
        console.error('[cron] Erro ao expirar qrcodes:', error);
    }
});
