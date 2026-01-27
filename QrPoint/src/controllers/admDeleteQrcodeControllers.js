const poolConexao = require('../database/database');

const deletarQrcode = async (req, res) => {
    try {
        const {id} = req.params
        const usuario = req.session.user;

        if(!usuario)  return res.json({sucesso: false, mensagem: 'Sessão expirada'}); 
        
        else if (String(usuario.tipo) !== 'admin' && String(usuario.tipo) !== 'moderador') return res.json({sucesso: false, mensagem: 'Ação não autorizada!'})
        
        else if (Number(id) === 0) return res.json({sucesso: false, mensagem: 'Qrcode não encontrado!'});

        await poolConexao.query('DELETE FROM qrcodes WHERE id = ?', [id]);
        console.log("Qrcode deletado: ", id);

        return res.json({sucesso: true, mensagem:'O qrcode foi deletado com sucesso!'}) 
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({sucesso: false, mensagem: "Erro interno do servidor"});
    }
}

module.exports = {deletarQrcode}