let produtos = [];

function buscarProdutos(){
  fetch("https://fakestoreapi.com/products")
  .then((response) => { return response.json()})
  .then((response) => {
    produtos = response;
    carregaProdutos(produtos);
  })
}
buscarProdutos();

function carregaProdutos(listaProdutos = []) {
  let cards = document.querySelector("#cards");

  cards.innerHTML = ""

  listaProdutos.map((produto) => {
    cards.innerHTML += `
            <div class="bg-white rounded p-4" "title=${produto.title}">
                <div class="relative">
                    <img src="${produto.image}" alt="" class="w-full h-55 object-contain">
                    <div class="p-2 bg-orange-500 text-white font-bold absolute top-3 right-3 rounded">${produto.rating.rate}</div>
                </div>
                <div class="pt-4">
                    <h2 class="font-semibold text-xl line-clamp-1">${produto.title}</h2>
                    <h6 class="font-bold">${produto.category}</h6>
                    <h6 class="text-right text-2xl">${produto.price.toFixed(2)}</h6>
                </div>
            </div>`
  });
}

function filtrarProdutos(categoria) {
  if (categoria != "All") {
    let produtosFiltrados = produtos.filter((produto) => {
      return produto.category == categoria.toLowerCase();
    });
    carregaProdutos(produtosFiltrados);
  } else {
    carregaProdutos(produtos);
  }
}

function ordenarProdutos(ordem) {
  
  let produtosOrdenados = [];
  if (ordem == "preco") {
    produtosOrdenados = produtos.toSorted((prodA, prodB) => {
      return prodA.price - prodB.price;
    });
  } else {
    produtosOrdenados = produtos.toSorted((prodA, prodB) => {
      return prodA.rating.rate - prodB.rating.rate;
    });
  }
  carregaProdutos(produtosOrdenados);
}

function pesquisarProdutos(texto){
  if(texto.length >= 0){
    carregaProdutos(produtos);
    return;
  }
  if(texto.length >= 3){
    let produtosEncontrados = produtos.filter((produto => {
      return produto.title.toLowerCase().includes(texto.toLowerCase());
    }));
    carregaProdutos(produtosEncontrados);
  }
  
}


