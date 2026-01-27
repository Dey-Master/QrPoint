const poolConexao = require('../database/database');
const admPresencasDb = require('../models/admPresencasDb');

const scanQr = async  (req, res) => {

    try {
        const {token} = req.params;
        const usuario = req.session.user

        console.log('Token recebido:', token);
        
        const [qrRows] = await poolConexao.query('SELECT * FROM qrcodes WHERE token = ?', [token]);
        if (!qrRows || qrRows.length === 0) return res.send({sucesso: false, mensagem: 'QR Code inválido!'}); 
        
        const qr = qrRows[0];
        // console.log(qr);
        
        if (qr.status === 'pendente') return res.json({sucesso: false, mensagem: 'Este QR Code está inativo!'});
        if (qr.status === 'expirado') return res.json({sucesso: false, mensagem: 'Este QR Code está expirado!'});
        
        const agora = new Date()
        const timeAgora = agora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit' });
        const dataH = agora.toLocaleDateString('pt-BR', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').reverse().join('-');
        
        if (qr.data.toLocaleDateString('pt-BR', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').reverse().join('-') !== dataH) return res.status(400).json({sucesso: false, mensagem: 'Este QR Code não é válido para hoje!'});
        if (timeAgora < qr.horaInicio || timeAgora > qr.horaFim) return res.status(400).json({sucesso: false, mensagem: 'Este QR Code está fora do horário permitido!'});
        
        // console.log('Usuario recebido:', usuario);
        if(!usuario)  return res.status(401).redirect('/views/login');
        if (usuario.status !== 'aprovado') return res.status(403).json({sucesso: false, mensagem: 'Sua conta não está ativa para registrar presença!'});
        if (usuario.tipo === 'admin' || usuario.tipo === 'moderador') return res.status(403).json({sucesso: false, mensagem: 'Os Moderadores não registram presença!'});

        const dataHoje = new Date().toISOString().slice(0, 10);
        const horaAtual = agora.toTimeString().slice(0, 8);

        const [presencaHoje] = await poolConexao.query(`SELECT id, horaEntrada, horaSaida FROM presencas WHERE userId = ? AND data = ?`,[usuario.id, dataHoje]);
        
        let horaInicioTurno;
        
        if (usuario.turno === 'manha') horaInicioTurno = '08:00:00';
        if (usuario.turno === 'tarde') horaInicioTurno = '12:00:00';
        
        const limiteAtraso = new Date(`${dataHoje}T${horaInicioTurno}`);
        limiteAtraso.setMinutes(limiteAtraso.getMinutes() + 15);

        const horaEntradaDate = new Date(`${dataHoje}T${horaAtual}`);
        const status = horaEntradaDate <= limiteAtraso ? 'pontual' : 'atrasado';

        const horaManha = '08:00:00';
        const horaTarde = '12:00:00';

        if ((usuario.turno === 'manha' && horaAtual >= horaTarde) || (usuario.turno === 'tarde' && horaAtual < horaTarde)) return res.status(409).json({sucesso: false, mensagem: 'O qrcode não é válido para seu turno!'})

        if (presencaHoje.length > 0) {
            const presenca = presencaHoje[0];

            if (presenca.horaSaida) return res.status(409).json({sucesso: false, mensagem: 'A sua presença de hoje já foi finalizada!'});
            
            await poolConexao.query('UPDATE presencas SET horaSaida = ? WHERE userId = ? AND data = ?',
                [horaAtual, usuario.id, dataHoje]);
            
            const [presencaAtualizada] = await poolConexao.query(`SELECT horaEntrada, horaSaida, status FROM presencas WHERE userId = ? AND data = ?`,
                [usuario.id, dataHoje]);
            
            const presencaFinal = presencaAtualizada[0];
            
            req.session.presenca = {
                sucesso: true,
                mensagem: 'Saída registrada com sucesso. Até logo!',
                status: presencaFinal.status,
                tipo: 'saida',
                horaEntrada: presencaFinal.horaEntrada,
                horaSaida: presencaFinal.horaSaida,
                data: dataHoje,
                turno: usuario.turno
            };
            return res.redirect('/views/scan');

        } else {
            await admPresencasDb.cadastrarPresenca({
                userId: usuario.id,
                qrId: qr.id,
                data: dataHoje,
                horaEntrada: horaAtual,
                status: status
            });

            req.session.presenca = {
                sucesso: true,
                mensagem: status === 'pontual'
                    ? 'Entrada registrada com sucesso. Bom trabalho!'
                    : 'Entrada registrada, porém com atraso!',
                status: status,
                tipo: 'entrada',
                horaEntrada: horaAtual,
                data: dataHoje,
                turno: usuario.turno
            };
            return res.redirect('/views/scan');

        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json('Erro no servidor');
    }
}

module.exports = {scanQr}