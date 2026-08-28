function cadastrar() {
    var nome = document.getElementById('nome').value
    var sobrenome = document.getElementById('sobrenome').value
    var cpf = document.getElementById('cpf').value
    var email = document.getElementById('email').value
    var senha = document.getElementById('senha').value

    fetch('http://localhost:3000/cadastrados', {
        method: 'POST',
        headers: {
            'Content-Type': 'appllication/json'
        },
        body: JSON.stringify({nome: nome, sobrenome:sobrenome, cpf:cpf, email:email, senha:senha})
    }).then(resposta => resposta.json())
}

function mascaraCPF(input) {
    // Remove tudo o que não for número
    let valor = input.value.replace(/\D/g, '');
    
    // Aplica a formatação por etapas de acordo com o tamanho
    if (valor.length > 3) {
        valor = valor.replace(/^(\d{3})(\d)/, '$1.$2');
    }
    if (valor.length > 6) {
        valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if (valor.length > 9) {
        valor = valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    }
    
    // Atualiza o valor do campo
    input.value = valor;
}