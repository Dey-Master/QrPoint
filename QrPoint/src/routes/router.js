const userAuth = require('../middleware/UserAuth');
const adminAuth = require('../middleware/adminAuth');
const loginControllers = require('../controllers/loginControllers');
const logoutControllers = require('../controllers/logoutControllers')
const cadastrarControllers = require ('../controllers/cadastrarControllers');
const sessaoControllers = require ('../controllers/sessaoControllers');
const dadosUsersControllers = require ('../controllers/dadosUsersControllers');
const admDeleteUserControllers = require('../controllers/admDeleteUserControllers');
const admUsersTableDb = require('../models/admUsersTableDb');
const admUsersDb = require('../models/admUsersDb');
const admUpdateUserControllers = require('../controllers/admUpdateUserControllers');
const admQrcodeControllers = require('../controllers/admQrcodeControllers');
const admSelectQrcodeControllers = require('../controllers/admSelectQrcodeControllers')
const admSelectQrcode = require('../models/admSelectQrcode')
const admDeleteQrcodeControllers = require ('../controllers/admDeleteQrcodeControllers')
const presencaQrControllers = require('../controllers/presencaQrControllers')
const admSelectPresencaControllers = require('../controllers/admSelectPresencaControllers');
const admDeletePresencaControllers = require('../controllers/admDeletePresencaControllers');
const apiPresencaControllers = require('../controllers/apiPresencaControllers');
const userSelectControllers =  require('../controllers/userSelectControllers');
const userSelectDb = require('../models/userSelectDb');
const admDashboardControllers = require('../controllers/admDashboardControllers');
const userDashboardControllers = require('../controllers/userDashboardControllers');
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended:true}));
router.use(express.json());

//rotas publicas
router.post('/cadastrar', cadastrarControllers.cadastrar);
router.post('/login', loginControllers.login);
router.get('/sessao', sessaoControllers.sessao);

//rotas com sessoes
router.get('/logout', logoutControllers.logout);
router.put('/updatePerfil/:id', admUpdateUserControllers.atualizarPerfil);

//Rotas do Admin users
router.get('/admDashboard', adminAuth, admDashboardControllers.obterEstatisticas);
router.get('/admCardsUsers',adminAuth, admUsersDb.select);
router.get('/dadosUsers/:id', adminAuth, dadosUsersControllers.dados);
router.get('/admUsersTable',adminAuth, admUsersTableDb.selectTable);
router.post('/admCadastrar', adminAuth, cadastrarControllers.admCadastrar);
router.put('/admUpdateUser/:id', adminAuth, admUpdateUserControllers.atualizar);
router.delete('/delete/:id',adminAuth, admDeleteUserControllers.deletar);

//rotas de qrcodes
router.post ('/qrcode', adminAuth, admQrcodeControllers.criar)
router.get ('/qrcode/ativo', adminAuth, admSelectQrcodeControllers.buscarQrAtivo)
router.get ('/admQrcodesTable', adminAuth, admSelectQrcode.tableQrcodes)
router.delete ('/delete/qrcode/:id', adminAuth, admDeleteQrcodeControllers.deletarQrcode)

//rotas Presenças
router.get('/presenca/:token', presencaQrControllers.scanQr)
router.delete ('/delete/presencaUser/:id', adminAuth, admDeletePresencaControllers.deletarPresenca)
router.get('/admPresencasTable', adminAuth, admSelectPresencaControllers.listarPresencas)
router.get('/api/presenca', apiPresencaControllers.verificarPresenca);

//rotas do usuario
// router.get('/userDados', userAuth, userSelectControllers.tableDados)
router.get('/userDados', userAuth, userSelectDb.tabelaUser)
router.get('/userDashboard', userAuth, userDashboardControllers.obterEstatisticasUser)

module.exports = router;