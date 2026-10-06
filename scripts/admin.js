var boletimSelecionado = null;
var listaBo = document.getElementById('lista-bo');
var modal = document.getElementById('modal-bo');
var detalhesBo = document.getElementById('detalhes-bo');
var comentarioPolicial = document.getElementById('comentario_policial');
var processoBo = document.getElementById('processo_bo');
var mensagemAdmin = document.getElementById('mensagem-admin');
var elementoQueAbriuModal = null;

function texto(valor) {
    return valor || 'Não informado';
}

function carregarBoletins() {
    fetch('http://localhost:3000/relatorio')
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Não foi possível carregar os boletins.');
            }
            return resposta.json();
        })
        .then(function (boletins) {
            listaBo.innerHTML = '';

            boletins.forEach(function (boletim) {
                var linha = document.createElement('tr');
                linha.setAttribute('tabindex', '0');

                linha.innerHTML =
                    '<td tabindex="0">' + texto(boletim.id) + '</td>' +
                    '<td tabindex="0">' + texto(boletim.nome) + ' ' + texto(boletim.sobrenome) + '</td>' +
                    '<td tabindex="0">' + texto(boletim.info_incidente && boletim.info_incidente.data_incidente) + '</td>' +
                    '<td tabindex="0">' + texto(boletim.natureza_incidente) + '</td>' +
                    '<td tabindex="0"><span class="status">' + texto(boletim.processo_bo || 'Em Andamento') + '</span></td>' +
                    '<td tabindex="0">' +
                    '<button class="abrir-bo" type="button">Visualizar</button> ' +
                    '<button class="deletar-bo" type="button">Deletar</button>' +
                    '</td>';

                linha.querySelector('.abrir-bo').addEventListener('click', function () {
                    abrirBoletim(boletim, linha);
                });

                linha.querySelector('.deletar-bo').addEventListener('click', function () {
                    deletarBoletim(boletim);
                });

                listaBo.appendChild(linha);

            });

            if (boletins.length === 0) {
                listaBo.innerHTML = '<tr><td tabindex="0" colspan="6">Nenhum boletim registrado.</td></tr>';
            }
        })
        .catch(function (erro) {
            console.error(erro);
            listaBo.innerHTML = '<tr><td tabindex="0" colspan="6">Não foi possível carregar os B.Os. Verifique se o servidor está rodando.</td></tr>';
        });
}

function abrirBoletim(boletim, linha) {
    boletimSelecionado = boletim;
    elementoQueAbriuModal = linha;
    var incidente = boletim.info_incidente || {};
    var endereco = boletim.endereco || {};

    detalhesBo.innerHTML =
        '<p><strong>Relatado por:</strong> ' + texto(boletim.nome) + ' ' + texto(boletim.sobrenome) + '</p>' +
        '<p><strong>Telefone:</strong> ' + texto(boletim.telefone) + '</p>' +
        '<p><strong>Data e hora do incidente:</strong> ' + texto(incidente.data_incidente) + ' às ' + texto(incidente.hora_relatorio) + ' ' + texto(incidente.hora_tipo) + '</p>' +
        '<p><strong>Local:</strong> ' + texto(boletim.local_ocorrencia) + '</p>' +
        '<p><strong>Natureza:</strong> ' + texto(boletim.natureza_incidente) + '</p>' +
        '<p><strong>Detalhes:</strong> ' + texto(boletim.detalhes_incidente) + '</p>' +
        '<p><strong>Motivo:</strong> ' + texto(boletim.motivo_incidente) + '</p>' +
        '<p><strong>Relatório emitido para a polícia:</strong> ' + texto(boletim.relatorio_emitido) + '</p>' +
        '<p><strong>Houve prisão:</strong> ' + texto(boletim.preso) + '</p>' +
        '<p><strong>Endereço informado:</strong> ' + texto(endereco.rua_enreco) + ', ' + texto(endereco.numeroCasa_endereco) + ' — ' + texto(endereco.bairro_endereco) + ', ' + texto(endereco.cidade_endereco) + '/' + texto(endereco.estado_endereco) + '</p>' +
        '<p><strong>Comentários do comunicante:</strong> ' + texto(boletim.comentarios_adicionais) + '</p>';

    comentarioPolicial.value = boletim.comentario_policial || '';
    processoBo.value = boletim.processo_bo || 'Em Andamento';
    modal.classList.add('aberto');
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('fechar-modal').focus();
}

function fecharModal() {
    modal.classList.remove('aberto');
    modal.setAttribute('aria-hidden', 'true');
    boletimSelecionado = null;
    if (elementoQueAbriuModal) {
        elementoQueAbriuModal.focus();
    }
}

document.getElementById('fechar-modal').addEventListener('click', fecharModal);
modal.addEventListener('click', function (evento) {
    if (evento.target === modal) {
        fecharModal();
    }
});

document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && modal.classList.contains('aberto')) {
        fecharModal();
    }
});

document.getElementById('form-atualizacao').addEventListener('submit', function (evento) {
    evento.preventDefault();

    if (!boletimSelecionado) {
        return;
    }

    var boletimAtualizado = Object.assign({}, boletimSelecionado, {
        comentario_policial: comentarioPolicial.value,
        processo_bo: processoBo.value
    });

    fetch('http://localhost:3000/relatorio/' + boletimSelecionado.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(boletimAtualizado)
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Não foi possível salvar a atualização.');
            }
            return resposta.json();
        })
        .then(function () {
            mensagemAdmin.textContent = 'B.O. atualizado com sucesso!';
            fecharModal();
            carregarBoletins();
        })
        .catch(function (erro) {
            console.error(erro);
            mensagemAdmin.textContent = 'Não foi possível atualizar o B.O. Verifique se o servidor está rodando.';
        });
});

function deletarBoletim(boletim) {
    var confirmar = window.confirm(
        'Tem certeza que deseja deletar o B.O. ' + boletim.id + '?'
    );

    if (!confirmar) {
        return;
    }

    fetch('http://localhost:3000/relatorio/' + boletim.id, {
        method: 'DELETE'
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Não foi possível deletar o boletim.');
            }

            return resposta.json();
        })
        .then(function () {
            mensagemAdmin.textContent = 'B.O. deletado com sucesso!';
            carregarBoletins();
        })
        .catch(function (erro) {
            console.error(erro);
            mensagemAdmin.textContent =
                'Não foi possível deletar o B.O. Verifique se o servidor está rodando.';
        });
}


carregarBoletins();
