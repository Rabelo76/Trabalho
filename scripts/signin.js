function entrar() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    fetch('http://localhost:3000/cadastrados')
    .then(resposta => resposta.json())
    .then(data => {

        var login = data.find(user => user.email === email && user.senha === senha);
        
        if (login) {
            window.location.href = "";
        } else {
            alert("E-mail/senha incorretos! Tente novamente!");
        }
    })
}