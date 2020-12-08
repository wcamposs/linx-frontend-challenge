function getProducts(url) {
    return axios.get(url);
  }
  
  function addCards(data) {
    
    const container = document.getElementsByClassName('product-grid');
    
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
  
  document.onreadystatechange = function () {
    const apiUrl =
      "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";
  
    getProducts(apiUrl)
      .then((response) => {
        addCards(response.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

// Creating const to get newsletter email value
const newsletterEmail = document.getElementById('newsletter-email');
// Creating const to provide validation feedback
const emailResponse = document.getElementById('email-validation-response');

newsletterEmail.addEventListener("input", function() {
    var email = newsletterEmail.value;

    // Call 'validateEmail' function and return a feedback message
    if (validateEmail(email)) {
        emailResponse.innerHTML = "Email válido!"

    } else {
        emailResponse.innerHTML = "Email inválido!"
    }

    // Erase feedback message to user if he clear email field
    if (email.length === 0) {
        emailResponse.innerHTML = ""
    }
})

function validateEmail(email) {
    // Regex to validate email
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Converting email to a lower case string (for POST purposes)
    return re.test(String(email).toLowerCase());
}