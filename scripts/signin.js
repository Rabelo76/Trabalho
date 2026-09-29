function entrar(evento) {
    evento.preventDefault();
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var mensagemLogin = document.getElementById('mensagem-login');

    mensagemLogin.textContent = '';

    fetch('http://localhost:3000/cadastrados')
    .then(resposta => resposta.json())
    .then(data => {

        var login = data.find(user => user.email === email && user.senha === senha);
        
        if (login) {
            localStorage.setItem('usuarioId', login.id);
            localStorage.setItem('usuarioCpf', login.cpf);
            if (login.papel === 'admin') {
                window.location.href = "../pages/home-policial.html";
            } else {
                window.location.href = "../pages/home-usuario.html";
            }
        } else {
            mensagemLogin.textContent = 'E-mail ou senha incorretos. Tente novamente.';
        }
    })
    .catch(function() {
        mensagemLogin.textContent = 'Não foi possível acessar o servidor. Tente novamente mais tarde.';
    })
}
