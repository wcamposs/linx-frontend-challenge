let pageNumber = 1;
let busy = false;

// When the document loads, call the 'getProducts' function, calling the eight products from first page API.
document.onreadystatechange = function () {
  getProducts();
};

function getProducts(page = 1) {
  busy = true;
  return axios
    .get(
      `https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=${
        page || pageNumber
      }`
    )
    .then((response) => {
      addCards(response.data);
    })
    .catch((err) => {
      console.log("Error: ", err);
    })
    .finally(() => {
      busy = false;
    });
}

function addCards(data) {
  const container = document.getElementsByClassName("product-grid");

  // Iterating to products and adding a card for each one
  data.products.map((product) => {
    //Constructing card content
    const content = `
        <div class="product-card">
            <div class="image-container">
                <img class="product-image" src="${product.image}" alt="product image"/>
            </div>
            <div class="product-details">
                <h1>${product.name}</h1>
                <p>${product.description}</p>
            </div>
            <div class="product-price">
                <p>De: R$${product.oldPrice}</p>
                <h4>Por: R$${product.price}</h4>
                <p>ou ${product.installments.count}x de R$${product.installments.value}</p>
            </div>
            <button>
                <span>Comprar</span>
            </button>
        </div>
        `;

    //Appending card element to grid container
    container[0].innerHTML += content;
  });
}

// Adding listener to "load more products" button, and calling 'loadMoreProducts' function
document
  .getElementsByClassName("more-products-button")[0]
  .addEventListener("click", () => {
    loadMoreProducts();
  });

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight > scrollHeight - 5) {
    if (busy === false) {
      pageNumber += 1;
      getProducts(pageNumber);
    }
  }
});

// Load next page products and increment page number
function loadMoreProducts() {
  pageNumber += 1;
  getProducts(pageNumber);
}

// Email validation on share section
const shareEmail = document.getElementById("share-email");
const emailResponse = document.getElementById("email-validation-response");

shareEmail.addEventListener("input", function () {
  var email = shareEmail.value;

  // Call 'validateEmail' function and return a feedback message
  if (validateEmail(email)) {
    emailResponse.innerHTML = "Email válido!";
  } else {
    emailResponse.innerHTML = "Email inválido!";
  }

  // Erase feedback message to user if he clear email field
  if (email.length === 0) {
    emailResponse.innerHTML = "";
  }
});

function validateEmail(email) {
  // Regex to validate email
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Converting email to a lower case string (for POST purposes)
  return re.test(String(email).toLowerCase());
}
