import { menuArray } from './data.js'
const feed = document.getElementById('feed')
const payInfo = document.getElementById('pay-info')
const cart = {}

function renderMenuArr(){
    let feedHtml = ''
    menuArray.forEach(function(menuData){
        feedHtml += `
        <div class="feed-container">
            <div class="obj-img"><img src="${menuData.objImg}" id="thumbnail"></div>
            <div class="menuItems">
                <h1 class="name">${menuData.name}</h1>
                <h2 class="sizes">${menuData.sizes}</h2>
                <div class="price">$${menuData.price}</div>
            </div>
            <button class="addBtn add-to-cart-btn" data-item-id="${menuData.id}" id="addBtn">+1</button>
        </div>
        `
    })
    return feedHtml
}

function render(){
    feed.innerHTML=renderMenuArr()
}

render()

function displayCart(){
    let cartItemsHtml = '';
    const itemsInCart = Object.values(cart); 
    if (itemsInCart.length > 0) {
        itemsInCart.forEach(item => {
            cartItemsHtml += `
                <div class="cart-items">  
                    <div class="item">${item.name} ${item.quantity}</div>
                    <button class="remove-btn" data-id="${item.id}" id="red-btn" >remove</button>
                    <div class="unit-price">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            `;
        });
    } else {
        cartItemsHtml = '<p>Your cart is empty.</p>';
    }
    const grandTotal = calculateTotalPrice()
    payInfo.innerHTML = `
        <div class="order-page" id="cart-order-page">
            <h1 class="your-order">Your Order</h1>
            ${cartItemsHtml}
            <div class="totals">
                <div class="total-price">total price</div>
                <div class="price-sum">$${grandTotal.toFixed(2)}</div>
            </div>
            <button class="complete-order" id="complete-order">complete order</button>
        </div>
    `;
}

function calculateTotalPrice() {
  const itemsInCart = Object.values(cart);
  if (itemsInCart.length === 0) {
    return 0;
  }
  return itemsInCart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

document.addEventListener('click', (event) => {
  if (event.target.matches('.add-to-cart-btn')) {
    const itemId = event.target.dataset.itemId
    const itemToAdd = menuArray.find(item => item.id == itemId); 

    if (itemToAdd) {
      if (cart[itemId]) {
        cart[itemId].quantity++; 
      } else {
        cart[itemId] = { ...itemToAdd, quantity: 1 }; 
      }
    }

    displayCart(); 
    
    
    const cartPage = document.getElementById('cart-order-page')
    if (cartPage) {
      cartPage.scrollIntoView({ behavior: 'smooth' })
    }
  }  
})

document.addEventListener('click', (event) => {
  if (event.target.matches('.remove-btn')) {
    let removeItemId = String(event.target.dataset.id)
    if (cart[removeItemId]){
      if (cart[removeItemId].quantity > 1){
        cart[removeItemId].quantity--
      }else{
        delete cart[removeItemId]
      }
    }
    displayCart()
  }  
})

export function clearCartItems() {
    for (const key in cart) {
        delete cart[key];
    }
    displayCart();
}


