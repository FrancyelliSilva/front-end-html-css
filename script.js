fetch('https://api.sampleapis.com/coffee/hot')
  .then((resp) => resp.json())
  .then((data) => {
    const container = document.getElementById('lista-cafes');
    data.forEach((cafe) => {
      container.innerHTML += `
        <li class="card-cafe">
          <img src="${cafe.image}" alt="${cafe.title}">
          <h3>${cafe.title}</h3>
          <p>${cafe.description}</p>
        </li>
      `;
    });
  })
  .catch((err) => console.log(err));

const linkCafes = document.getElementById('link-cafes');
const lista = document.getElementById('lista-cafes');

lista.style.display = 'none';

linkCafes.addEventListener('click', () => {
   if (lista.style.display === 'none') {
      lista.style.display = 'block';
   } else {
      lista.style.display = 'none';
   }
});