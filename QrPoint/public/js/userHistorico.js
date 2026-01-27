const mensagemBox = document.querySelector('.box-mensagem');
const tbody = document.querySelector ('#tabela-historico tbody');

const statusFiltro = document.getElementById('statusFiltro');
const dataFiltro = document.getElementById('dataFiltro');

const aplicarFiltros = () => {
    const status = statusFiltro.value;
    const data = dataFiltro.value;

    const linhas = tbody.getElementsByTagName('tr');

    for (let i = 0; i < linhas.length; i++ ) {
        const linha = linhas[i];
        
        const colunas = linha.getElementsByTagName('td');
        if (colunas.length < 5) continue;
        
        const dataLinha = colunas[0].textContent.trim();
        const statusLinha = colunas[3].textContent.trim().toLowerCase();
        
        // Converte data do filtro (YYYY-MM-DD) para formato da tabela (DD/MM/YYYY)
        let condicaoData = true;
        if (data) {
            const [ano, mes, dia] = data.split('-');
            const dataFormatada = `${dia}/${mes}/${ano}`;
            condicaoData = dataLinha === dataFormatada;
        }
        
        const condicaoStatus = !status || statusLinha === status;

        if (condicaoStatus && condicaoData) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    }
}

statusFiltro.addEventListener('change', aplicarFiltros);
dataFiltro.addEventListener('change', aplicarFiltros);

const carregarDados = async () => {
    try {
        const resposta = await fetch('/userDados', { credentials: 'same-origin' });
        const json = await resposta.json();

        tbody.innerHTML = '';

        json.presencas.forEach(historico => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${new Date(historico.data).toLocaleDateString('pt-PT')}</td>

                <td>
                    <span class="horaEntrada ${historico.horaEntrada || '--:--'}}">
                        ${historico.horaEntrada ? historico.horaEntrada.slice(0,5) : '--:--'}
                    </span>
                </td>

                <td>
                    <span class="horaSaida ${historico.horaSaida || '--:--'}}">
                        ${historico.horaSaida ? historico.horaSaida.slice(0,5) : '--:--'}
                    </span>
                </td>
                <td>
                    <span class="status ${historico.status || ''}">
                        ${historico.status ? historico.status.toUpperCase() : ''}
                    </span>
                </td>
                <td>
                    <button class="btn-edit" dados-id="${historico.id}">
                        <i class="bi bi-eye-fill"></i>
                    </button>
                </td>
            `;

            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar QR Codes:', error);
    }
};
window.addEventListener('DOMContentLoaded', carregarDados);
    
function mostrarMensagem(texto, tipo = "sucesso") {
    const mensagem = document.createElement('div');
    mensagem.classList.add('mensagem');
    mensagem.classList.add(tipo);

    const icone = tipo === "sucesso" 
        ? '<i class="bi bi-check-circle-fill"></i>' 
        : '<i class="bi bi-exclamation-circle-fill"></i>';

    mensagem.innerHTML = icone + '<span>' + texto + '</span>';
    mensagemBox.prepend(mensagem);

    requestAnimationFrame(() => {
        mensagem.classList.add('show');
    });

    setTimeout(() => {
        mensagem.classList.remove('show');

        mensagem.addEventListener('transitionend', () => {
            if (mensagem.parentElement) {
                mensagem.remove();
            }
        });
    }, 2500);
}

// ===== POLLING CARREGAR LISTA =====
// let cachePresencas = '';

// setInterval(async () => {
//     try {
//         const resposta = await fetch('/admPresencasTable', {
//             credentials: 'same-origin'
//         });

//         const json = await resposta.json();
//         if (!json.sucesso) return;

//         const novoHash = JSON.stringify(json.dados);

//         if (novoHash !== cachePresencas) {
//             cachePresencas = novoHash;
//             renderizarTabela(json.dados);
//         }

//     } catch (error) {
//         console.error('Erro no polling presenças', error);
//     }
// }, 1500);

// function renderizarTabela(presencas) {
//     tbody.innerHTML = '';

//     presencas.forEach(presenca => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//             <td>
//                 ${capitalizarNome(presenca.nome)} ${capitalizarNome(presenca.sobrenome)}</td>
//             <td>
//                 <span class="email ${presenca.email || ''}">
//                     ${presenca.email ? presenca.email.toLowerCase() : ''}
//                 </span>
//             </td>
//             <td>
//                 <span class="turno ${presenca.turno || ''}">
//                     ${presenca.turno ? presenca.turno.toUpperCase() : ''}
//                 </span>
//             </td>
//             <td>${new Date(presenca.data).toLocaleDateString('pt-PT')}</td>

//             <td>
//                 <span class="horaEntrada ${presenca.horaEntrada || '---'}}">
//                     ${presenca.horaEntrada ? presenca.horaEntrada.slice(0,5) : '---'}
//                 </span>
//             </td>

//             <td>
//                 <span class="horaSaida ${presenca.horaSaida || '---'}}">
//                     ${presenca.horaSaida ? presenca.horaSaida.slice(0,5) : '---'}
//                 </span>
//             </td>
//             <td>
//                 <span class="status ${presenca.status || ''}">
//                     ${presenca.status ? presenca.status.toUpperCase() : ''}
//                 </span>
//             </td>
//             <td>
//                 <button class="btn-edit" dados-id="${presenca.id}">
//                     <i class="bi bi-eye-fill"></i>
//                 </button>
//             </td>`;
//         tbody.appendChild(tr);
//     });
//     aplicarFiltros();
// }
