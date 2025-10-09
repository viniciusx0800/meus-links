// Selecione todos os links da página
const links = document.querySelectorAll('.link');

// Para cada link, adicione um evento de clique
links.forEach(link => {
  link.addEventListener('click', () => {
    alert('Você clicou em um link!');
  });
});
