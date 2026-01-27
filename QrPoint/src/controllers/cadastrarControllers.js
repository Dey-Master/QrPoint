const poolConexao = require('../database/database');
const cadastrarDb = require('../models/cadastrarDb');
const bcrypt = require('bcryptjs');

const cadastrar = async (req, res) => {
    try {
        const {nome, sobrenome, email, senha, senhaSecond, turno} = req.body;
        const regex = /^[a-zA-Z]/
        
        if (!nome || typeof nome == undefined || nome == null || !sobrenome || typeof sobrenome == undefined || sobrenome == null || !email || typeof email == undefined || email == null || !senha || typeof senha == undefined || senha == null || !senhaSecond || typeof senhaSecond == undefined || senhaSecond == null || !turno || typeof turno == undefined || turno == null) {
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

            const [verificar] = await poolConexao.query('SELECT * FROM usuarios WHERE email = ? ',[email])

            if (verificar.length > 0) {
               return res.json({sucesso: false, mensagem: 'O email já foi registrado no sistema!'});
                
            } else {
                const senhaHash = await bcrypt.hash(senha, 10);

                await cadastrarDb.cadastrarUsuarios({
                    nome,
                    sobrenome,
                    email,
                    senha: senhaHash,
                    turno
                });
                return res.json({sucesso:true, mensagem: 'Usuario cadastrado com sucesso!'});
            }
        }
        
    } 
    catch (error) {
        console.error("Erro no cadastro de usuario: ", error);
        return res.json({ sucesso: false, mensagem: "Houve um erro interno no sistema!" });
    }
}

const admCadastrar = async (req, res) => {
    const {nome, sobrenome, email, senha, senhaSecond, tipo, turno, status} = req.body;
    console.log(nome, sobrenome, email, senha, senhaSecond, tipo, turno)
    const regex = /^[a-zA-Z]/       
        
        if (!nome || typeof nome == undefined || nome == null || !sobrenome || typeof sobrenome == undefined || sobrenome == null || !email || typeof email == undefined || email == null || !turno || typeof turno == undefined || turno == null || !tipo || typeof tipo == undefined || tipo == null || !status || typeof status == undefined || status == null) {
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
        
        } else if (tipo === 'moderador' && status === 'pendente') {
            return res.status(400).json({sucesso: false, mensagem: 'O moderador não pode ter status pendente' });
        
        } else if (tipo === 'moderador' && status === 'bloqueado') {
            return res.status(400).json({sucesso: false, mensagem: 'O moderador não pode ter status bloqueado' });
        
        } else {
            const [verificar] = await poolConexao.query('SELECT * FROM usuarios WHERE email = ?',[email]);

            if (verificar.length > 0) {
                 return res.json({sucesso: false, mensagem: 'O email já foi registrado no sistema!'});
            
            } else {
                const senhaHash = await bcrypt.hash(senha, 10);

                await cadastrarDb.admCadastrar ({
                    nome,
                    sobrenome,
                    email,
                    senha: senhaHash,
                    tipo,
                    turno,
                    status
                })
                return res.json({sucesso:true, mensagem: 'Usuario cadastrado com sucesso!'});
            }
        }
}

module.exports = {cadastrar, admCadastrar}