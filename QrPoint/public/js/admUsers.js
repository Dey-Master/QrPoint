const mensagemBox = document.querySelector('.box-mensagem');
const tbody = document.querySelector ('#tabela-usuarios tbody');

const inputBuscar = document.getElementById('search');
const turnoFiltro = document.getElementById('turnoFiltro');
const statusFiltro = document.getElementById('statusFiltro');
const tipoFiltro = document.getElementById('tipoFiltro');

const aplicarFiltros = () => {
    const buscar = inputBuscar.value.toLowerCase().trim();
    const turno = turnoFiltro.value.toLowerCase();
    const status = statusFiltro.value.toLowerCase();
    const tipo = tipoFiltro.value.toLowerCase();

    const linhas = tbody.getElementsByTagName('tr');

    for (let i = 0; i < linhas.length; i++ ) {
        const linha = linhas[i];
        linha.textContent.toLowerCase();
        
        const colunas = linha.getElementsByTagName('td');
        if (colunas.length < 5) continue;
        
        const buscarNomeEmail = (colunas[0].textContent + colunas[1].textContent).toLowerCase();
        const turnoLinha = colunas[2].textContent.trim().toLowerCase();
        const tipoLinha = colunas[3].textContent.trim().toLowerCase();
        const statusLinha = colunas[4].textContent.trim().toLowerCase();

        const condicaoBusca = buscar.length < 2 || buscarNomeEmail.includes(buscar);
        const condicaoTurno = !turno || turnoLinha === turno;
        const condicaoStatus = !status || statusLinha === status;
        const condicaoTipo = !tipo || tipoLinha === tipo;

        if (condicaoBusca && condicaoTurno && condicaoStatus && condicaoTipo) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    }
}

inputBuscar.addEventListener('keyup', aplicarFiltros);
turnoFiltro.addEventListener('change', aplicarFiltros);
statusFiltro.addEventListener('change', aplicarFiltros);
tipoFiltro.addEventListener('change', aplicarFiltros);

window.addEventListener('DOMContentLoaded', () => {
    carregarUsuarios();
    aplicarFiltros();
})


const numeroUsuarios = async () => {
    try {

        const dadosUser = await fetch('/admCardsUsers', {credentials: 'same-origin'})
        const users = await dadosUser.json();

        const todos = document.querySelector('#totalUsuarios');
        todos.textContent = users.total;

        const user = document.querySelector('#usuariosUser');
        user.textContent = users.user;

        const moderador = document.querySelector('#usuariosModeradores');
        moderador.textContent = users.moderador;

        const admin = document.querySelector('#usuariosAdmin');
        admin.textContent = users.admin;


    } catch (error) {
        console.error("Erro ao carregar numero de usuarios usuarios: ", error);
    }
}
window.addEventListener("DOMContentLoaded", numeroUsuarios);


const carregarUsuarios = async () => {
    try {
        const resposta = await fetch ('/admUsersTable', {credentials: 'same-origin'});
        const usuarios = await resposta.json();

        tbody.innerHTML = '';

        usuarios.forEach( usuarios => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>
                    ${capitalizarNome(usuarios.nome)} ${capitalizarNome(usuarios.sobrenome)}</td>
                <td>
                    <span class="email ${usuarios.email || ''}">
                        ${usuarios.email ? usuarios.email.toLowerCase() : ''}
                    </span>
                </td>

                <td>
                    <span class="turno ${usuarios.turno || ''}">
                        ${usuarios.turno ? usuarios.turno.toUpperCase() : ''}
                    </span>
                </td>

                <td>
                    <span class="users ${usuarios.tipo || ''}">
                        ${usuarios.tipo ? usuarios.tipo.toUpperCase() : ''}
                    </span>
                </td>
                <td>
                    <span class="status ${usuarios.status || ''}">
                        ${usuarios.status ? usuarios.status.toUpperCase() : ''}
                    </span>
                </td>

                <td>
                <button class="btn-edit" dados-id="${usuarios.id}">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn-delete" dados-id="${usuarios.id}">
                    <i class="bi bi-trash" style="color: #EF4444;"></i>
                </button>
            </td>`;
            tbody.appendChild(tr);
        })

    } catch (error) {
        console.error("Erro ao carregar usuarios: ", error);
    }
}
window.addEventListener("DOMContentLoaded", carregarUsuarios);



const openModalDelete = document.querySelector ('#open-modalDelete');
const deleteModal = document.querySelector ('#close-delete');
const modalDelete = document.querySelector ('#modal-delete');
const fadeDelete = document.querySelector ('#fade-delete');


let excluirUsuario = null;

tbody.addEventListener('click', (event) => {
    const btnDelete = event.target.closest('.btn-delete');
    if (!btnDelete) return;
    const id = btnDelete.getAttribute('dados-id');
    if (!id) return;

    excluirUsuario = id;

    abrirModalDelete();
});

function abrirModalDelete() {
    modalDelete.classList.remove('hides');
    fadeDelete.classList.remove('hides');
};

function fecharModalDelete() {
    modalDelete.classList.add('hides');
    fadeDelete.classList.add('hides');

    excluirUsuario = null;
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
        const url = `/delete/${excluirUsuario}`;
        const deletar = await fetch(url, config);
        const resposta = await deletar.json();

        if(resposta.sucesso) {
                mostrarMensagem(resposta.mensagem, 'sucesso');
                fecharModalDelete();
                carregarUsuarios();
                numeroUsuarios()

            } else {
                mostrarMensagem(resposta.mensagem, 'erro');
            }
    } catch (error) {
        mostrarMensagem("Erro ao conectar com servidor, tente novamente!", error);
    };
});


const openModalEdit = document.querySelector('#open-modalEdit');
const editModal = document.querySelector('#close-edit');
const modalEdit = document.querySelector('#modal-edit');
const fadeEdit = document.querySelector('#fade-edit');

let editarUsuario = null;

tbody.addEventListener('click', async (event) => {
    const btnEdit = event.target.closest('.btn-edit');
    if (!btnEdit) return;

    const id = btnEdit.getAttribute('dados-id');
    if (!id) return;

    editarUsuario = id;

    abrirModalEdit();
    
    try {
        const url = `/dadosUsers/${editarUsuario}`;
        const dados = await fetch (url, {credentials: 'same-origin'});
        const resposta = await dados.json();

        const inputNome = document.getElementById('nome');
        const inputSobrenome = document.getElementById('sobrenome');
        const inputEmail = document.getElementById('email');
        const inputTurno = document.getElementById('turno');
        const inputTipo = document.getElementById('tipo');
        const inputStatus = document.getElementById('status');

        inputNome.value = resposta.nome || '';
        inputSobrenome.value = resposta.sobrenome || '';
        inputEmail.value = resposta.email || '';
        inputTurno.value = resposta.turno || '';
        inputTipo.value = resposta.tipo || '';
        inputStatus.value = resposta.status || '';


        } catch (error) {
        mostrarMensagem('Erro ao carregar dados do usuário', 'erro');
    }

});

function abrirModalEdit() {
    modalEdit.classList.remove('hideE');
    fadeEdit.classList.remove('hideE');
};

function fecharModalEdit() {
    modalEdit.classList.add('hideE');
    fadeEdit.classList.add('hideE');

    editarUsuario = null;
};

[editModal, fadeEdit].forEach((el) => {
    el.addEventListener('click', fecharModalEdit)
});

const editUser = document.querySelector('#edit');

editUser?.addEventListener('click', async (event) => {
    event.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        email: document.getElementById('email').value,
        turno: document.getElementById('turno').value,
        tipo: document.getElementById('tipo').value,
        status: document.getElementById('status').value
    }

    const config = {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(dados)
    } 
    try {
        const url = `/admUpdateUser/${editarUsuario}`;
        const editar = await fetch(url, config);
        const resposta = await editar.json();

        if(resposta.sucesso) {
                mostrarMensagem(resposta.mensagem, 'sucesso');
                fecharModalEdit();
                carregarUsuarios();
                numeroUsuarios()

            } else {
                mostrarMensagem(resposta.mensagem, 'erro');
            }
    } catch (error) {
        mostrarMensagem("Erro ao conectar com servidor, tente novamente!", error);
    };

});


            const openModalCreate = document.querySelector('#open-modalCreate');
            const createModal = document.querySelector('#close-create');
            const modalCreate = document.querySelector('#modal-create');
            const fadeCreate = document.querySelector('#fade-create');

            const toogleModalCreate = () => {
                modalCreate.classList.toggle('hideC');
                fadeCreate.classList.toggle('hideC');
            }

            [openModalCreate, createModal, fadeCreate].forEach((el) => {
                el.addEventListener('click', () => toogleModalCreate());
            });

const criar = document.getElementById('create');
criar?.addEventListener('click', async (event) => {
    event.preventDefault();

    const dados = {
        nome: document.getElementById('nomeUser').value,
        sobrenome: document.getElementById('sobrenomeUser').value,
        email: document.getElementById('emailUser').value,
        senha: document.getElementById('senhaV').value,
        senhaSecond: document.getElementById('senhaF').value,
        turno: document.getElementById('turnoUser').value,
        tipo: document.getElementById('tipoUser').value,
        status: document.getElementById('statusUser').value
    }

    const config = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(dados)
    }

    const url = '/admCadastrar';
    const cadastrar = await fetch(url, config);
    const resposta = await cadastrar.json();
    
    if(resposta.sucesso) {
        mostrarMensagem(resposta.mensagem, 'sucesso');
        toogleModalCreate();
        carregarUsuarios();
        numeroUsuarios()

        criar?.reset();

    } else {
        mostrarMensagem(resposta.mensagem, 'erro');
    }
    
})






function capitalizarNome (texto){
            if (!texto) return '';  
            return texto.toLowerCase().split(' ').map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1)).join('');
};

function mostrarMensagem(texto, tipo = "sucesso") {
 
    const mensagem = document.createElement('div');
    mensagem.classList.add('mensagem');
    mensagem.classList.add(tipo);

    const icone = tipo === "sucesso" ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-exclamation-circle-fill"></i>';

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