const btnLogout = document.querySelector(".sair");
const carregando = document.querySelector("#carregando");

btnLogout.addEventListener("click", async () => {
    carregando.classList.remove('hide');

    window.location.href = '/logout';
});