const dashboard = document.getElementById('dashboard');
const qrcodes = document.getElementById('qrcodes');
const usuarios = document.getElementById('usuarios');
const presencas = document.getElementById('presencas');
const relatorio = document.getElementById('relatorio');
const perfil = document.getElementById('perfil');

dashboard?.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '/views/pages_adm/adm-dashboard';
});

qrcodes?.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '/views/pages_adm/adm-qrcodes';
});

usuarios?.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '/views/pages_adm/adm-users';
});

presencas?.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '/views/pages_adm/adm-presencas';
});

relatorio?.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '/views/pages_adm/adm-config';
});

perfil?.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '/views/pages_adm/adm-perfil';
});
