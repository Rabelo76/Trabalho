var listaUsuarios = document.getElementById('lista-usuarios');

fetch('http://localhost:3000/cadastrados')
    .then(function(resposta) {
        if (!resposta.ok) {
            throw new Error('Não foi possível carregar os usuários.');
        }
        return resposta.json();
    })
    .then(function(usuarios) {
        usuarios.forEach(function(usuario) {
            var linha = document.createElement('tr [tabindex="0"]');
            linha.innerHTML =
                '<td >' + usuario.id + '</td>' +
                '<td>' + usuario.nome + ' ' + usuario.sobrenome + '</td>' +
                '<td>' + usuario.cpf + '</td>' +
                '<td>' + usuario.email + '</td>' +
                '<td>' + (usuario.papel || 'usuario') + '</td>';
            listaUsuarios.appendChild(linha);
        });

        if (usuarios.length === 0) {
            listaUsuarios.innerHTML = '<tr tabindex="0"><td colspan="5">Nenhum usuário cadastrado.</td></tr>';
        }
    })
    .catch(function(erro) {
        console.error(erro);
        listaUsuarios.innerHTML = '<tr tabindex="0"><td colspan="5">Não foi possível carregar os usuários. Verifique se o servidor está rodando.</td></tr>';
    });
