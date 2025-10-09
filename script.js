document.addEventListener('DOMContentLoaded', () => {
  const imgInput = document.getElementById('img-input');
  const profilePic = document.getElementById('profile-pic');
  const form = document.getElementById('add-link-form');
  const container = document.getElementById('links-container');
  const feedback = document.getElementById('feedback');


  // --- IMAGEM DE PERFIL ---
  const savedImage = localStorage.getItem('profilePic');
  profilePic.src = savedImage || 'https://via.placeholder.com/100';

  imgInput.addEventListener('change', () => {
    const file = imgInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        profilePic.src = reader.result;
        localStorage.setItem('profilePic', reader.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // --- RENDERIZAR LINKS ---
  function renderLinks() {
    container.innerHTML = '';
    const links = JSON.parse(localStorage.getItem('userLinks')) || [];

    links.forEach((link, index) => {
      const div = document.createElement('div');
      div.className = 'link-item';

      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.title;
      a.className = 'link';
      a.target = '_blank';

      const btn = document.createElement('button');
      btn.textContent = '🗑️';
      btn.onclick = () => removeLink(index);

      div.appendChild(a);
      div.appendChild(btn);
      container.appendChild(div);
    });
  }

  // --- ADICIONAR LINK ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('link-title').value.trim();
    const url = document.getElementById('link-url').value.trim();

    if (!title || !url) {
      showFeedback('Preencha os dois campos!', true);
      return;
    }

    if (!isValidUrl(url)) {
      showFeedback('URL inválida! Tente novamente.', true);
      return;
    }

    const links = JSON.parse(localStorage.getItem('userLinks')) || [];
    links.push({ title, url });
    localStorage.setItem('userLinks', JSON.stringify(links));

    form.reset();
    renderLinks();
    showFeedback('Link adicionado com sucesso!');
  });

  // --- REMOVER LINK ---
  function removeLink(index) {
    const links = JSON.parse(localStorage.getItem('userLinks')) || [];
    links.splice(index, 1);
    localStorage.setItem('userLinks', JSON.stringify(links));
    renderLinks();
    showFeedback('Link removido com sucesso!');
  }

  // --- VALIDAÇÃO DE URL ---
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  // --- FEEDBACK VISUAL ---
  function showFeedback(message, isError = false) {
    feedback.textContent = message;
    feedback.style.color = isError ? '#e74c3c' : '#ffffffff';
    feedback.classList.remove('hidden');
    setTimeout(() => feedback.classList.add('hidden'), 2500);
  }

  renderLinks();
});
