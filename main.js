
// This URL is the one to access all pokemon data. Please read the docs...
const pokeAPIUrl = 'https://pokeapi.co/api/v2/'

const Card = (imgSrc, title, pokedexId, type, ability) => {
  return `<div class="card">
    <div class="card-header">
      <strong>Pokedex</strong> ${pokedexId} 
    </div>
    <img class="bg-light" src="${imgSrc}" class="card-img-top">
    <div class="card-body s-main-justify s-cross-center">
      <h5 class="mb-0 card-title">${title}</h5>
      <span class="fs-7 badge bg-secondary">${type}</span>
    </div>
    <div>
      <h5 class="ability"><strong>Main ability:</strong> ${ability}</h5>
    </div>
  </div>`
}

const btn = document.getElementById('search-button')
const cont = document.getElementById('cards-container')

btn.addEventListener('click', async (e) => {
  e.preventDefault();

  let val = document.getElementById("pokemon-name-input").value;

  btn.innerText = 'Loading...'
  btn.setAttribute('disabled', true)
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${val.toLowerCase()}/`) 
  if (res.ok){
    const data = await res.json()
    let box = document.createElement('div')
    let str = data.name
    let abil = data.abilities[0].ability.name
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    const str3 = abil.charAt(0).toUpperCase() + abil.slice(1);
    box.innerHTML = Card(
      data.sprites.other['official-artwork'].front_default,
      str2,
      data.id,
      data.types[0].type.name,
      str3)
    cont.prepend(box)
    let pokeImg = data.sprites.front_default;
    console.log(pokeImg);
    pokeImage(pokeImg);
  }
  else {
    const errMsg = await res.text().then(t => t)
    Swal.fire({
      icon: 'error',
      title: errMsg,
      })
  }
  btn.innerText = 'Search'
  btn.removeAttribute('disabled')
})

const fetchPokemon = () => {
  const pokeName = document.getElementById("pokeName");
  let pokeInput = pokeName.value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
  fetch(url).then((res) => {
      if (res.status != '200'){
          console.log(res); 
          pokeImage("./pikachu.jpg");
      }
      else{
          return res.json();
      }
  }).then((data) => {
      console.log(data);
      let pokeImg = data.sprites.front_default;
      console.log(pokeImg);
      pokeImage(pokeImg);
  })
}
const pokeImage = (url) => {
  const pokeImg = document.getElementById("pokeImg");
  pokeImg.src = url;
}


