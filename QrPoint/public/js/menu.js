
const sessao = async () => {
    try {
        const url = '/sessao';
        const dados = await fetch (url, {credentials: 'same-origin'});
        const resposta = await dados.json();
        
        if (!resposta) return;
        
        const nome = resposta.nome ?? 'Usuario';
        const sobrenome = resposta.sobrenome ?? '';
        const email = resposta.email ?? '';

        const nameUser = document.querySelector('.name-user');
        const letra = document.querySelector('.letra-sessao');
        const nomeCompleto = document.querySelector('.user-sessao h4');
        const emailSpan = document.querySelector('.email-sessao');
        
        if (letra) letra.textContent = (nome[0] || 'U').toUpperCase();
        if (nomeCompleto) nomeCompleto.textContent = `${nome} ${sobrenome}`;
        if (emailSpan) emailSpan.textContent = email ?? '';
        if(nameUser) nameUser.textContent = (`Olá, ${nome} ${sobrenome}`)
            
    } catch (error) {
        console.error('Erro ao carregar dados da sessão:', error);
    }
}
window.addEventListener ('DOMContentLoaded', sessao);

const openModal = document.querySelector('#open-modal');
const closeModal = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');
const fade = document.querySelector('#fade');

const toogleModal = () => {
    modal.classList.toggle('hide');
    fade.classList.toggle('hide');
}

[openModal, closeModal, fade].forEach((el) => {
    el.addEventListener('click', () => toogleModal());
});




const menuItem = document.querySelectorAll('.item-menu')

function selectClick () {
    menuItem.forEach((item) => {
        item.classList.remove('ativo');
    })
    menuItem.classList.add('ativo');
}

menuItem.forEach((item) =>
    item.addEventListener('click', selectClick)
)
