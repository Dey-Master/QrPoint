const mysql = require ('mysql2/promise');

const poolConexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '197208',
    database: 'db_qrpoint',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const testarConexao = async () => {
    try {
        const conexao = await poolConexao.getConnection();
        console.log('Conectado ao MySQL com sucesso!');
        conexao.release()

    } catch (error) {
        console.log('Erro ao conectar ao banco de dados: ', error.mensagem)
    }
}

testarConexao();
module.exports = poolConexao;