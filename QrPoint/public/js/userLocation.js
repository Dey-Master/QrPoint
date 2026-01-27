const dashboard = document.getElementById('dashboard');
const historico = document.getElementById('historico');
const perfil = document.getElementById('perfil');

dashboard?.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = '/views/pages_user/user-dashboard';
});
historico?.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = '/views/pages_user/user-historico';
});
perfil?.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = '/views/pages_user/user-perfil';
});