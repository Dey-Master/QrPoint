
const verificarPresenca = async (req, res) => {
    if (!req.session.presenca) {
        return res.status(400).json({sucesso: false, mensagem: 'Nenhum dados de presença disponível'});
    }

    const presenca = req.session.presenca;

    console.log('Dados de presença na sessão:', presenca);
    delete req.session.presenca;
    return res.json(presenca);
};

module.exports = { verificarPresenca };