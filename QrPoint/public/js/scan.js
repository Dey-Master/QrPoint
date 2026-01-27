const resultado = document.getElementById('resultado');
const mensagem = document.getElementById('mensagem');

const turno = document.getElementById('turno');
const entrada = document.getElementById('entrada');
const saida = document.getElementById('saida');
const status = document.getElementById('status');
const data = document.getElementById('data');

const direction = document.getElementById('direction');
direction.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = '/views/pages_user/user-dashboard'
})

// Recupera dados da sessão via endpoint
const carregarPresenca = async () => {
    try {
        const respostaFetch = await fetch('/api/presenca', { credentials: 'same-origin' });
        const resposta = await respostaFetch.json();

        if (!resposta.sucesso) {
            resultado.className = 'resultado erro';
            mensagem.textContent = resposta.mensagem || 'Erro ao carregar dados';
            return;
        }

        // LÓGICA VISUAL
        if (resposta.tipo === 'entrada') {
            resultado.className = 'resultado sucesso';
            mensagem.textContent = resposta.mensagem;
            status.textContent = resposta.status.toUpperCase();
            status.classList.add(resposta.status);
        }

        if (resposta.tipo === 'saida') {
            resultado.className = 'resultado saida';
            mensagem.textContent = resposta.mensagem;
        }

        // Formatar data
        const [ano, mes, dia] = resposta.data.split('-');
        const dataFormatada = `${dia}/${mes}/${ano}`;
        data.textContent = dataFormatada;

        // Formatar horários
        if (resposta.horaEntrada) {
            entrada.textContent = resposta.horaEntrada.slice(0, 5);
        }
        if (resposta.horaSaida) {
            saida.textContent = resposta.horaSaida.slice(0, 5);
        }

        if (resposta.turno) {
            const turnoTexto = resposta.turno === 'manha' ? 'MANHÃ' : 'TARDE';
            turno.textContent = turnoTexto;
        }

    } catch (error) {
        console.error('Erro ao carregar presença:', error);
        resultado.className = 'resultado erro';
        mensagem.textContent = 'Erro ao carregar dados da presença';
    }
}
window.addEventListener('load', carregarPresenca);
