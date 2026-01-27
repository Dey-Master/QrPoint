const poolConexao = require('../database/database');
const Qrcode = require('qrcode');
const crypto = require('crypto');
const path = require('path');
const admQrcodeModels = require('../models/admQrcodeModels');

const criar = async (req, res) => {
    try {
        const {data, horaInicio, horaFim, turnos} = req.body;
        const usuario = req.session.user

        if (!usuario) return res.status(401).json({ sucesso: false, mensagem: 'Usuário não autenticado' });

        if (!data || String(data) === '') return res.status(400).json({ sucesso: false, mensagem: 'A data é obrigatória' });
        if (!horaInicio || String(horaInicio) === '') return res.status(400).json({ sucesso: false, mensagem: 'Hora de início é obrigatória' });
        if (!horaFim || String(horaFim) === '') return res.status(400).json({ sucesso: false, mensagem: 'Hora fim é obrigatória' });

        const turnosStr = Array.isArray(turnos) ? turnos.join(',') : (turnos || '');
        if (!turnosStr) return res.status(400).json({ sucesso: false, mensagem: 'Selecione ao menos um turno' });

        const agora = new Date()
        const timeAgora = agora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit' });
        const dataHoje = agora.toLocaleDateString('pt-BR', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').reverse().join('-');

        if (horaInicio == horaFim) return res.status(400).json({ sucesso: false, mensagem: 'Horário inicial não pode ser igual ao horário final!'});
        if (horaInicio >= horaFim) return res.status(400).json({ sucesso: false, mensagem: 'Hora final deve ser posterior à hora inicial!'});
        if (data < dataHoje) return res.status(400).json({ sucesso: false, mensagem: 'A data selecionada já passou!'});
        if (data === dataHoje && horaInicio <= timeAgora) return res.status(400).json({ sucesso: false, mensagem: 'O Horário inicial selecionado já passou!'});
        
        const [conflito] = await poolConexao.query(`SELECT id FROM qrcodes WHERE data = ? AND status IN ('ativo', 'pendente') AND (? <= horaFim AND ? >= horaInicio) LIMIT 1`, [data, horaInicio, horaFim]);
        if (conflito.length > 0) return res.status(400).json({sucesso: false, mensagem: 'Já existe um QR Code nesse intervalo de tempo!'});
        
        const [OneQrcode] = await poolConexao.query(`SELECT id FROM qrcodes WHERE data = ? AND status IN ('ativo', 'pendente') LIMIT 1`, [data]);
        if (OneQrcode.length > 0) return res.status(400).json({sucesso: false, mensagem: 'Já existe um QR Code ativo ou pendente para esta data!'});
        
        
        const token = crypto.randomUUID();
        const urlBase ='http://localhost:8081/' /*'http://192.168.1.42:8081'*/;
        const urlQr = `${urlBase}/presenca/${token}`;
        const nomeArquivo = `qr_${token}.png`;
        const pastaQr = path.join(__dirname, '../uploads');
        const caminhoCompleto = path.join(pastaQr, nomeArquivo);
        
        console.log(token)
        await Qrcode.toFile(caminhoCompleto, urlQr, {
            width: 300,
            margin:3
        })

        await admQrcodeModels.criarQrcode ({
            token,
            data,
            horaInicio,
            horaFim,
            qrPath: `/uploads/${nomeArquivo}`,
            createdBy: usuario.id,
            turnos: turnosStr
        })

        const [linha] = await poolConexao.query('SELECT id, data, horaInicio, horaFim, status, turnos FROM qrcodes WHERE data = ?', [data]);

        res.json({
            sucesso: true, 
            mensagem: 'Qrcode criado com sucesso!', 
            qrPath: `/uploads/${nomeArquivo}`,
            id: linha[0].id,
            data: linha[0].data,
            horaInicio: linha[0].horaInicio,
            horaFim: linha[0].horaFim,
            turnos: linha[0].turnos,
            status:linha[0].status
    });

        //console.log(token, path, caminhoCompleto, nomeArquivo)
    } catch (error) {
        console.error('Erro no criar controller:', error);
        res.status(500).json({ erro: 'Erro ao criar QR Code' });
    }
}

module.exports = {criar}
