const numeroWhatsApp = "5581991851200"; // novo número

const pizzas = [
  { nome: "Mussarela", ingredientes: "Mussarela, orégano", preco: 25.0 },
  { nome: "Calabresa", ingredientes: "Calabresa, cebola, orégano", preco: 27.0 },
  { nome: "Frango com Catupiry", ingredientes: "Frango, catupiry, orégano", preco: 30.0 },
  { nome: "Bacon", ingredientes: "Bacon, mussarela, orégano", preco: 34.9 },
  { nome: "Mussarela com Cheddar", ingredientes: "Mussarela, cheddar, orégano", preco: 28.0 },
  { nome: "Mussarela com Catupiry", ingredientes: "Mussarela, catupiry, orégano", preco: 28.0 },
];

const menu = document.getElementById("menu");
const carrinhoLista = document.getElementById("carrinho-lista");
const total = document.getElementById("total");
const btnWhatsApp = document.getElementById("btn-whatsapp");
const modal = document.getElementById("modal");
const listaSabores = document.getElementById("lista-sabores");
const confirmarSabor = document.getElementById("confirmar-sabor");

let carrinho = [];
let pizzaSelecionada = null;

function atualizarMenu() {
  pizzas.sort((a, b) => a.preco - b.preco);
  pizzas.forEach(pizza => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="https://via.placeholder.com/220x150?text=${encodeURIComponent(pizza.nome)}" alt="${pizza.nome}">
      <h3>${pizza.nome}</h3>
      <p>${pizza.ingredientes}</p>
      <strong>R$ ${pizza.preco.toFixed(2)}</strong><br>
      <button onclick="adicionarPizza('${pizza.nome}')">1 Sabor</button>
      <button onclick="abrirModal('${pizza.nome}')">2 Sabores</button>
    `;
    menu.appendChild(card);
  });
}

function abrirModal(nomePizza) {
  pizzaSelecionada = nomePizza;
  listaSabores.innerHTML = "";
  pizzas.filter(p => p.nome !== nomePizza).forEach(pizza => {
    const li = document.createElement("li");
    li.textContent = pizza.nome;
    li.onclick = () => selecionarSegundoSabor(pizza);
    listaSabores.appendChild(li);
  });
  modal.style.display = "flex";
}

let segundoSabor = null;

function selecionarSegundoSabor(pizza) {
  segundoSabor = pizza;
  [...listaSabores.children].forEach(li => li.style.background = "");
  event.target.style.background = "#ffe5b4";
}

confirmarSabor.onclick = () => {
  if (segundoSabor) {
    const p1 = pizzas.find(p => p.nome === pizzaSelecionada);
    const precoMedio = ((p1.preco + segundoSabor.preco) / 2).toFixed(2);
    carrinho.push({ nome: `${p1.nome} / ${segundoSabor.nome}`, preco: parseFloat(precoMedio) });
    atualizarCarrinho();
    modal.style.display = "none";
    segundoSabor = null;
  } else {
    alert("Escolha o segundo sabor antes de confirmar!");
  }
};

function adicionarPizza(nome) {
  const pizza = pizzas.find(p => p.nome === nome);
  carrinho.push(pizza);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  carrinhoLista.innerHTML = "";
  let soma = 0;
  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    carrinhoLista.appendChild(li);
    soma += item.preco;
  });
  total.textContent = `Total: R$ ${soma.toFixed(2)}`;
}

btnWhatsApp.onclick = () => {
  if (carrinho.length === 0) return alert("Adicione algo ao carrinho!");
  const texto = encodeURIComponent("🍕 *Pedido Mary's Pizzaria:*\n" +
    carrinho.map(p => `- ${p.nome} (R$ ${p.preco.toFixed(2)})`).join("\n") +
    `\n\nTotal: R$ ${total.textContent.split(': ')[1]}`);
  window.open(`https://wa.me/${numeroWhatsApp}?text=${texto}`, "_blank");
};

window.onclick = function(event) {
  if (event.target === modal) modal.style.display = "none";
};

atualizarMenu();