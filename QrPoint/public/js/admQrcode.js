const formQr = document.getElementById('formCriarQr');
const mensagemBox = document.querySelector('.box-mensagem');
const tbody = document.querySelector ('#tabela-qrcodes tbody');

formQr.addEventListener('submit', async (event) => {
    event.preventDefault();

    const turnoCheck = [];
    document.querySelectorAll('input[class="turnos[]"]:checked').forEach(checkbox => {turnoCheck.push(checkbox.value);})

    const dados = {
        data : document.getElementById('data').value,
        horaInicio : document.getElementById('hora_inicio').value,
        horaFim : document.getElementById('hora_fim').value,
        turnos: turnoCheck
    }

    const config = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        credentials: 'same-origin',
        body: JSON.stringify(dados)
    }

    try {
        const url = '/qrcode';
        const qrcode = await fetch (url, config);
        const resposta = await qrcode.json();

        if(resposta.sucesso) {
            mostrarMensagem(resposta.mensagem, 'sucesso');
            
            carregarQrcodes()
            toogleModalQr();
            carregarQrAtivo();

            formQr.reset();

        } else {
            mostrarMensagem(resposta.mensagem, 'erro');
        }     
        
    } catch (error) {
        mostrarMensagem("Erro ao conectar com servidor, tente novamente!", error);
    }
    
});

async function carregarQrAtivo() {
    try {
        const resposta = await fetch('/qrcode/ativo', { credentials: 'same-origin' });
        const dados = await resposta.json();

        if (dados.existe) {
            renderizarQr(dados.qr);
        } else {
            renderizarQr(null);
        }
    } catch (error) {
        console.error('Erro ao carregar QR ativo', error);
    }
}
document.addEventListener('DOMContentLoaded', carregarQrAtivo);


function renderizarQr(qr) {
    const img = document.getElementById('qr-img');
    const vazio = document.getElementById('qr-empty');
    
    if (!qr) {
        img.classList.add('hideQrcode');
        vazio.classList.remove('hideQrcode');
        
        document.getElementById('qr-data').textContent = '--';
        document.getElementById('qr-turnos').textContent = '--';
        document.getElementById('qr-validade').textContent = '--';
        document.getElementById('qr-status').textContent = '--';
        return;
    }
    
    img.src = qr.qrPath;
    img.classList.remove('hideQrcode');
    vazio.classList.add('hideQrcode');
    
    document.getElementById('qr-data').textContent = new Date(qr.data).toLocaleDateString('pt-PT');
    document.getElementById('qr-turnos').innerHTML = qr.turnos;
    document.getElementById('qr-validade').textContent = `${qr.horaInicio.slice(0,5)} - ${qr.horaFim.slice(0,5)}`;
    document.getElementById('qr-status').textContent = `${qr.status}🟢`;

    // const statusEl = document.getElementById('qr-status');

    // if (qr.status === 'ativo') statusEl.textContent = 'ATIVO 🟢';
    // if (qr.status === 'pendente') statusEl.textContent = 'AGUARDANDO ⏳';
    // if (qr.status === 'expirado') statusEl.textContent = 'EXPIRADO 🔴';
}


const openModalQr = document.querySelector('#open-modalQr');
    const closeModalQr = document.querySelector('#btnCancelar');
    const modalQr = document.querySelector('#modalQr');
    const fadeQr = document.querySelector('#fadeQr');

    const toogleModalQr = () => {
        modalQr.classList.toggle('hideQr');
        fadeQr.classList.toggle('hideQr');
    }

    [openModalQr, closeModalQr, fadeQr].forEach((el) => {
        el.addEventListener('click', () => toogleModalQr());
    });


const carregarQrcodes = async () => {
    try {
        const resposta = await fetch('/admQrcodesTable', { credentials: 'same-origin' });
        const qrcodes = await resposta.json();

        tbody.innerHTML = '';

        qrcodes.forEach(qr => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${new Date(qr.data).toLocaleDateString('pt-PT')}</td>

                <td>${qr.horaInicio.slice(0,5)}</td>

                <td>${qr.horaFim.slice(0,5)}</td>

                <td>
                    <span class="turno ${qr.turnos 
                        ? qr.turnos.toLowerCase().split(',').map(t => t.trim()).join(' ') : ''}">
                        ${qr.turnos ? qr.turnos.toUpperCase() : ''}
                    </span>
                </td>

                <td>${qr.criadoPor || '---'}</td>

                <td>
                    <span class="status ${qr.status || ''}">
                        ${qr.status ? qr.status.toUpperCase() : ''}
                    </span>
                </td>

                <td>${new Date(qr.createdAt).toLocaleDateString('pt-PT')}</td>

                <td>
                    <button class="btn-edit" dados-id="${qr.id}">
                        <i class="bi bi-eye-fill"></i>
                    </button>

                    <button class="btn-delete" dados-id="${qr.id}">
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
window.addEventListener('DOMContentLoaded', carregarQrcodes);

// ===== POLLING DO QR ATIVO =====
let ultimoStatusQr = null;

setInterval(async () => {
    try {
        const resposta = await fetch('/qrcode/ativo', { credentials: 'same-origin' });
        const dados = await resposta.json();
        
        // Se não existir QR ativo
        if (!dados.existe) {
            if (ultimoStatusQr !== 'nenhum') {
                renderizarQr(null);
                ultimoStatusQr = 'nenhum';
                carregarQrcodes()

            }
            return;
        }
        
        // Só atualiza se o status mudou
        if (dados.qr.status !== ultimoStatusQr) {
            renderizarQr(dados.qr);
            ultimoStatusQr = dados.qr.status;
            carregarQrcodes()
        }

    } catch (error) {
        console.error('Erro no polling do QR', error);
    }
}, 5000);

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
        const url = `/delete/qrcode/${excluirQrcode}`;
        const deletar = await fetch(url, config);
        const resposta = await deletar.json();

        if(resposta.sucesso) {
                mostrarMensagem(resposta.mensagem, 'sucesso');
                
                fecharModalDelete();
                carregarQrcodes()
                carregarQrAtivo();

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