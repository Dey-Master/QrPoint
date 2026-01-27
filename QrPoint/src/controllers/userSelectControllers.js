const userSelectDb = require('../models/userSelectDb');

const tableDados = async (req, res) => {
    try {
        const presencas = await userSelectDb.tabelaUser();

        console.log(presencas)

        return res.json({sucesso: true, dados: presencas});

    } catch (error) {
        console.error(error);
        return res.status(500).json({sucesso: false, mensagem: 'Erro ao buscar presenças'});
    }
};

module.exports = { tableDados };