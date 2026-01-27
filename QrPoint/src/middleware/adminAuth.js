function adminAuth(req, res, next) {
    if(!req.session.user || req.session.user.tipo !== 'admin' && req.session.user.tipo !== 'moderador') return res.redirect('/public/404.html');
    
    next();
}

module.exports = adminAuth;