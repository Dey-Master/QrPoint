const admDashboardDb = require('../models/admDashboardDb');

const obterEstatisticas = async (req, res) => {
    try {
        const stats = await admDashboardDb.getDashboardStats();
        return res.json(stats);
    } catch (error) {
        console.error('Erro no controller do dashboard:', error);
        return res.status(500).json({ erro: 'Erro ao buscar estatísticas do dashboard' });
    }
};

module.exports = { obterEstatisticas };
