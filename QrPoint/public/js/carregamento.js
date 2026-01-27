// Sistema de Animação de Carregamento Global
class CarregamentoAnimacao {
    constructor() {
        this.loading = document.getElementById('loading');
        
        // Inicia visível quando a página carrega
        if (this.loading) {
            this.loading.classList.remove('hideLoading');
        }
        
        // Desaparece automaticamente após 1 segundo
        setTimeout(() => {
            this.esconder();
        }, 1000);
    }

    mostrar() {
        if (this.loading) {
            this.loading.classList.remove('hideLoading');
        }
    }

    esconder() {
        if (this.loading) {
            this.loading.classList.add('hideLoading');
        }
    }
}

// Inicializa globalmente
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.carregamento = new CarregamentoAnimacao();
    });
}
