// cards selecionados
let cardSelecionados;
let produtosCarrinho = [];

// selecionando os cards
const listaCards = document.getElementsByClassName("card");

// percorrendo cada um deles e adicionando o evento
for (let i = 0; i < listaCards.length; i++) {
  listaCards[i].onclick = selecionaCard;
}

// evento para adicionar produtos ao carrinho
const botaoCarrinho = document.querySelector(".btn-adicionar");
botaoCarrinho.onclick = adicionarCarrinho;

// evento para calcular valor total da compra
const botalCalcular = document.querySelector(".btn-calcular");
botalCalcular.onclick = calcularTotal;

// evento para remover os produtos do carrinho
const botaoRemover = document.querySelector(".btn-limpar");
botaoRemover.onclick = limparCarrinho;
// funcao para o card selecionado
function selecionaCard() {
  if (this.style.border != "3px solid yellow") {
    this.style.border = "3px solid yellow";
  } else {
    this.style.border = "3px solid black";
  }
}

// funcao para criar o produto no carrinho
function produtoCarrinho(produto) {
  // verificando se o produto ja foi adicionado anteriormente
  if (produtosCarrinho.indexOf(produto) == -1) {
    //   pegando a imagem do produto
    const imagemProduto = produto.children[0].getAttribute("src");

    //   pegando o nome do produto
    const nomeProduto = produto.children[1].textContent;

    //   pegando o valor do produto
    const valorProduto = produto.children[2].textContent;

    // criando a div de compra
    const itemCarrinho = document.createElement("div");
    itemCarrinho.className = "item-compra";
    itemCarrinho.innerHTML = `
      <img class="item-imagem" src="${imagemProduto}" alt="" />
      <div class="item-info">
        <h3>${nomeProduto}</h3>
        <p>${valorProduto}</p>
      </div>
      <input type="number" name="quantidade" value=1 id =produto${produtosCarrinho.length} />
      <div class="item-valor">
        <h3>Valor</h3>
        <p id = valor${produtosCarrinho.length}>${valorProduto}</p>
      </div>
`;
    // adicionando o produto ao carrinho
    document.querySelector("#inicio-carrinho").appendChild(itemCarrinho);

    // adicionando o produto ao vetor de produtos do carrinho
    produtosCarrinho.push(produto);
  } else {
    // localizando o campo de quantidade do produto que ja foi adicionado pelo id
    const campoQuantidade = document.querySelector(
      `#produto${produtosCarrinho.indexOf(produto)}`
    );

    // acessando a quantidade armazenada
    let quantidade = campoQuantidade.value;

    // adicionando uma quantidade
    quantidade++;

    // atribuindo a nova quantidade tanto ao value quanto ao conteudo textual
    campoQuantidade.value = quantidade;

    // localizando o campo com o valor total do produto
    const valorTotal = document.querySelector(
      `#valor${produtosCarrinho.indexOf(produto)}`
    );

    // acessando o valor do produto
    // utilizando substring para se livrar
    // do R$
    let totalCalculado = produto.children[2].textContent.substring(2);

    // adicionando uma quantidade
    totalCalculado = totalCalculado * quantidade;

    // atribuindo a nova quantidade
    valorTotal.textContent = `R$${totalCalculado.toFixed(2)}`;
  }
}

// funcao para adicionar os produtos ao carrinho
function adicionarCarrinho() {
  let produtosSelecionados = 0;
  // adicionando os produtos ao carrinho, e verificando se o usuario escolheu realmente algum produto
  for (let i = 0; i < listaCards.length; i++) {
    if (listaCards[i].style.border == "3px solid yellow") {
      produtosSelecionados++;
      produtoCarrinho(listaCards[i]);
      calcularTotal();
    }
  }
  if (produtosSelecionados > 0) {
    cardSelecionados = true;
  } else {
    cardSelecionados = false;
  }

  // verificando se nao foram selecionados produtos
  if (cardSelecionados == false) {
    alert("Nenhum produto selecionado. Por favor, selecione algum produto");
  }
}

// funcao para calcular total da compra
function calcularTotal() {
  let totalCompra = 0;

  // verificando se há produtos
  if (produtosCarrinho.length > 0) {
    // percorrendo todos os produtos do carrinho
    for (let i = 0; i < produtosCarrinho.length; i++) {
      // localizando o campo de quantidade do produto que ja foi adicionado pelo id
      const campoQuantidade = document.querySelector(`#produto${i}`);

      // acessando a quantidade armazenada
      let quantidade = campoQuantidade.value;

      // acessando o valor do produto
      // utilizando substring para se livrar
      // do R$
      let totalCalculado =
        produtosCarrinho[i].children[2].textContent.substring(2);

      // adicionando uma quantidade
      totalCalculado = totalCalculado * quantidade;

      // adicionando ao valor total da compra
      totalCompra = totalCompra + totalCalculado;

      // acessando o campo com o valor total da compra
      const campoTotal = document.querySelector("#total-compra");

      // colocando o valor total da compra
      campoTotal.textContent = `R$${totalCompra.toFixed(2)}`;

      // localizando o campo com o valor total do produto
      // para que seja atualizado, considerando tbm a mudanca manual no campo de quantidade
      const valorTotal = document.querySelector(`#valor${i}`);

      // atribuindo o novo valor atualizado
      valorTotal.textContent = `R$${totalCalculado.toFixed(2)}`;
    }
  } else {
    // acessando o campo com o valor total da compra
    const campoTotal = document.querySelector("#total-compra");

    // colocando o valor total da compra
    campoTotal.textContent = `R$${totalCompra.toFixed(2)}`;
  }
}

// funcao para limpar carrinho
function limparCarrinho() {
  // pegando todos os elementos to carrinho
  const elementosCarrinho = document.querySelectorAll("#inicio-carrinho > *");

  // removendo os elementos da tela
  for (let i = 0; i < elementosCarrinho.length; i++) {
    elementosCarrinho[i].remove();
  }

  produtosCarrinho = [];

  // atualizando o valor total
  calcularTotal();
}
