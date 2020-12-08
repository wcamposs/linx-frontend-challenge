const fetch = require('node-fetch');

// GET products list from first page
// async function getProductsAsync(url) {
//     let data = await (await (fetch(url).then(res => {
//         return res.json();
//     }).catch(err => {
//         console.log('Error: ', err);
//     })))

//     console.log(data);

//     return data;
// }

function getProducts(url) {
    return fetch.get(url);
}

document.onreadystatechange = function() {
    apiUrl = "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";

    getProducts(apiUrl).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log('Error: ', err);
    });
}

const productsResult = getProducts(`${apiUrl}`);

// Creating card and attaching products data
const container = document.getElementById('product-grid');

productsResult.forEach(product => {
    const card = document.createElement('div');
    card.classList = 'card-body';

    //Constructing card content

    const content = `
    <div class="product-card">
        <div class="image-container">
            <img class="product-image" src="" alt="product image"/>
        </div>

        <div class="product-details">
            <h1>Nome do produto</h1>

            <p>Descrição do produto um pouco maior, com duas linhas ou três, que explica melhor do que o produto se trata.</p>
        </div>

        <div class="product-price">
            <p>De: R$23,99</p>
            <h4>Por: R$19,99</h4>
            <p>ou 2x de R$9,99</p>
        </div>

        <button>
            <span>Comprar</span>
        </button>
    </div>
    `;

    //Appending card element to grid container
    container.innerHTML += content;

})
