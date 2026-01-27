async function carregarAdminDashboard() {
    try {
        const response = await fetch('/admDashboard', { credentials: 'same-origin' });
        const dados = await response.json();
        
        document.getElementById('totalUsuarios').textContent = dados.presencasHoje;
        document.getElementById('usuariosPendentes').textContent = dados.atrasosHoje;
        document.getElementById('usuariosBloqueados').textContent = dados.faltasHoje;
        document.getElementById('usuariosAdministradores').textContent = dados.qrAtivos;
        
    } catch (error) {
        console.error('Erro ao carregar dados da dashboard: ', error);
    }
}

document.addEventListener('DOMContentLoaded', carregarAdminDashboard);

setInterval(carregarAdminDashboard, 1500);
