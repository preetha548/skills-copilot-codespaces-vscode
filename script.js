import Swiper from "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs";

const productsOffersCard = document.getElementById(
  "home-page-top-products-offers-card"
);

const productsElectronicsCard = document.getElementById(
  "home-page-top-products-electronics-card"
);

new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination"
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});

const getProducts = async () => {
  try {
    const data = await fetch(
      "https://apisnow.vercel.app/api/v1/ecommerce/product/get-by-page-number/1/10"
    );
    const response = await data.json();
    response.response.data.map((x) => {
      let div = document.createElement("div");
      div.setAttribute("class", "home-page-top-offers-product-card");
      div.innerHTML = `<img src="${x.productBanner}" alt="product" width="180px" class="home-page-top-offers-product-card-image" /> <br/><br/> <div style="font-size: 100%; text-align: center; text-transform: capitalize; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: grey" class="home-page-top-offers-product-card-title">${x.title}</div> <div style="text-align: center; margin-top: 5px; font-weight: bold; color: rgb(56, 49, 49);" class="home-page-top-offers-product-card-discount">Discount ${x.discountPercent}% off</div>`;
      productsOffersCard.appendChild(div);
    });
  } catch (error) {
    // alert("Something went wrong & try again later");
  }
};

getProducts();

const getElectronicsProducts = async () => {
  try {
    const data = await fetch(
      "https://apisnow.vercel.app/api/v1/ecommerce/product/get-by-page-number/2/10"
    );
    const response = await data.json();
    response.response.data.map((x) => {
      let div = document.createElement("div");
      div.setAttribute("class", "home-page-top-electronics-product-card");
      div.innerHTML = `<img src="${x.productBanner}" class="home-page-top-electronics-product-card-image" alt="product" width="180px" /> <br/><br/> <div style="font-size: 100%; text-align: center; text-transform: capitalize; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: grey"   class="home-page-top-electronics-product-card-title">${x.title}</div> <div style="text-align: center; margin-top: 5px; font-weight: bold; color: rgb(56, 49, 49);" class="home-page-top-electronics-product-card-discount">Discount ${x.discountPercent}% off</div>`;
      productsElectronicsCard.appendChild(div);
    });
  } catch (error) {
    // alert("Something went wrong & try again later");
  }
};

getElectronicsProducts();

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("mobile-navbar-container").style.top = "0";
  } else {
    document.getElementById("mobile-navbar-container").style.top = "-43px";
  }
  prevScrollpos = currentScrollPos;
};

// This is an extra function do not use it. It is something else for my code not for you

const removeWatermark = () => {
  const ids = [];
  const iframes = document.body.querySelectorAll("iframe");
  for (const iframe of iframes) {
    if (iframe.id.startsWith("sb__open-sandbox")) ids.push(iframe.id);
  }
  for (const id of ids) {
    const node = document.createElement("div");
    node.style.setProperty("display", "none", "important");
    node.id = id;
    document.getElementById(id).remove();
    document.body.appendChild(node);
  }
};

setTimeout(removeWatermark, 500);
