var cpfUsuario = localStorage.getItem('usuarioCpf');
var listaMeusBo = document.getElementById('lista-meus-bo');

if (!cpfUsuario) {
    window.location.href = 'signin.html';
} else {
    fetch('http://localhost:3000/relatorio?cpf_usuario=' + encodeURIComponent(cpfUsuario))
        .then(function(resposta) {
            if (!resposta.ok) {
                throw new Error('Não foi possível carregar os boletins.');
            }
            return resposta.json();
        })
        .then(function(boletins) {
            if (boletins.length === 0) {
                listaMeusBo.innerHTML = '<tr tabindex="0"><td colspan="5">Você ainda não possui B.Os registrados.</td></tr>';
                return;
            }

            boletins.forEach(function(boletim) {
                var incidente = boletim.info_incidente || {};
                var linha = document.createElement('tr');
                linha.setAttribute('tabindex', '0');
                linha.innerHTML =
                    '<td>' + boletim.id + '</td>' +
                    '<td>' + (incidente.data_incidente || 'Não informado') + '</td>' +
                    '<td>' + (boletim.natureza_incidente || 'Não informada') + '</td>' +
                    '<td>' + (boletim.processo_bo || 'Em Andamento') + '</td>' +
                    '<td>' + (boletim.comentario_policial || 'Ainda não há comentário do policial.') + '</td>';
                listaMeusBo.appendChild(linha);
            });
        })
        .catch(function(erro) {
            console.error(erro);
            listaMeusBo.innerHTML = '<tr tabindex="0"><td colspan="5">Não foi possível carregar os B.Os. Verifique se o servidor está rodando.</td></tr>';
        });
}
