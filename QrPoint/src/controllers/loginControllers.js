const poolConexao = require('../database/database');
const bcrypt = require('bcryptjs');
const express = require('express');
const app = express()


const login = async (req, res) => {
    
    try {
        const {email, senha} = req.body;

        if (!email || typeof email == undefined || email == null || !senha || typeof senha == undefined || senha == null) {
            return res.json({sucesso:false, mensagem: 'Por favor Preencha os campos!'});

        } else if (senha.length < 6) {
            return res.json({sucesso:false, mensagem: 'A senha precisa ter + de 6 caracteres!'});
        
        } else {
           const [linha] = await poolConexao.query('SELECT id, nome, sobrenome, email, senha, turno, tipo, status  FROM usuarios WHERE email = ?', [email]);
           
           if (linha.length == 0) {
                return res.json({sucesso: false, mensagem: 'Usuario não encontrado no sistema!'});
                           
            } 
            const senhaCorreta = await bcrypt.compare(senha, linha[0].senha);
            
            if (!senhaCorreta) {
                return res.json({sucesso: false, mensagem: 'Credencias invalidas!'});
            
            }
            const status = linha[0].status;

            if(status == 'pendente') {
                return res.json({sucesso: false, mensagem: 'Por favor, aguarde a ativação da conta!'});
            
            } else if (status == 'bloqueado') {
                return res.json({sucesso: false, mensagem: 'Esse usuario está banido no sistema!'});

            } 

               const usuario = req.session.user = ({
                    id: linha[0].id,
                    nome: linha[0].nome,
                    sobrenome: linha[0].sobrenome,
                    email: linha[0].email,
                    turno: linha[0].turno,
                    tipo: linha[0].tipo,
                    status: linha[0].status
                });

                await poolConexao.query('UPDATE usuarios SET session_id = ? WHERE id = ?', [req.sessionID, usuario.id]);

                console.log("Sessão criada:", usuario);
                // if (usuario.tipo === 'user') return res.redirect(`/views/pages_user/user-dashboard.html`);
                // if (usuario.tipo === 'moderador' || usuario.tipo === 'admin') return res.redirect(`/views/pages_adm/adm-dashboard.html`);
                return res.json({sucesso: true, mensagem: 'Logado com sucesso!', tipo: usuario.tipo});
            };
        
        
    } catch (error) {
        console.error("Erro no login de usuario: ", error);
        return res.json({ sucesso: false, mensagem: "Houve um erro interno no sistema!" });
    };
    

};

module.exports = { login };