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

        console.log(container);

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

