// Selecione todos os links da página
// const links = document.querySelectorAll('.link');

// Para cada link, adicione um evento de clique
// links.forEach(link => {
//   link.addEventListener('click', () => {
//     alert('Você clicou em um link!');
//   });
// });

 // Salvar e carregar imagem de perfil
    const imgInput = document.getElementById("img-input");
    const profilePic = document.getElementById("profile-pic");

    imgInput.addEventListener("change", () => {
      const file = imgInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          profilePic.src = reader.result;
          localStorage.setItem("profilePic", reader.result);
        };
        reader.readAsDataURL(file);
      }
    });

    // Carregar imagem salva
    const savedImage = localStorage.getItem("profilePic");
    if (savedImage) {
      profilePic.src = savedImage;
    } else {
      profilePic.src = "https://via.placeholder.com/100"; // imagem padrão
    }

    // Adicionar link
    function addLink() {
      const title = document.getElementById("link-title").value;
      const url = document.getElementById("link-url").value;

      if (!title || !url) {
        alert("Preencha os dois campos!");
        return;
      }

      const links = JSON.parse(localStorage.getItem("userLinks")) || [];

      links.push({ title, url });
      localStorage.setItem("userLinks", JSON.stringify(links));

      renderLinks();
      document.getElementById("link-title").value = "";
      document.getElementById("link-url").value = "";
    }

    // Mostrar links na tela
    function renderLinks() {
      const container = document.getElementById("links-container");
      container.innerHTML = ""; // Limpa antes de renderizar

      const links = JSON.parse(localStorage.getItem("userLinks")) || [];

      links.forEach(link => {
        const a = document.createElement("a");
        a.href = link.url;
        a.textContent = link.title;
        a.className = "link";
        a.target = "_blank";
        container.appendChild(a);
      });
    }

    // Carregar links ao iniciar
    window.onload = renderLinks;