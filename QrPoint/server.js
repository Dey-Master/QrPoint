const express = require('express');
const path = require('path');
const session = require('express-session');
const sessionSql = require('express-mysql-session')(session);
const userAuth = require('./src/middleware/UserAuth');
const adminAuth = require('./src/middleware/adminAuth');
const router = require('./src/routes/router');
require('./src/config/expireQrcodes');
require('./src/config/faltaAutomatica');

const server = express();
const PORT = 8081;

const sessionStore = new sessionSql({
    host: 'localhost',
    user: 'root',
    password: '197208',
    database: 'db_qrpoint',
    port: 3306
});

server.use(session({
    secret:'depoisEscolhoUmaSecretParaTi',
    store:sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    }
}));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/', router);
server.use('/public', express.static(__dirname + '/public'));
server.use('/uploads', express.static('src/uploads'));

server.get('/', (req, res) => {
    res.redirect('/public/home.html');
});

server.get("/views/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'));
});

server.get("/views/scan", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/scan.html'));
});

// Rotas privadas do User
server.get('/views/pages_user/user-dashboard', userAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '/views/pages_user/user-dashboard.html'));
});
server.get('/views/pages_user/user-historico', userAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '/views/pages_user/user-historico.html'));
});
server.get('/views/pages_user/user-perfil', userAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '/views/pages_user/user-perfil.html'));
});

// Rotas privadas do Admin
server.get('/views/pages_adm/adm-dashboard', adminAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '/views/pages_adm/adm-dashboard.html'));
});
server.get('/views/pages_adm/adm-qrcodes', adminAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '/views/pages_adm/adm-qrcodes.html'));
});
server.get('/views/pages_adm/adm-users', adminAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '/views/pages_adm/adm-users.html'));
});
server.get('/views/pages_adm/adm-presencas', adminAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '/views/pages_adm/adm-presencas.html'));
});
server.get('/views/pages_adm/adm-config', adminAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '/views/pages_adm/adm-config.html'));
});
server.get('/views/pages_adm/adm-perfil', adminAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '/views/pages_adm/adm-perfil.html'));
});

server.listen(PORT, '192.168.1.42', () => {
    console.log(`Server rodando na Port ${PORT}`);
})