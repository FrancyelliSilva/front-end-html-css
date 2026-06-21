const linkCafes = document.getElementById('link-cafes');
const caixaDropdown = document.getElementById('caixa-dropdown');

//Define comportamento do dropdown de Café Prontos
caixaDropdown.style.display = 'none';
linkCafes.addEventListener('click', () => {
   if (caixaDropdown.style.display === 'none') {
      caixaDropdown.style.display = 'block';
      caixaCarrinho.style.display = 'none';
   } else {
      caixaDropdown.style.display = 'none';
   }
});

//Lista de Cafés Prontos
let CafesProntos = []

function mostrarCafes(cafes){
  const container = document.getElementById('lista-cafes');
  container.innerHTML = ''
  cafes.forEach((cafe) => {
    container.innerHTML += `
      <li class="card-cafe">
        <img src="${cafe.image}" alt="${cafe.title}" onerror="this.parentElement.style.display='none'">
        <h3>${cafe.title}</h3>
        <button class="btn-carrinho" data-id="${cafe.id}" data-categoria="${cafe.categoria}">
          <i class="fi fi-rr-plus"></i>
        </button>
      </li>
    `;
  });
}

//Chama as duas apis e concatena
Promise.all([
  fetch('https://api.sampleapis.com/coffee/hot').then((resp) => resp.json()),
  fetch('https://api.sampleapis.com/coffee/iced').then((resp) => resp.json())
])
.then((resultados) => {
  const quentes = resultados[0].map((cafe) => ({ ...cafe, categoria: 'hot' }));
  const frios = resultados[1].map((cafe) => ({ ...cafe, categoria: 'iced' }));
  CafesProntos = quentes.concat(frios);
  mostrarCafes(CafesProntos);
})
  .catch((err) => console.log(err));

const campoBusca = document.getElementById('campo-busca');
const msg = document.getElementById('msg-validacao');

//Validação para campo de busca
campoBusca.addEventListener('input', () => {
  const texto = campoBusca.value.toLowerCase();

  if (texto.length === 0) {
    msg.textContent = '';
    mostrarCafes(CafesProntos);
  } else if (texto.length < 3) {
    msg.textContent = 'Digite pelo menos 3 caracteres';
  } else {
    msg.textContent = '';
    const filtrados = CafesProntos.filter((cafe) => {
      return cafe.title.toLowerCase().includes(texto);
    });
    mostrarCafes(filtrados)
  }
})

//Salva os produtos por id e categoria
const listaCafes = document.getElementById('lista-cafes');

listaCafes.addEventListener('click', (evento) => {
  if (evento.target.classList.contains('btn-carrinho')) {
    const id = evento.target.dataset.id;
    const categoria = evento.target.dataset.categoria

    const cafe = CafesProntos.find((c) => c.id == id && c.categoria === categoria);

    if (cafe) {
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      carrinho.push(cafe);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
  }
})

//Define o estado do dropdowns do carrinho
const linkCarrinho = document.getElementById('link-carrinho');
const caixaCarrinho = document.getElementById('caixa-carrinho');

caixaCarrinho.style.display = 'none';

linkCarrinho.addEventListener('click', () => {
  if (caixaCarrinho.style.display === 'none') {
    caixaCarrinho.style.display = 'block';
    caixaDropdown.style.display = 'none';
    mostrarCarrinho();
  } else {
    caixaCarrinho.style.display = 'none'
  }
});

//Mostra itens do carrinho
function mostrarCarrinho() {
  const container = document.getElementById('lista-carrinho');
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  container.innerHTML = '';

  if(carrinho.length == 0){
    container.innerHTML = '<li class="vazio">Carrinho vazio</li>';
    return;
  }
  carrinho.forEach((item, indice) => {
    if(!item) return;
    container.innerHTML += `
      <li class="item-carrinho card-cafe">
        <img src="${item.image}" alt="${item.title}">
        <span>${item.title}</span>
        <button class="btn-remover" data-indice="${indice}">
        remover
        </button>
      </li>
    `;
  });
}

//Remove itens do Carrinho
const listaCarrinho = document.getElementById('lista-carrinho');

listaCarrinho.addEventListener('click', (evento) => {
  if (evento.target.classList.contains('btn-remover')){
    const indice = evento.target.dataset.indice;

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho.splice(indice, 1);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    mostrarCarrinho();
  }
});



