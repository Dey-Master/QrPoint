const admSelectQrcodeModels = require('../models/admSelectQrcode');

const buscarQrAtivo = async (req, res) => {
    try {
        const usuario = req.session.user;

        //Administradores e moderadores devem ver o QR ativo global; outros usuários veem apenas o seu próprio
        const filtro = (usuario && (usuario.tipo === 'admin' || usuario.tipo === 'moderador')) ? null : (usuario ? usuario.id : null);
        const qr = await admSelectQrcodeModels.buscarQrAtivo(filtro);

        if (!qr) return res.json({ existe: false });
        return res.json({existe: true, qr});

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar QR ativo' });
    }
};

module.exports = { buscarQrAtivo };
