document.getElementById('sair').addEventListener('click', function() {
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioCpf');
});
