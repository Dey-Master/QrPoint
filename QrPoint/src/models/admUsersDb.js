const poolConexao = require('../database/database');

const select = async (req, res) => {
        try {
            const [total] =  await poolConexao.query('SELECT COUNT(*) AS total FROM usuarios');
            const [user] =  await poolConexao.query("SELECT COUNT(*) AS user FROM usuarios WHERE tipo = 'user'");
            const [moderador] =  await poolConexao.query("SELECT COUNT(*) AS moderador FROM usuarios WHERE tipo = 'moderador'");
            const [admin] =  await poolConexao.query("SELECT COUNT(*) AS admin FROM usuarios WHERE tipo = 'admin'");
        
            return res.json({
                total: total[0].total,
                user: user[0].user,
                moderador: moderador[0].moderador,
                admin: admin[0].admin
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao buscar usuarios" });
        }
}

module.exports = {select}