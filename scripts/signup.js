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