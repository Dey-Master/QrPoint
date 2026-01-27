const formLogin = document.getElementById('form-login');

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    dados = {
        email: document.getElementById('emailL').value,
        senha: document.getElementById('senha').value
    };

    config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(dados)
    };

    try {
        const url = '/login';
        const login = await fetch(url, config);
        const resposta = await login.json();

        if(resposta.sucesso) {
            mostrarMensagem(resposta.mensagem, 'sucesso');
            
            setTimeout(() => {
                if (resposta.tipo === 'user') {
                    window.location.href = '/views/pages_user/user-dashboard';
                
                } else if (resposta.tipo === 'moderador' || resposta.tipo === 'admin') {
                    window.location.href = '/views/pages_adm/adm-dashboard';
                }
            }, 2400);
            formLogin.reset();

        } else {
            mostrarMensagem(resposta.mensagem, 'erro');
        }

    } catch (error) {
        mostrarMensagem("Erro ao conectar com servidor, tente novamente!", error);
    }
        
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