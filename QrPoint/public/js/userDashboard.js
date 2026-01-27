async function carregarUserDashboard() {
    try {
        const response = await fetch('/userDashboard', { credentials: 'same-origin' });
        const dados = await response.json();
        
        document.getElementById('totalUsuarios').textContent = dados.statusHoje;
        document.getElementById('usuariosPendentes').textContent = dados.entradaHoje;
        document.getElementById('usuariosBloqueados').textContent = dados.saidaHoje;
        document.getElementById('usuariosAdministradores').textContent = dados.qrAtivos;
        
    } catch (error) {
        console.error('Erro ao carregar dados da dashboard: ', error);

    }
}

document.addEventListener('DOMContentLoaded', carregarUserDashboard);

setInterval(carregarUserDashboard, 1500);