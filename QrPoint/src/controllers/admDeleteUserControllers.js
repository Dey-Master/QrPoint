const poolConexao = require('../database/database');

const deletar = async (req, res) => {
    try {
        const {id} = req.params
        const usuario = req.session.user;

        const [naoAdmin] = await poolConexao.query('SELECT tipo FROM usuarios WHERE id = ?', [id]);
        const todosTipo = naoAdmin[0].tipo;

        if(!usuario) {
            return res.json({sucesso: false, mensagem: 'Sessão expirada'}); 
        
        } else if (todosTipo === 'admin' && usuario.tipo !== 'admin') {
            return res.status(403).json({sucesso: false, mensagem: "Ação não autorizada!"});
        
        } else if (usuario.tipo !== 'admin' && todosTipo === 'moderador' && Number(usuario.id) !== Number(id)) {
            return res.status(403).json({sucesso: false, mensagem: "Não tens a permissão para deletar o moderador!"});

        } else if (usuario.id === Number(id)) {
                return res.json({sucesso: false, mensagem: "Não tens a permissão para deletar própria conta!"});
            
        }
        const [rowsSession] = await poolConexao.query('SELECT id, tipo FROM usuarios WHERE id = ?', [id]);

            if (rowsSession.length === 0) {
                return res.json({ sucesso: false, mensagem: "Usuário não encontrado" });
            
            } else {

                await poolConexao.query('DELETE FROM usuarios WHERE id = ?', [id]);

                console.log("Usuário deletado: ", id);

                return res.json({sucesso: true, mensagem: "Usuário excluído com sucesso!"});
            }
            
        } catch (error) {
                console.error(error);

                return res.status(500).json({sucesso: false, mensagem: "Erro interno do servidor"});
        }

    }
    
module.exports = {deletar};