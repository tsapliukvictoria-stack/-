
// Простий обробник форм: зберігає замовлення в localStorage і показує повідомлення.
// Реально: підключіть бекенд або webhook для прийому заявок.
function saveOrder(data){
  const orders = JSON.parse(localStorage.getItem('kreaktsiya_orders')||'[]');
  orders.push(Object.assign({id:Date.now()}, data));
  localStorage.setItem('kreaktsiya_orders', JSON.stringify(orders));
}

document.addEventListener('DOMContentLoaded', ()=>{
  const orderForm = document.getElementById('orderForm');
  if(orderForm){
    orderForm.addEventListener('submit', function(e){
      e.preventDefault();
      const fd = new FormData(orderForm);
      const data = Object.fromEntries(fd.entries());
      saveOrder(data);
      document.getElementById('orderResult').textContent = 'Дякуємо! Менеджер зв'яжеться з вами найближчим часом.';
      orderForm.reset();
    });
  }

  const productOrderForm = document.getElementById('productOrderForm');
  if(productOrderForm){
    productOrderForm.addEventListener('submit', function(e){
      e.preventDefault();
      const fd = new FormData(productOrderForm);
      const data = Object.fromEntries(fd.entries());
      saveOrder(data);
      document.getElementById('prodOrderResult').textContent = 'Запит надіслано. Очікуйте дзвінка менеджера.';
      productOrderForm.reset();
    });
  }

  // Просте завантаження деталей продукту за query param id
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if(id){
    const mapping = {
      '1': {title:'Квітковий столик із смоли', img:'assets/images/product1.svg', desc:'Красива декоративна робота: прозора епоксидна смола з висушеними квітами. Діаметр 60–80 см.'},
      '2': {title:'Цифрова рамка з відео', img:'assets/images/product2.svg', desc:'Рамка під ключ. Підтримка відео та фото, налаштування плейлістів.'},
      '3': {title:'Персоналізований фотоальбом', img:'assets/images/product3.svg', desc:'Палітурка з дизайном під замовлення, індивідуальні підписи.'},
      '4': {title:'Подарунковий набір сюрпризів', img:'assets/images/product4.svg', desc:'Тематичний набір у коробці з декількома сюрпризами.'},
    };
    const p = mapping[id] || mapping['1'];
    const titleEl = document.getElementById('p-title');
    const imgEl = document.getElementById('p-image');
    const descEl = document.getElementById('p-desc');
    if(titleEl) titleEl.textContent = p.title;
    if(imgEl) imgEl.src = p.img;
    if(descEl) descEl.textContent = p.desc;
  }
});
