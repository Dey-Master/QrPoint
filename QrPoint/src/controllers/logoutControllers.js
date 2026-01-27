const logout = async (req, res) => {
    setTimeout (() => {

        req.session.destroy( err => {
        res.clearCookie('connect.sid');
        res.redirect('/public/home.html');
        });
    }, 2000);

    console.log("Sessão destruida: ", req.session.destroy);
}

module.exports = {logout};