const form = document.getElementById('form-cadastrar');
const mensagemBox = document.querySelector('.box-mensagem');

form.addEventListener('submit', async(evt) => {
    evt.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        email: document.getElementById('email').value.toLowerCase(),
        senha: document.getElementById('senhaV').value,
        senhaSecond: document.getElementById('senhaF').value,
        turno: document.getElementById('turno').value,
    }

   /* const labelBox = dados.closest('label');
    const nameValue = dados.value;

    
    errorSpan.innerHTML = ''

    labelBox.classList.remove('invalid')
    labelBox.classList.add('valid')

    console.log(errorSpan)
    console.log(labelBox)

    if(isEmpty(nameValue)) {
        errorSpan.innerHTML = 'campo obrigatorio'
        labelBox.classList.add('invalid');
        labelBox.classList.remove('valid');
        return;
    }*/


   const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    };

    try {
        const url = '/cadastrar';
        const cadastrar = await fetch(url, config);
        const resposta = await cadastrar.json();

        if(resposta.sucesso) {
            mostrarMensagem(resposta.mensagem, 'sucesso');
            form.reset();

        } else {
            mostrarMensagem(resposta.mensagem, 'erro');
        }       

    } catch (error) {
        mostrarMensagem("Erro ao conectar com servidor, tente novamente!", error);
    }
    


})

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