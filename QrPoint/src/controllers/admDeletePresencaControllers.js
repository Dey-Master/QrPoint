const poolConexao = require('../database/database');

const deletarPresenca = async (req, res) => {
    try {
        const {id} = req.params
        const usuario = req.session.user;

        if(!usuario)  return res.json({sucesso: false, mensagem: 'Sessão expirada'}); 
        
        else if (String(usuario.tipo) !== 'admin' && String(usuario.tipo) !== 'moderador') return res.json({sucesso: false, mensagem: 'Ação não autorizada!'})
        
        else if (Number(id) === 0) return res.json({sucesso: false, mensagem: 'Registro não encontrado!'});

        await poolConexao.query('DELETE FROM presencas WHERE id = ?', [id]);
        console.log("Presenca deletado: ", id);

        return res.json({sucesso: true, mensagem:'O registro do usuario foi deletado com sucesso!'}) 
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({sucesso: false, mensagem: "Erro interno do servidor"});
    }
}

module.exports = {deletarPresenca}