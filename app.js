const stockProductos = [
  {
    id: 1,
    nombre: "Enterito Happy",
    cantidad: 1,
    precio: 1200,
    desc: "Enterito de algodon",
    img: 'img/enterito-rosa.png',
  },
  {
    id: 2,
    nombre: "Ajuar blanco",
    cantidad: 1,
    precio: 9850,
    desc: "Ajuar 5 piezas alitas",
    img: 'img/ajuar-blanco.png',
  },
  {
    id: 3,
    nombre: "Gorrito Rabbit",
    cantidad: 1,
    precio: 2030,
    desc: "Gorrito de corderito",
    img: 'img/gorrito-conejo.png',
  },
  {
    id: 4,
    nombre: "Jogger Cuento",
    cantidad: 1,
    precio: 2489,
    desc: "jogger de plush color coco",
    img: 'img/jogger.png',
  },
  {
    id: 5,
    nombre: "Remera Happy",
    cantidad: 1,
    precio: 2130,
    desc: "Remera de algodón",
    img: 'img/remera-happy.png',
  },
  {
    id: 6,
    nombre: "Gorrito zuri",
    cantidad: 1,
    precio: 1680,
    desc: "Gorrito de lana hipoalergenico",
    img: 'img/gorrito-zuri.png',
  },
  {
    id: 7,
    nombre: "Body Mini",
    cantidad: 1,
    precio: 2400,
    desc: "Body azul con estampa mini",
    img: 'img/body-mini.png',
  },
  {
    id: 8,
    nombre: "Body Alitas",
    cantidad: 1,
    precio: 4026,
    desc: "Body alitas color arena",
    img: 'img/body-arena.png',
  },
];

let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click("#procesarPedido");
});
if (formulario) {
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="col-xl-3 col-md-6 col-sm-12 py-2">
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: $ ${precio}</p>
      <p class="card-text"> ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn colorboton" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if (existe) {
    const prod = carrito.map(prod => {
      if (prod.id === id) {
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } 
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

function enviarCompra(e){
  e.preventDefault()
  const cliente = document.querySelector('#cliente').value
  const email = document.querySelector('#correo').value

  if (email === '' || cliente == ''){
    Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
  }) 
} else {
  const spinner = document.querySelector('#spinner')
  spinner.classList.add('d-flex')
  spinner.classList.remove('d-none')

  setTimeout(() => {
    spinner.classList.remove('d-flex')
    spinner.classList.add('d-none')
    formulario.reset()
  }, 3000)}
    
  const alertExito = document.createElement('p')
    alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
    alertExito.textContent = "Compra realizada correctamente"
    formulario.appendChild(alertExito)
  
setTimeout(() => {
  alertExito.remove()
}, 3000)
  }