const btnSignIn = document.querySelector('#signin');
const btnSignUp = document.querySelector('#signup');
const body = document.querySelector('body');

btnSignIn.addEventListener('click', () => {
    body.className = 'sign-in-js';
});

btnSignUp.addEventListener('click', () => {
    body.className = 'sign-up-js';
});


function mostrarSenha() {
    const senha = document.querySelector('#senha');
    const btnSenha = document.querySelector('#btn-senha');
    if (senha.type === "password") {
        senha.type = "text";
        btnSenha.className = "bi bi-eye-slash-fill";
    } else {
        senha.type = "password";
        btnSenha.className = "bi bi-eye-fill";
    }
}

function mostrarSenhaV() {
    const senha = document.querySelector('#senhaV');
    const btnSenha = document.querySelector('#btn-senhaV');
    if (senha.type === "password") {
        senha.type = "text";
        btnSenha.className = "bi bi-eye-slash-fill";
    } else {
        senha.type = "password";
        btnSenha.className = "bi bi-eye-fill";
    }
}

function mostrarSenhaF() {
    const senha = document.querySelector('#senhaF');
    const btnSenha = document.querySelector('#btn-senhaF');
    if (senha.type === "password") {
        senha.type = "text";
        btnSenha.className = "bi bi-eye-slash-fill";
    } else {
        senha.type = "password";
        btnSenha.className = "bi bi-eye-fill";
    }
}
