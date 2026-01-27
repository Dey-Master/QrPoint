const cron = require('node-cron');
const poolConexao = require('../database/database');

const marcarFaltas = async () => {
    const hoje = new Date().toISOString().slice(0, 10);
    const [usuarios] = await poolConexao.query(`SELECT id, turno FROM usuarios WHERE status = 'aprovado' AND tipo = 'user'`);
    for (const usuario of usuarios) {
        const [presenca] = await poolConexao.query(`SELECT id FROM presencas WHERE userId = ? AND data = ?`, [usuario.id, hoje]);

        if (presenca.length > 0) continue;

        let horaFimTurno;

        if (usuario.turno === 'manha') horaFimTurno = '08:00:00';
        if (usuario.turno === 'tarde') horaFimTurno = '12:00:00';

        const agora = new Date();
        const fimTurno = new Date(`${hoje}T${horaFimTurno}`);

        if (agora > fimTurno) {
            await poolConexao.query(`INSERT INTO presencas (userId, data, status) VALUES (?, ?, 'Falta')`, [usuario.id, hoje]);
            
            console.log(`Falta marcada para usuário ${usuario.id}`);
        }
    }
};


// roda às 12:00
// faltas do turno da manhã
cron.schedule('59 11 * * *', marcarFaltas);

// roda às 17:00
// faltas do turno da tarde
cron.schedule('59 16 * * *', marcarFaltas);

