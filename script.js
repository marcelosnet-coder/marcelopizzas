
// script.js - lógica do cardápio

const pizzas = [
  {nome: "Mussarela", preco: 25.00, ingredientes: "Mussarela, orégano", img: "https://source.unsplash.com/featured/?pizza,cheese"},
  {nome: "Calabresa", preco: 25.00, ingredientes: "Calabresa, mussarela, cebola, orégano", img: "https://source.unsplash.com/featured/?pizza,calabresa"},
  {nome: "Mussarela com catupiry", preco: 28.00, ingredientes: "Mussarela, catupiry, orégano", img: "https://source.unsplash.com/featured/?pizza,catupiry"},
  {nome: "Mussarela com cheddar", preco: 28.00, ingredientes: "Mussarela, cheddar, orégano", img: "https://source.unsplash.com/featured/?pizza,cheddar"},
  {nome: "Presunto", preco: 29.00, ingredientes: "Presunto, mussarela, orégano", img: "https://source.unsplash.com/featured/?pizza,ham"},
  {nome: "Frango com queijo", preco: 29.00, ingredientes: "Frango desfiado, mussarela, orégano", img: "https://source.unsplash.com/featured/?pizza,chicken"},
  {nome: "Frango com queijo e catupiry", preco: 34.90, ingredientes: "Frango, mussarela, catupiry, orégano", img: "https://source.unsplash.com/featured/?pizza,chicken,catupiry"},
  {nome: "Bacon", preco: 34.90, ingredientes: "Bacon, mussarela, orégano", img: "https://source.unsplash.com/featured/?pizza,bacon"},
  {nome: "Portuguesa", preco: 34.90, ingredientes: "Presunto, ovos, ervilha, mussarela, orégano", img: "https://source.unsplash.com/featured/?pizza,portuguesa"}
];

// Helpers
const fmt = v => v.toFixed(2).replace('.',',');
const toBRL = v => 'R$ ' + fmt(v);

document.addEventListener('DOMContentLoaded', ()=>{
  const btnPedido = document.getElementById('btn-pedido');
  const pageCover = document.getElementById('page-cover');
  const pageMenu = document.getElementById('page-menu');
  const pageChoose = document.getElementById('page-choose');

  // build menu
  const menuList = document.getElementById('menu-list');
  pizzas.forEach((p, idx)=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundImage = `url('${p.img}')`;
    card.innerHTML = `
      <div class="info">
        <h3>${p.nome}</h3>
        <p>${p.ingredientes}</p>
      </div>
      <div class="price">${toBRL(p.preco)}</div>
    `;
    card.addEventListener('click', ()=>{
      openChooseWith(p);
    });
    menuList.appendChild(card);
  });

  // bebidas modal
  const modal = document.getElementById('modal-bebidas');
  document.getElementById('btn-bebidas').addEventListener('click', ()=> modal.classList.remove('hidden'));
  modal.querySelector('.close-modal').addEventListener('click', ()=> modal.classList.add('hidden'));

  document.querySelectorAll('.back').forEach(b=> b.addEventListener('click', (e)=>{
    const target = e.currentTarget.dataset.target;
    navigateTo(target);
  }));

  btnPedido.addEventListener('click', ()=> navigateTo('page-menu'));
  document.getElementById('qr').addEventListener('click', ()=> navigateTo('page-menu'));

  // navigation
  function navigateTo(id){
    document.querySelectorAll('.page').forEach(p=> p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0,0);
  }

  // choose logic
  const optionButtons = document.querySelectorAll('.option');
  const singleBlock = document.getElementById('single-choice');
  const doubleBlock = document.getElementById('double-choice');
  const flavor1 = document.getElementById('flavor1');
  const flavorA = document.getElementById('flavorA');
  const flavorB = document.getElementById('flavorB');
  const priceValue = document.getElementById('price-value');
  const halfA = document.getElementById('halfA');
  const halfB = document.getElementById('halfB');

  // fill selects
  function populateSelects(){
    [flavor1, flavorA, flavorB].forEach(sel=>{
      sel.innerHTML = '';
      pizzas.forEach((p, i)=>{
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `${p.nome} — ${toBRL(p.preco)}`;
        sel.appendChild(opt);
      });
    });
  }
  populateSelects();

  optionButtons.forEach(btn=> btn.addEventListener('click', (e)=>{
    optionButtons.forEach(b=> b.classList.remove('active'));
    e.currentTarget.classList.add('active');
    const v = e.currentTarget.dataset.value;
    if(v === '1'){
      singleBlock.classList.remove('hidden');
      doubleBlock.classList.add('hidden');
    } else {
      singleBlock.classList.add('hidden');
      doubleBlock.classList.remove('hidden');
    }
    updatePrice();
  }));

  flavor1.addEventListener('change', updatePrice);
  flavorA.addEventListener('change', ()=>{
    halfA.textContent = pizzas[flavorA.value].nome;
    updatePrice();
  });
  flavorB.addEventListener('change', ()=>{
    halfB.textContent = pizzas[flavorB.value].nome;
    updatePrice();
  });

  // open choose with a preselected pizza
  function openChooseWith(pizza){
    navigateTo('page-choose');
    // preselect single option and choose that pizza
    document.querySelector('.option[data-value="1"]').click();
    populateSelects();
    const idx = pizzas.findIndex(x=>x.nome===pizza.nome);
    if(idx>=0) flavor1.value = idx;
    updatePrice();
  }

  function updatePrice(){
    const isSingle = !doubleBlock.classList.contains('hidden');
    if(!isSingle){
      // single
      const p = pizzas[flavor1.value];
      priceValue.textContent = toBRL(p.preco);
    } else {
      // double: price = maior dos dois sabores
      const a = pizzas[flavorA.value].preco;
      const b = pizzas[flavorB.value].preco;
      const maior = Math.max(a,b);
      priceValue.textContent = toBRL(maior);
    }
  }

  // set initial UI
  document.querySelector('.option[data-value="1"]').click();

  // send to whatsapp
  document.getElementById('send-whatsapp').addEventListener('click', ()=>{
    const qty = document.querySelector('.option.active').dataset.value;
    let summary = '';
    if(qty === '1'){
      const p = pizzas[flavor1.value];
      summary = `${p.nome} - ${toBRL(p.preco)}`;
    } else {
      const a = pizzas[flavorA.value];
      const b = pizzas[flavorB.value];
      summary = `Metade 1: ${a.nome} / Metade 2: ${b.nome} - Preço: ${priceValue.textContent}`;
    }

    const name = document.getElementById('customer-name').value || 'Cliente';
    const address = document.getElementById('customer-address').value || 'Não informado';
    const phone = document.getElementById('customer-phone').value || '';

    const message = encodeURIComponent(`Olá, gostaria de fazer um pedido:\n\n${summary}\n\nNome: ${name}\nEndereço: ${address}\nTelefone: ${phone}\n\nAgradeço a preferência!`);

    // phone for Mary's Pizza (Brazil): +55 81 9 9185-1200 -> digits only
    const waPhone = '5581991851200';
    const wa = `https://api.whatsapp.com/send?phone=${waPhone}&text=${message}`;
    window.open(wa, '_blank');
  });

});
