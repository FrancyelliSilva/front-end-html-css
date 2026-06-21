// Lista de café quentes no dropdown
fetch('https://api.sampleapis.com/coffee/hot') //api
  .then((resp) => resp.json())
  .then((data) => {
    const container = document.getElementById('lista-cafes');
    data.forEach((cafe) => {
      container.innerHTML += `
        <li class="card-cafe">
          <img src="${cafe.image}" alt="${cafe.title}" onerror="this.parentElement.style.display='none'">
          <h3>${cafe.title}</h3>
        </li>
      `;
    });
  })
  .catch((err) => console.log(err));

const linkCafes = document.getElementById('link-cafes');
const lista = document.getElementById('caixa-dropdown');

lista.style.display = 'none'; //mantém a lista escondida até clicar no link

linkCafes.addEventListener('click', () => {
   if (lista.style.display === 'none') {
      lista.style.display = 'block';
   } else {
      lista.style.display = 'none';
   }
});

//Lista de Cafés Quentes para a busca
let CafesQuentes = []

function mostrarCafes(cafes){
  const container = document.getElementById('lista-cafes');
  container.innerHTML = ''
  cafes.forEach((cafe) => {
    container.innerHTML += `
      <li class="card-cafe">
        <img src="${cafe.image}" alt="${cafe.title}" onerror="this.parentElement.style.display='none'">
        <h3>${cafe.title}</h3>
      </li>
    `;
  });
}

fetch('https://api.sampleapis.com/coffee/hot')
  .then((resp) => resp.json())
  .then((data) => {
    CafesQuentes = data;
    mostrarCafes(CafesQuentes);
  })
  .catch((err) => console.log(err))

  //Busca de Cafés Quentes
  const campoBusca = document.getElementById('campo-busca');

  campoBusca.addEventListener('input', () => {
    const texto = campoBusca.value.toLowerCase();
    const filtrados = CafesQuentes.filter((cafe) => {
      return cafe.title.toLowerCase().includes(texto);
    });
    mostrarCafes(filtrados)
  })