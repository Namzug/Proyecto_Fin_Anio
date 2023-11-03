let carsContainer = document.querySelector("#carsContainer");
const año = document.querySelector(".año");
const marcas = document.querySelector(".marcas");
const modelos = document.querySelector(".modelo");
const estado = document.querySelector(".estado");
const filterButton = document.querySelector(".filterButton");

function carsCards(cars) {
  const autos = cars;
  for (const car of cars) {
    carsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="row border-bottom mb-4 pb-4" id="car">
                            <div class="col-12 col-lg-4">
                                <div class="position-relative">
                                    <img
                                        src="${car.image}"
                                        class="img-fluid border p-2 mb-3 mb-lg-0"
                                        alt=".."
                                    />
                                    <div
                                        class="new position-absolute px-2 rounded spanNew d-none"
                                    >
                                        <strong class="text-white"
                                            >Nuevo</strong
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-lg-8 d-flex flex-column">
                                <div class="card-body">
                                    <div
                                        class="d-flex justify-content-between align-items-center"
                                    >
                                        <h3 class="card-title carName">
                                        ${car.brand + " " + car.model} 
                                        </h3>
                                        <div class="datosDelAuto d-flex">
                                            <p class="year me-1 my-0">${
                                              car.year
                                            }</p>
                                            |
                                            <p class="price mx-1 my-0">
                                            
                                            </p>
                                            |
                                            <p class="stars ms-1 my-0">
                                            </p>
                                        </div>
                                    </div>
                                    <p class="card-text my-3">
                                    ${car.description}
                                    </p>
                                </div>
                                <div class="buttons">
                                    <button
                                        class="btn saleButton"
                                        type="submit"
                                    >
                                        <i class="bi bi-cart3"></i> Comprar
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-outline-dark"
                                    >
                                        <i class="bi bi-plus-square"></i> Mas
                                        información
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-outline-dark"
                                    >
                                        <i class="bi bi-share"></i> Compartir
                                    </button>
                                </div>
                            </div>
                        </div>`
    );
    let nuevo = document.querySelectorAll(".spanNew");
    if (car.status === 1) {
      nuevo[nuevo.length - 1].classList.remove("d-none");
    }

    let stars = document.querySelectorAll(".stars");
    for (let i = 0; i < car.rating; i++) {
      stars[stars.length - 1].innerHTML += `<i class="bi bi-star-fill"></i>`;
    }
    for (let i = 0; i < 5 - car.rating; i++) {
      stars[stars.length - 1].innerHTML += `<i class="bi bi-star"></i>`;
    }
    let priceArr = document.querySelectorAll(".price");
    let cont = 1;
    let price = "";
    let carPrice = String(car.price_usd);
    for (let i = carPrice.length - 1; i >= 0; i--) {
      price += carPrice[i];
      if (cont === 3) {
        price += ".";
        cont = 0;
      } else {
        cont++;
      }
    }
    priceArr[priceArr.length - 1].innerHTML = "USD ";
    for (let i = price.length - 1; i >= 0; i--) {
      priceArr[priceArr.length - 1].innerHTML += price[i];
    }
    const carCard = document.querySelector("#car");
  }
}

fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
  .then(function (res) {
    return res.json();
  })
  .then(carsCards)
  .catch(function (err) {
    console.error(err);
  });

for (let i = 1900; i <= 2023; i++) {
  let opcion = document.createElement("option");
  opcion.innerHTML = i;
  año.append(opcion);
}
let Nuevo = document.createElement("option");
Nuevo.innerHTML = "Nuevo";
estado.append(Nuevo);
let Usado1 = document.querySelector(".estado");
let Usado2 = document.createElement("option");
Usado2.innerHTML = "Usado";
estado.append(Usado2);

fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
  .then(function (res) {
    return res.json();
  })
  .then(function (brands) {
    const marcas = document.querySelector(".marcas");
    for (let i = 0; i < brands.length; i++) {
      const marca = brands[i];
      const opcionMarcas = document.createElement("option");
      opcionMarcas.innerHTML = marca;
      marcas.append(opcionMarcas);
    }
  });

marcas.addEventListener("change", () => {
  fetch(
    "https://ha-front-api-proyecto-final.vercel.app/models?brand=" +
      marcas.value
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (model) {
      const modelos = document.querySelector(".modelo");
      modelos.innerHTML = "";
      for (let i = 0; i < model.length; i++) {
        const opcionModelo = document.createElement("option");
        const modeloActual = model[i];
        opcionModelo.append(modeloActual);
        modelos.append(opcionModelo);
      }
    });
});

filterButton.addEventListener("click", () => {
  fetch(
    "https://ha-front-api-proyecto-final.vercel.app/cars?" +
      "year=" +
      año.value +
      "&brand=" +
      marcas.value +
      "&model=" +
      modelos.value
  )
    .then(function (autoFiltrado) {
      return autoFiltrado.json();
    })
    .then(function (autoFiltrado) {
      carsContainer.innerHTML = "";
      carsCards(autoFiltrado);
    });
});
