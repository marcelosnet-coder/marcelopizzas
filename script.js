
const pizzas=[
 {n:'Mussarela',p:25,img:'mussarela.jpg'},
 {n:'Calabresa',p:25,img:'calabresa.jpg'},
 {n:'Mussarela c/ Catupiry',p:28,img:'catupiry.jpg'},
 {n:'Mussarela c/ Cheddar',p:28,img:'cheddar.jpg'},
 {n:'Presunto',p:29,img:'presunto.jpg'},
 {n:'Frango c/ Queijo',p:29,img:'frango.jpg'},
 {n:'Frango c/ Catupiry',p:34.9,img:'frango_cat.jpg'},
 {n:'Bacon',p:34.9,img:'bacon.jpg'},
 {n:'Portuguesa',p:34.9,img:'portuguesa.jpg'}
];

const drinks=[
 {n:'Coca-Cola 2L',p:15},
 {n:'Guaraná Antarctica 1L',p:8},
 {n:'Kuat 2L',p:12},
 {n:'Pepsi Black 1L',p:8}
];

const pizzaList=document.getElementById('pizzaList');
pizzas.forEach(p=>{
 pizzaList.innerHTML+=`
 <div class="card">
  <img src="${p.img}">
  <b>${p.n}</b><br>R$ ${p.p}
 </div>`;
});

const drinkList=document.getElementById('drinkList');
drinks.forEach(d=>{
 drinkList.innerHTML+=`
 <div class="card">
  <b>${d.n}</b><br>R$ ${d.p}
 </div>`;
});

function goPage(id){
 document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
 document.getElementById(id).classList.add('active');
}

function updateChoice(){
 const q=document.getElementById('qtd').value;
 const board=document.getElementById('board');
 board.innerHTML='';
 for(let i=0;i<q;i++){
  board.innerHTML+=`
  <select>
   ${pizzas.map(p=>`<option>${p.n}</option>`).join('')}
  </select>`;
 }
}

updateChoice();

function sendWhats(){
 const nome=nomeInput.value;
 const end=endereco.value;
 const tel=fone.value;
 const sabores=[...document.querySelectorAll('#board select')].map(s=>s.value).join(' / ');
 const msg=`🍕 *Pedido Mary's Pizza* %0ACliente: ${nome}%0ASabores: ${sabores}%0AEndereço: ${end}%0ATelefone: ${tel}%0A%0AObrigado pela preferência! ❤️`;
 window.open(`https://wa.me/5581991851200?text=${msg}`);
}
