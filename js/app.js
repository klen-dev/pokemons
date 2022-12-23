let main = document.querySelector("main")
let search = document.querySelector("input");
let container = document.createElement("div");
let box = document.createElement("div");
let select = document.querySelector("select");

main.appendChild(container);
container.appendChild(box);

container.classList.add("container");
box.classList.add("d-flex", 'justify-content-evenly', "flex-wrap", "gap-5");

let selectors = []
let allSelectors = [];

pokemons.forEach((poc) => {
  allSelectors.push(...poc.type)
  for(i of allSelectors){
    if(!selectors.includes(i)){
      selectors.push(i)
    }
  }
})

for(i of selectors){
  let option = document.createElement('option');
  select.appendChild(option)
  option.value = i;
  option.textContent = i
}

let selectArr = [];
select.addEventListener('change',(e)=>{
  e.preventDefault();
  box.innerHTML = '';
  selectArr = [];
  if(select.value == "ALL"){
    render(pokemons)
  }
  pokemons.forEach((poc)=>{
    if(poc.type.includes(select.value)){
      selectArr.push(poc);
    }
  })
  render(selectArr)
})



search.addEventListener("input", (e) => {
  e.preventDefault();
  box.innerHTML = ''
  inputValue = search.value.toLowerCase();
  let searchArr = [];
  if(select.value == "ALL"){
    for (i of pokemons) {
      if (i.name.toLowerCase().includes(inputValue)) {
        searchArr.push(i);
      }
    }
  }else{
    for(i of selectArr){
      if(i.name.toLowerCase().includes(inputValue)){
        searchArr.push(i);
      }
    }
  }
  render(searchArr)
})


function render(arr) {
  arr.forEach((poc) => {
    let card = document.createElement("div");
    let img = document.createElement("img");
    let name = document.createElement("h2");
    let height = document.createElement("h4");
    let weight = document.createElement("h4");
    let id = document.createElement("h1");
    let weaknesses = document.createElement("h5");

    card.classList.add("card");
    card.appendChild(img);
    card.appendChild(id);
    card.appendChild(name);
    card.appendChild(height);
    card.appendChild(weight);
    card.appendChild(weaknesses);

    img.src = poc.img
    card.style.width = '24rem';
    card.classList.add("card", "d-flex", "text-center", "py-3", "px-5");
    weaknesses.textContent = `${poc.weaknesses}`
    id.textContent = `${poc.id}`
    name.textContent = `${poc.name}`;
    height.textContent = `Height: ${poc.height}`;
    weight.textContent = `Weight: ${poc.weight}`;


    box.appendChild(card);
  })
}

render(pokemons)