const poolConexao = require('../database/database');
const bcrypt = require('bcryptjs');

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, sobrenome, email, turno, tipo, status } = req.body;
        
        const regex = /^[a-zA-Z]/;

        const [naoAdmin] = await poolConexao.query('SELECT tipo FROM usuarios WHERE id = ?', [id]);
        const todosTipo = naoAdmin[0].tipo;

        if (todosTipo === 'admin' && req.session.user.tipo !== 'admin') {
            return res.status(403).json({sucesso: false, mensagem: 'Ação não autorizada!' });
        
        } else if (tipo === 'admin' && todosTipo !== 'admin') {
            return res.status(400).json({sucesso: false, mensagem: 'Ação não autorizada!' });
        
        }else if (tipo === 'moderador' && status === 'pendente') {
            return res.status(400).json({sucesso: false, mensagem: 'O moderador não pode ter status pendente' });
        
        } else if (tipo === 'admin' && status === 'pendente') {
            return res.status(400).json({sucesso: false, mensagem: 'O administrador não pode ter status pendente' });
        
        } else if (tipo === 'admin' && status === 'bloqueado') {
            return res.status(400).json({sucesso: false, mensagem: 'O administrador não pode ter status bloqueado' });
        
        }else if (tipo === 'moderador' && status === 'bloqueado') {
            return res.status(400).json({sucesso: false, mensagem: 'O moderador não pode ter status bloqueado' });
        
        } else if (!nome || typeof nome == undefined || nome == null || !sobrenome || typeof sobrenome == undefined || sobrenome == null || !email || typeof email == undefined || email == null || !turno || typeof turno == undefined || turno == null || !tipo || typeof tipo == undefined || tipo == null || !status || typeof status == undefined || status == null) {
            return res.json({sucesso:false, mensagem: 'Por favor preencha os campos!'});

        } else if (!regex.test(nome)) {
            return res.json({sucesso:false, mensagem: 'Os campos Nome deve conter apenas letras!'});
        
        } else if (!regex.test(sobrenome)) {
            return res.json({sucesso:false, mensagem: 'Os campos Sobrenome deve conter apenas letras!'});
        
        } else if (nome.length < 3){
            return res.json({sucesso:false, mensagem: 'O Nome é muito curto!'});
        
        } else if (sobrenome.length < 3){
            return res.json({sucesso:false, mensagem: 'O Sobrenome é muito curto!'});   

        } else if (req.session.user.tipo !== 'admin' && req.session.user.id !== Number(id) && todosTipo === 'moderador') {
            return res.status(403).json({sucesso: false, mensagem: 'Não tens a permissão para modificar o moderador!' });
        
        } else if ((req.session.user.id === Number(id) && req.session.user.tipo === 'admin' && tipo !== 'admin') || (req.session.user.id === Number(id) && req.session.user.tipo === 'moderador' && tipo !== 'moderador')) {
            return res.status(403).json({sucesso: false, mensagem: 'Não tens a permissão para alterar o cargo!'});
        }
        
        const [verificar] = await poolConexao.query('SELECT id FROM usuarios WHERE email = ? AND id != ?', [email, id]);

        if (verificar.length > 0) {
            return res.json({sucesso: false, mensagem: 'O email já foi registrado no sistema!'});
        }
        
            const [resultado] = await poolConexao.query('UPDATE usuarios SET nome = ?, sobrenome = ?, email = ?, turno = ?, tipo = ?, status = ? WHERE id = ?',[nome, sobrenome, email, turno, tipo, status, id]);

            if (!resultado || resultado.length === 0) {
                return res.status(404).json({sucesso: false, mensagem: 'Usuário não encontrado'});
            }

            res.json({ sucesso: true, mensagem: 'Usuário atualizado com sucesso'});


        console.log('Usuário atualizado:', { id, nome, sobrenome, email, turno, tipo, status });

    } catch (error) {
        console.error(error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar usuário' });
    }
}

const atualizarPerfil =  async (req, res) => {
    try {
        const { id } = req.params;
        const {nome, sobrenome, email, senha, senhaSecond} = req.body

        const regex = /^[a-zA-Z]/

        if (!nome || typeof nome == undefined || nome == null || !sobrenome || typeof sobrenome == undefined || sobrenome == null || !email || typeof email == undefined || email == null || !senha || typeof senha == undefined || senha == null || !senhaSecond || typeof senhaSecond == undefined || senhaSecond == null) {
            return res.json({sucesso:false, mensagem: 'Por favor preencha os campos!'});

        } else if (!regex.test(nome)) {
            return res.json({sucesso:false, mensagem: 'Os campos Nome deve conter apenas letras!'});
        
        } else if (!regex.test(sobrenome)) {
            return res.json({sucesso:false, mensagem: 'Os campos Sobrenome deve conter apenas letras!'});
        
        } else if (nome.length < 3){
            return res.json({sucesso:false, mensagem: 'O Nome é muito curto!'});
        
        } else if (sobrenome.length < 3){
            return res.json({sucesso:false, mensagem: 'O Sobrenome é muito curto!'});

        } else if (senha.length < 6 || senhaSecond.length < 6) {
            return res.json({sucesso:false, mensagem: 'A senha deve ter no minimo 6 caracteres!'});
        
        } else if (senha !== senhaSecond) {
            return res.json({sucesso: false, mensagem: 'As senhas precisam ser identicas!'});
        
        } else {


            const [verificar] = await poolConexao.query('SELECT id FROM usuarios WHERE email = ? AND id != ?', [email, id]);

            if (verificar.length > 0) {
               return res.json({sucesso: false, mensagem: 'O email já foi registrado no sistema!'});
            }

            const senhaHash = await bcrypt.hash(senha, 10);

            
            const [resultado] = await poolConexao.query('UPDATE usuarios SET nome = ?, sobrenome = ?, email = ?, senha = ? WHERE id = ?',[nome, sobrenome, email, senhaHash, id]);

                if (req.session && req.session.user && Number(req.session.user.id) === Number(id)) {
                    req.session.user.nome = nome;
                    req.session.user.sobrenome = sobrenome;
                    req.session.user.email = email;
                }
                    res.json({ sucesso: true, mensagem: 'Usuário atualizado com sucesso'});

            console.log('Usuário atualizado:', { id, nome, sobrenome, email, senhaHash });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar usuário' });
    }
}
module.exports = {atualizar, atualizarPerfil};