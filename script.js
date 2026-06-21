const linkCafes = document.getElementById('link-cafes');
const caixaDropdown = document.getElementById('caixa-dropdown');

caixaDropdown.style.display = 'none'; //mantém a lista escondida até clicar no link

linkCafes.addEventListener('click', () => {
   if (caixaDropdown.style.display === 'none') {
      caixaDropdown.style.display = 'block';
      caixaCarrinho.style.display = 'none';
   } else {
      caixaDropdown.style.display = 'none';
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
        <button class="btn-carrinho" data-id="${cafe.id}">
          <i class="fi fi-rr-plus"></i>
        </button>
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

  //Validação do campo de busca
  const msg = document.getElementById('msg-validacao');

  campoBusca.addEventListener('input', () => {
    const texto = campoBusca.value.toLowerCase();

    if (texto.length === 0) {
      msg.textContent = '';
      mostrarCafes(CafesQuentes);
    } else if (texto.length < 3) {
      msg.textContent = 'Digite pelo menos 3 caracteres';
    }else {
      msg.textContent = '';
      const filtrados = CafesQuentes.filter((cafe) => {
        return cafe.title.toLowerCase().includes(texto);
      });
      mostrarCafes(filtrados)
    }
  })

//Salvar no carrinho
const listaCafes = document.getElementById('lista-cafes');

listaCafes.addEventListener('click', (evento) => {
  if (evento.target.classList.contains('btn-carrinho')) {
    const id = evento.target.dataset.id;

    const cafe = CafesQuentes.find((c) => c.id == id);

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho.push(cafe);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    console.log(carrinho);
  }
})

//Carrinho
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

function mostrarCarrinho() {
  const container = document.getElementById('lista-carrinho');
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  container.innerHTML = '';
  carrinho.forEach((item, indice) => {
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

//Remover do Carrinho
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



