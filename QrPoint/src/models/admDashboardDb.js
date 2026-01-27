const poolConexao = require('../database/database');

const getDashboardStats = async () => {
    try {
        const [presencasHoje] = await poolConexao.query(`
            SELECT COUNT(*) AS total 
            FROM presencas 
            WHERE DATE(data) = CURDATE() 
            AND status = 'presente'
        `);

        const [atrasosHoje] = await poolConexao.query(`
            SELECT COUNT(*) AS total 
            FROM presencas 
            WHERE DATE(data) = CURDATE() 
            AND status = 'atrasado'
        `);

        const [faltasHoje] = await poolConexao.query(`
            SELECT COUNT(*) AS total 
            FROM presencas 
            WHERE DATE(data) = CURDATE() 
            AND status = 'falta'
        `);

        const [qrAtivos] = await poolConexao.query(`
            SELECT COUNT(*) AS total 
            FROM qrcodes 
            WHERE status = 'ativo'
        `);

        return {
            presencasHoje: presencasHoje[0].total,
            atrasosHoje: atrasosHoje[0].total,
            faltasHoje: faltasHoje[0].total,
            qrAtivos: qrAtivos[0].total
        };

    } catch (error) {
        console.error('Erro ao buscar estatísticas do dashboard:', error);
        throw error;
    }
};

module.exports = { getDashboardStats };
