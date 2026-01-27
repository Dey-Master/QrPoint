const poolConexao = require('../database/database');

const cadastrarUsuarios = async (dados) => {
    try {
        const sql = 'INSERT INTO usuarios (nome, sobrenome, email, senha, turno) VALUES (?,?,?,?,?)';
        
        const valores = [
            dados.nome,
            dados.sobrenome,
            dados.email,
            dados.senha,
            dados.turno
        ];
        await poolConexao.query(sql,valores);
        return {sucesso:true};
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao cadastrar usuarios" });
    }
};

const admCadastrar = async (dados) => {
    try {
        const sql = 'INSERT INTO usuarios (nome, sobrenome, email, senha, tipo, turno, status) VALUES (?,?,?,?,?,?,?)';

        const valores = [
            dados.nome,
            dados.sobrenome,
            dados.email,
            dados.senha,
            dados.tipo,
            dados.turno,
            dados.status
        ];

        await poolConexao.query(sql, valores)
        return {sucesso:true};
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao cadastrar usuarios" });
    }
    
}


module.exports = {cadastrarUsuarios, admCadastrar};