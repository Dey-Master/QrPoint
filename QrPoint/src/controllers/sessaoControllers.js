const sessao = async (req, res) => {
    if(!req.session.user) {
        return res.json({logado: false});
    }
    const usuario = req.session.user;

    res.json({
        logado: true,  
        id: usuario.id,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        email: usuario.email,
        turno: usuario.turno,
        tipo: usuario.tipo,
        status: usuario.status
    });
}
module.exports = {sessao};