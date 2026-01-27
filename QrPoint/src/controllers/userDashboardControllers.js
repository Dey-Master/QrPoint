const userDashboardDb = require('../models/userDashboardDb');

const obterEstatisticasUser = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const dataHoje = new Date().toISOString().slice(0, 10);

        const statusHoje = await userDashboardDb.obterStatusHoje(userId, dataHoje);
        const entradaHoje = await userDashboardDb.obterEntradaHoje(userId, dataHoje);
        const saidaHoje = await userDashboardDb.obterSaidaHoje(userId, dataHoje);
        const qrAtivos = await userDashboardDb.obterTotalPresencas(userId);

        return res.json({
            statusHoje,
            entradaHoje,
            saidaHoje,
            qrAtivos
        });
    } catch (error) {
        console.error('Erro ao buscar estatísticas do usuário:', error);
        return res.status(500).json({ erro: 'Erro ao buscar estatísticas' });
    }
};

module.exports = { obterEstatisticasUser };
