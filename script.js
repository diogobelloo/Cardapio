const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal");
const cartTotal = document.getElementById("cart-total")
const cartItems= document.getElementById("cart-items")
const cartCount= document.getElementById("cart-count")
const checkout = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const andressInput = document.getElementById("andress")
const addressWarn = document.getElementById("addres-warn")

let cart = [];


//Abrir modal do carrinho
cartBtn.addEventListener('click', () => {
    if(cart.length === 0){
        return (
                        Toastify({
                text: "Poxa... Você esqueceu de adicionar um item",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "rigth", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #ef4420, #ef4444)",
                },
                
                }).showToast()
        )
    }

    updateCartModal()
    cartModal.style.display = "flex"
    document.body.style.overflow = "hidden";
})

//Fechar modal
cartModal.addEventListener("click", (event) => {
    
    if(event.target === cartModal){
        cartModal.style.display = "none"
           document.body.style.overflow = "scroll";
    }
})
closeModalBtn.addEventListener("click", () => {
    cartModal.style.display = "none"
        document.body.style.overflow = "scroll";
})

menu.addEventListener("click", (event) => {
    let parentButton = event.target.closest(".add-to-cart-btn")
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price= parseFloat(parentButton.getAttribute("data-price"))
        

        addTocart(name,price)
    }
    //console.log(parentButton)
})


// Essa função verifica se já tem o item no meu carrinho, se já tem, adiciona somente + 1 a minha quantidade
function addTocart(name, price){
    
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quanty += 1;
    
    }
    else {
        cart.push({
            name,
            price,
            quanty: 1,
        })
    }

    updateCartModal()
}

//Atualiza o carrinho
function updateCartModal() {
     cartItems.innerHTML = ""
     let total = 0

     cart.forEach(item => {
        const cardItemElement = document.createElement("div");
        cardItemElement.classList.add("flex","justify-between", "mb-4", "flex-col")

        cardItemElement.innerHTML = `
            <div class=" p-2 flex items-center justify-between mb-2 border-2 border-dotted divide-indigo-500 rounded-3xl">
                <div>
                    <p class="font-medium"><i class="fa-solid fa-burger"></i>  ${item.name}</p>
                    <p class="font-medium"> Quantidade: ${item.quanty}</p>
                    <span class="font-medium md-2 text-purple-900">R$ ${item.price}</span>
                </div>

                <div>
                    <button class="text-purple-900 font-medium remove-from-card-btn" data-name=${item.name}>
                        Remover
                    </button>
                </div>
            </div>`
            total += item.price * item.quanty

        cartItems.appendChild(cardItemElement)
        
     })

     cartTotal.textContent = total.toLocaleString("pt-BR", {
        style:"currency",
        currency:"BRL"
     });

     cartCount.innerHTML = cart.length

}


//Função para remover o intem do carrinho

cartItems.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-card-btn")){
        const name = event.target.getAttribute("data-name")
        removeItemCart(name)
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name )
    if(index !== -1){
        const item = cart[index];
        console.log(item)
        if(item.quanty > 1){
            item.quanty -= 1
            updateCartModal() //Atualiza a lista de carrinho
            return //encerra aqui
        }

        cart.splice(index, 1)
         updateCartModal()
    }
}

andressInput.addEventListener("input", function(event) {
    let inputValue = event.target.value
    if(inputValue !== ""){
        addressWarn.classList.add("hidden")
        andressInput.classList.remove("border-red-500")
    }
    //Verificação 


})

checkout.addEventListener("click", function() {
    
    const isOpen = checkedRestauranteOpen();
       
    if(cart.length === 0) return;

    if(andressInput.value === ""){
        addressWarn.classList.remove("hidden")
        andressInput.classList.add("border-red-500")
        return
    }


    //Enviar pedido para a API
    const cartItemContent = cart.map((item) => {  
        return (
            `${item.name} 
                quantidade: ${item.quanty}
                  Preço:${item.price}
---------------------------------------------------------------------`
    )
    })

    const message = encodeURIComponent(cartItemContent)
    console.log(cartItemContent)
    const phone = "5533998797271"

    window.open(`https://wa.me/${phone}?text=${message}  Endereço: ${andressInput.value}`, "_link")

    cart = []
    updateCartModal()

})

function checkedRestauranteOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora <= 23; //true = restaurante está aberto 

}
const spanItem = document.getElementById("date-span")
const isOpen = checkedRestauranteOpen();

if(isOpen){

    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-500")
}
else{
        spanItem.classList.remove("bg-green-500")
       spanItem.classList.add("bg-red-500")
}