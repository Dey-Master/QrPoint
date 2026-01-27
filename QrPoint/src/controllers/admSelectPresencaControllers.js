const admSelectPresencas = require('../models/admSelectPresencas');

const listarPresencas = async (req, res) => {
    try {
        const presencas = await admSelectPresencas.tablePresencas();

        return res.json({
            sucesso: true,
            dados: presencas
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar presenças'
        });
    }
};

module.exports = { listarPresencas };
