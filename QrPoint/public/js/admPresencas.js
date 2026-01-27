const mensagemBox = document.querySelector('.box-mensagem');
const tbody = document.querySelector ('#tabela-presencas tbody');

const inputBuscar = document.getElementById('search');
const turnoFiltro = document.getElementById('turnoFiltro');
const statusFiltro = document.getElementById('statusFiltro');
const dataFiltro = document.getElementById('dataFiltro');

const aplicarFiltros = () => {
    const buscar = inputBuscar.value.toLowerCase().trim();
    const turno = turnoFiltro.value;
    const status = statusFiltro.value;
    const data = dataFiltro.value;

    const linhas = tbody.getElementsByTagName('tr');

    for (let i = 0; i < linhas.length; i++ ) {
        const linha = linhas[i];
        linha.textContent.toLowerCase();
        
        const colunas = linha.getElementsByTagName('td');
        if (colunas.length < 5) continue;
        
        const buscarNomeEmail = (colunas[0].textContent + colunas[1].textContent).toLowerCase();
        const turnoLinha = colunas[2].textContent.trim().toLowerCase();
        const dataLinha = colunas[3].textContent.trim();
        const statusLinha = colunas[6].textContent.trim().toLowerCase();

        const condicaoBusca = buscar.length < 2 || buscarNomeEmail.includes(buscar);
        const condicaoTurno = !turno || turnoLinha === turno;
        const condicaoStatus = !status || statusLinha === status;

        let condicaoData = true;
        if (data) {
            const [ano, mes, dia] = data.split('-');
            const dataFormatada = `${dia}/${mes}/${ano}`;
            condicaoData = dataLinha === dataFormatada;
        }

        if (condicaoBusca && condicaoTurno && condicaoStatus && condicaoData) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    }
}

inputBuscar.addEventListener('keyup', aplicarFiltros);
turnoFiltro.addEventListener('change', aplicarFiltros);
statusFiltro.addEventListener('change', aplicarFiltros);
dataFiltro.addEventListener('change', aplicarFiltros);

const carregarPresencas = async () => {
    try {
        const resposta = await fetch('/admPresencasTable', { credentials: 'same-origin' });
        const json = await resposta.json();

        if (!json.sucesso) return;
        const presencas = json.dados;

        tbody.innerHTML = '';

        presencas.forEach(presenca => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>
                    ${capitalizarNome(presenca.nome)} ${capitalizarNome(presenca.sobrenome)}</td>
                <td>
                    <span class="email ${presenca.email || ''}">
                        ${presenca.email ? presenca.email.toLowerCase() : ''}
                    </span>
                </td>
                <td>
                    <span class="turno ${presenca.turno || ''}">
                        ${presenca.turno ? presenca.turno.toUpperCase() : ''}
                    </span>
                </td>
                <td>${new Date(presenca.data).toLocaleDateString('pt-PT')}</td>

                <td>
                    <span class="horaEntrada ${presenca.horaEntrada || '--:--'}}">
                        ${presenca.horaEntrada ? presenca.horaEntrada.slice(0,5) : '--:--'}
                    </span>
                </td>

                <td>
                    <span class="horaSaida ${presenca.horaSaida || '--:--'}}">
                        ${presenca.horaSaida ? presenca.horaSaida.slice(0,5) : '--:--'}
                    </span>
                </td>
                <td>
                    <span class="status ${presenca.status || ''}">
                        ${presenca.status ? presenca.status.toUpperCase() : ''}
                    </span>
                </td>
                <td>
                    <button class="btn-edit" dados-id="${presenca.id}">
                        <i class="bi bi-eye-fill"></i>
                    </button>

                    <button class="btn-delete" dados-id="${presenca.id}">
                        <i class="bi bi-trash" style="color:#EF4444"></i>
                    </button>
                </td>
            `;

            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar QR Codes:', error);
    }
};
window.addEventListener('DOMContentLoaded', carregarPresencas);

const openModalDelete = document.querySelector ('#open-modalDelete');
const deleteModal = document.querySelector ('#close-delete');
const modalDelete = document.querySelector ('#modal-delete');
const fadeDelete = document.querySelector ('#fade-delete');

let excluirQrcode = null;

tbody.addEventListener('click', (event) => {
    const btnDelete = event.target.closest('.btn-delete');
    
    if (!btnDelete) return;
    
    const id = btnDelete.getAttribute('dados-id');
    if (!id) return;

    excluirQrcode = id;

    abrirModalDelete();
});

function abrirModalDelete() {
    modalDelete.classList.remove('hides');
    fadeDelete.classList.remove('hides');
};

function fecharModalDelete() {
    modalDelete.classList.add('hides');
    fadeDelete.classList.add('hides');

    excluirQrcode = null;
};

[deleteModal, fadeDelete].forEach((el) => {
    el.addEventListener('click', fecharModalDelete)
});

const deleteUser = document.querySelector('.delete');

deleteUser?.addEventListener('click', async (event) => {
    event.preventDefault()

    config = {
        method: 'DELETE',
        Headers: {'Content-Type':'application/json'}
    }
    try {
        const url = `/delete/presencaUser/${excluirQrcode}`;
        const deletar = await fetch(url, config);
        const resposta = await deletar.json();

        if(resposta.sucesso) {
                mostrarMensagem(resposta.mensagem, 'sucesso'); 
                fecharModalDelete()       
                carregarPresencas();

            } else {
                mostrarMensagem(resposta.mensagem, 'erro');
            }
    } catch (error) {
        mostrarMensagem("Erro ao conectar com servidor, tente novamente!", error);
    };
});
    
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


function capitalizarNome (texto){
            if (!texto) return '';  
            return texto.toLowerCase().split(' ').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1)).join('');
};

// ===== POLLING CARREGAR LISTA =====
let cachePresencas = '';

setInterval(async () => {
    try {
        const resposta = await fetch('/admPresencasTable', {
            credentials: 'same-origin'
        });

        const json = await resposta.json();
        if (!json.sucesso) return;

        const novoHash = JSON.stringify(json.dados);

        if (novoHash !== cachePresencas) {
            cachePresencas = novoHash;
            renderizarTabela(json.dados);
        }

    } catch (error) {
        console.error('Erro no polling presenças', error);
    }
}, 1500);

function renderizarTabela(presencas) {
    tbody.innerHTML = '';

    presencas.forEach(presenca => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                ${capitalizarNome(presenca.nome)} ${capitalizarNome(presenca.sobrenome)}</td>
            <td>
                <span class="email ${presenca.email || ''}">
                    ${presenca.email ? presenca.email.toLowerCase() : ''}
                </span>
            </td>
            <td>
                <span class="turno ${presenca.turno || ''}">
                    ${presenca.turno ? presenca.turno.toUpperCase() : ''}
                </span>
            </td>
            <td>${new Date(presenca.data).toLocaleDateString('pt-PT')}</td>

            <td>
                <span class="horaEntrada ${presenca.horaEntrada || '--:--'}}">
                    ${presenca.horaEntrada ? presenca.horaEntrada.slice(0,5) : '--:--'}
                </span>
            </td>

            <td>
                <span class="horaSaida ${presenca.horaSaida || '--:--'}}">
                    ${presenca.horaSaida ? presenca.horaSaida.slice(0,5) : '--:--'}
                </span>
            </td>
            <td>
                <span class="status ${presenca.status || ''}">
                    ${presenca.status ? presenca.status.toUpperCase() : ''}
                </span>
            </td>
            <td>
                <button class="btn-edit" dados-id="${presenca.id}">
                    <i class="bi bi-eye-fill"></i>
                </button>

                <button class="btn-delete" dados-id="${presenca.id}">
                    <i class="bi bi-trash" style="color:#EF4444"></i>
                </button>
            </td>`;
        tbody.appendChild(tr);
    });

    aplicarFiltros();
}
