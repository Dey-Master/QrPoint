const mensagemBox = document.querySelector('.box-mensagem');
let atualizarUser = null

const sessaoPerfil = async () => {
    try {
        const url = '/sessao';
        const dados = await fetch (url, {credentials: 'same-origin'});
        const resposta = await dados.json();
        
        nome = resposta.nome ?? 'Usuario';
        sobrenome = resposta.sobrenome ?? '';
        email = resposta.email ?? '';

        atualizarUser = resposta.id;

        const letraPerfil = document.querySelector('.letra-perfil');
        const nomeCompletoPerfil = document.querySelector('.user-perfil h2');
        const emailPerfil = document.querySelector('.email-perfil');
        const tipoPerfil = document.querySelector('.users');
        const turnoPerfil = document.querySelector('.turno');

        letraPerfil.textContent = `${nome[0]}${sobrenome[0] ?? ''}`.toUpperCase().trim();
        nomeCompletoPerfil.textContent = `${nome} ${sobrenome}`.trim();
        emailPerfil.textContent = email ?? '';
        tipoPerfil.textContent = resposta.tipo.toUpperCase();
        turnoPerfil.textContent = resposta.turno.toUpperCase();

        if (tipoPerfil.textContent === 'MODERADOR') {
            tipoPerfil.classList.add('moderador'); 
            letraPerfil.classList.add('moderador')
        } 
         
        else if (tipoPerfil.textContent === 'ADMIN') {
            tipoPerfil.classList.add('admin');  
            letraPerfil.classList.add('admin')
        } 
        else {
            tipoPerfil.classList.add('user');
            letraPerfil.classList.add('user')
        }

        if (resposta.turno.toUpperCase() === 'MANHA') turnoPerfil.classList.add('manha');
        else turnoPerfil.classList.add('tarde');
        
            
        const btnAbrirModalEdit =  document.getElementById('open-modalEdit');
        if(btnAbrirModalEdit) {
            btnAbrirModalEdit.addEventListener('click', () => {

                const inputNome = document.querySelector('#modal-edit input[placeholder="Inserira o novo Nome"]');
                const inputSobrenome = document.querySelector('#modal-edit input[placeholder="Inserira o novo Sobrenome"]');
                const inputEmail = document.querySelector('#modal-edit input[placeholder="Inserira o novo Email"]');

                if (inputNome) inputNome.value = resposta.nome;
                if (inputSobrenome) inputSobrenome.value = resposta.sobrenome;
                if (inputEmail) inputEmail.value = resposta.email;

            });
        }

        } catch (error) {
            console.error('Erro ao carregar dados da sessão:', error);
        }
 };
window.addEventListener ('DOMContentLoaded', sessaoPerfil);

const salvar = document.getElementById('edit');
salvar?.addEventListener('click', async (event) => {
    event.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senhaV').value,
        senhaSecond: document.getElementById('senhaF').value
    };

    config = {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(dados)
    };  

    try {
        const url = `/updatePerfil/${atualizarUser}`;

        const dadosAtualizados = await fetch (url, config);
        const resposta = await dadosAtualizados.json();

        if (resposta.sucesso) {
            mostrarMensagem("Perfil atualizado com sucesso!", "sucesso");
            toogleModalEdit()
            sessaoPerfil()
        
        } else {
            mostrarMensagem(resposta.mensagem, "erro");
        }
        
    } catch (error) {
        mostrarMensagem("Erro ao atualizar perfil.", "erro");
    }
});

        const openModalEdit = document.querySelector('#open-modalEdit');
        const editModal = document.querySelector('#close-edit');
        const modalEdit = document.querySelector('#modal-edit');
        const fadeEdit = document.querySelector('#fade-edit');

        const toogleModalEdit = () => {
            modalEdit.classList.toggle('hideE');
            fadeEdit.classList.toggle('hideE');
        }

        [openModalEdit, editModal, fadeEdit].forEach((ele) => {
            ele.addEventListener('click', () => toogleModalEdit());
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