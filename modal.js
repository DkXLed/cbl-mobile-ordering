
import { clearCartItems } from './index.js'
const modalFeed = document.getElementById("modal-feed")
const modalElement = document.getElementById("modal-feed")
const modalOverlay = document.getElementById("modal-overlay")
const submitPayment = document.getElementById("submit-payment")
const payInfo = document.getElementById('pay-info')


renderModal()

function getModalHtml(){
    let modalHtml = ''
    modalHtml =
       `
       <div class="modal-overlay"> 
            <div class="modal" id="modal">
                <form class="modal-container">
                    <button class="close-window" id="close-window">x</button>
                    <div class="modal-title">Enter payment Info</div>
                    <label for "buyer-name">Name</label>
                    <input required type="text" id="buyer-name" placeholder="Jimi Hendrix">   
                    <label for "buyer-name">Card Number</label>
                    <input required type="text" id="buyer-card-number" placeholder="**** **** **** ****">  
                    <label for "buyer-name">CVC</label>
                    <input required type="text" id="card-cvv" placeholder="***">  
                    <input type="submit" class="submit-payment" id="submit-payment">
                </form>
            </div>
        </div> 
       
       `
    return modalHtml
}

function renderModal(){
    modalFeed.innerHTML=getModalHtml()
}

document.addEventListener('click', function(event) {
    if (event.target.matches("#complete-order")) {
        modalElement.style.display = "block"
        modalOverlay.style.display = "block" 
        console.log("btn clicked")
    }
    if (event.target.matches("#close-window")) {
        modalElement.style.display = "none";
        modalOverlay.style.display = "none";
    }
})

document.addEventListener('submit', function(event) {
    if (event.target.matches('.modal-container')) {
        event.preventDefault();
        if (event.target.checkValidity()) {
            clearCart();
            modalElement.style.display = "none";
            modalOverlay.style.display = "none";
        } else {
            event.target.reportValidity();
        }
    }
});






function clearCart(){
    clearCartItems()
    const buyerName = document.getElementById("buyer-name").value || "Customer"
    payInfo.innerHTML=`<div class="confirm-order">Thank you ${buyerName}, your order has been Submitted</div>`
}



