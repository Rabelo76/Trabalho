var usuarioId = localStorage.getItem('usuarioId');
var dadosPerfil = document.getElementById('dados-perfil');

if (!usuarioId) {
    window.location.href = 'signin.html';
} else {
    fetch('http://localhost:3000/cadastrados/' + usuarioId)
        .then(function(resposta) {
            if (!resposta.ok) {
                throw new Error('Usuário não encontrado.');
            }
            return resposta.json();
        })
        .then(function(usuario) {
            dadosPerfil.innerHTML =
                '<p><strong>Nome completo:</strong> ' + usuario.nome + ' ' + usuario.sobrenome + '</p>' +
                '<p><strong>CPF:</strong> ' + usuario.cpf + '</p>' +
                '<p><strong>E-mail:</strong> ' + usuario.email + '</p>';
        })
        .catch(function(erro) {
            console.error(erro);
            dadosPerfil.textContent = 'Não foi possível carregar seus dados. Verifique se o servidor está rodando.';
        });
}
