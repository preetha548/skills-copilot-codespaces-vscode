const searchGame = document.querySelector("#search-game");
const games = document.querySelector("#games");
let page = 1;
let category = "";

//deafult game when web begin run
const startPage = async () => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/features`;
    const res = await fetch(url);
    const data = await res.json();
    games.innerHTML = data.data
      .map(
        (item) => `<div class="tag-game">
<div class="img-game">
  <img
    src="${item.header_image}"+
    alt="${item.name}"
  />
</div>
<div class="name-price-game">
    <div class="name-game">${item.name}</div>
    <div class="price-game">${item.price}</div>
</div>
</div>`
      )
      .join("");
  } catch (err) {
    console.log("err", err);
  }
};
startPage();

//get search game
const getAllGame = async () => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/games?limit=20&q=${searchGame.value}`;
    const res = await fetch(url);
    const data = await res.json();

    games.innerHTML = data.data
      .map(
        (item) => `<div class="tag-game">
<div class="img-game">
  <img
    src="${item.header_image}"+
    alt="${item.name}"
  />
</div>
<div class="name-price-game">
    <div class="name-game">${item.name}</div>
    <div class="price-game">${item.price}</div>
</div>
</div>`
      )
      .join("");
  } catch (err) {
    console.log("err", err);
  }
};

//search game when click on category lick
const categoryGame = async (key) => {
  console.log(key);
  category = key;
  getData();
};

const getData = async () => {
  let url = `https://cs-steam-api.herokuapp.com/games?page=${page}&limit=20`;
  try {
    if (category) {
      url += `&steamspy_tags=${category}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    games.innerHTML = data.data
      .map(
        (item) => `<div class="tag-game">
<div class="img-game">
  <img
    src="${item.header_image}"+
    alt="${item.name}"
  />
</div>
<div class="name-price-game">
    <div class="name-game">${item.name}</div>
    <div class="price-game">${item.price}</div>
</div>
</div>`
      )
      .join("");
  } catch (err) {
    console.log("err", err);
  }
};

//backward forward funticon

const forward = async () => {
  page += 1;
  getData();
};

const backward = async () => {
  if (page < 1) {
    page = 1;
  } else {
    page -= 1;
  }
  getData();
};

//creat list category
const genresList = async () => {
  try {
    const url = `https://cs-steam-api.herokuapp.com/steamspy-tags`;
    const res = await fetch(url);
    const data = await res.json();
    let categoryElement = document.querySelector("#category-game");
    categoryElement.innerHTML = data.data
      .map(
        (item) =>
          `<div onclick="categoryGame('${item.name}')" class="filterGame">${item.name}</div>`
      )
      .join("");
  } catch (err) {
    console.log("err", err);
  }
};

genresList();
