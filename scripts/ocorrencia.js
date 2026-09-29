document.getElementById('form-ocorrencia').addEventListener('submit', function(e) {
    // Evita o recarregamento da página ao submeter o formulário
    e.preventDefault();
    var mensagemOcorrencia = document.getElementById('mensagem-ocorrencia');
    mensagemOcorrencia.textContent = '';

    // Captura dos valores dos inputs do HTML
    var data_relatorio = document.getElementById('data_relatorio').value;
    var hora_relatorio = document.getElementById('hora_relatorio').value;
    var periodo_relatorio = document.getElementById('periodo_relatorio').value;

    var data_ocorrencia = document.getElementById('data_ocorrencia').value;
    var hora_ocorrencia = document.getElementById('hora_ocorrencia').value;
    var periodo_ocorrencia = document.getElementById('periodo_ocorrencia').value;
    var tratamento = document.getElementById('tratamento').value;
    var autor_nome = document.getElementById('autor_nome').value;
    var autor_sobrenome = document.getElementById('autor_sobrenome').value;

    var local_ocorrencia = document.getElementById('local_ocorrencia').value;
    var natureza_incidente = document.getElementById('natureza_incidente').value;
    var detalhes_incidente = document.getElementById('detalhes_incidente').value;
    var motivo_incidente = document.getElementById('motivo_incidente').value;
    var relatorio_policia = document.getElementById('relatorio_policia').value;
    var alguem_preso = document.getElementById('alguem_preso').value;

    var nome = document.getElementById('nome').value;
    var sobrenome = document.getElementById('sobrenome').value;
    var telefone = document.getElementById('telefone').value;

    var cidade = document.getElementById('cidade').value;
    var estado = document.getElementById('estado').value;
    var cep = document.getElementById('cep').value;
    var bairro = document.getElementById('bairro').value;
    var rua = document.getElementById('rua').value;
    var numero = document.getElementById('numero').value;

    var comentarios = document.getElementById('comentarios').value;
    var declaracao_veracidade = document.getElementById('declaracao_veracidade').checked;

    // Estruturação do objeto nos mesmos moldes do banco de dados/JSON
    var cpfUsuario = localStorage.getItem('usuarioCpf');

    if (!cpfUsuario) {
        mensagemOcorrencia.textContent = 'Faça login novamente para registrar uma ocorrência.';
        window.location.href = 'signin.html';
        return;
    }

    var payload = {
        info_relatorio: {
            data_relatorio: data_relatorio,
            hora_relatorio: hora_relatorio,
            hora_tipo: periodo_relatorio
        },
        info_incidente: {
            data_incidente: data_ocorrencia,
            hora_relatorio: hora_ocorrencia,
            hora_tipo: periodo_ocorrencia,
            tratamento: tratamento,
            nome_emicao: autor_nome,
            sobrenome_emicao: autor_sobrenome
        },
        local_ocorrencia: local_ocorrencia,
        natureza_incidente: natureza_incidente,
        detalhes_incidente: detalhes_incidente,
        motivo_incidente: motivo_incidente,
        relatorio_emitido: relatorio_policia,
        preso: alguem_preso,
        nome: nome,
        sobrenome: sobrenome,
        telefone: telefone,
        endereco: {
            cidade_endereco: cidade,
            estado_endereco: estado,
            cep_endereco: cep,
            bairro_endereco: bairro,
            rua_enreco: rua,
            numeroCasa_endereco: numero
        },
        comentarios_adicionais: comentarios,
        confirmacao_verdade: declaracao_veracidade,
        comentario_policial: "",
        processo_bo: "Em Andamento",
        cpf_usuario: cpfUsuario
    };

    // Requisição HTTP POST para a API
    fetch('http://localhost:3000/relatorio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload)
    })
    .then(function(resposta) {
        if (!resposta.ok) {
            throw new Error('Erro na comunicação com o servidor.');
        }
        return resposta.json();
    })
    .then(function(dados) {
        mensagemOcorrencia.textContent = 'Relatório enviado com sucesso!';
        console.log('Dados cadastrados:', dados);
        document.getElementById('form-ocorrencia').reset();
    })
    .catch(function(erro) {
        console.error('Erro:', erro);
        mensagemOcorrencia.textContent = 'Ocorreu um erro ao enviar. Verifique se o servidor está rodando.';
    });
});
