import { getUser } from "../api/auth"
import { $ } from "../utils/common"
import validation from "../utils/validate";
import toast from "./toast";
import { create } from "../api/orders";
import { renderCart, getTotalAmount } from "../utils/handle-cart";


const CustomerInfoModal = {
    async render() {
        const user = await getUser()
        return /* html */`
            <input type="checkbox" id="customer-modal-toggle" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative flex flex-col gap-3">
                    <label for="customer-modal-toggle" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h1 class="text-2xl font-semibold my-5 text-center">Checkout</h1>
                    <form action="" id="checkout-form">

                        <div class="form-control gap-1">
                             <label for="">Customer's name</label>
                             <input type="text" class="input input-bordered" name="name" data-name="Customer's name" value="${user?.username ?? ""}">
                             <small class="error-message"></small>
                         </div>
                        <div class="form-control gap-1">
                             <label for="">Phone</label>
                             <input type="text" class="input input-bordered" name="phone" data-name="Phone number" value="${user?.phone ?? ""}">
                             <small class="error-message"></small>
                         </div>
                        <div class="form-control gap-1">
                             <label for="">Address</label>
                             <input type="text" class="input input-bordered" name="address" data-name="Address" value="${user?.address ?? ""}">
                             <small class="error-message"></small>
                         </div>
                        <div class="form-control gap-1">
                             <label for="">Delivery</label>
                            <select name="delivery" id="delivery" data-name="Delivery" data-cost="0" class="select select-bordered">
                                 <option data-cost="0" value="" selected >Select</option>
                                 <option data-cost="10" value="Express">Express - $10</option>
                                 <option data-cost="5" value="Standard">Standard - $5</option>
                            </select>
                             <small class="error-message"></small>
                         </div>
     
                         <div class="modal-action !justify-start">
                             <button type="submit" class="btn normal-case">Confirm</button>
                         </div>
                    </form>
                </div>
            </div>
        `
    },
    handleEvents() {
        const checkoutForm = $("#checkout-form")
        if (checkoutForm) {

            const name = checkoutForm["name"]
            const phone = checkoutForm["phone"]
            const address = checkoutForm["address"]
            const delivery = checkoutForm["delivery"]
            const cartItems = JSON.parse(localStorage.getItem("cart"))
            const userId = localStorage.getItem("auth") || 0



            delivery.onchange = () => {
                const deliveryOptions = delivery.querySelectorAll("option")
                deliveryOptions.forEach(option => {
                    if (option.selected == true) {
                        delivery.dataset.cost = option.dataset.cost
                        console.log(delivery.dataset.cost);
                        getTotalAmount(cartItems)
                    }
                }
                )
            }

            checkoutForm.addEventListener("submit", async (event) => {
                event.preventDefault()
                // check empty cart
                if (cartItems && cartItems.length === 0) {
                    toast("warning", "You don't have any product in cart!")
                    return
                }
                // valid user data
                if (!validation.areRequired(name, phone, address, delivery)) return
                if (!validation.isPhoneNumber(phone)) return

                const today = new Date().toLocaleString().split(",")
                const order = {
                    userId: userId.value,
                    username: name.value,
                    phone: phone.value,
                    address: address.value,
                    createdAt: today[1].trim(),
                    orderItems: cartItems
                }
                const createdOrder = await create(order)
                console.log(createdOrder)
                if (createdOrder) {
                    event.target.reset()
                    $("#customer-modal-toggle").checked = false
                    localStorage.setItem("cart", JSON.stringify([]))
                    toast("success", "Place order successfully!")
                    renderCart([]);
                }
            })
        }
    }
}


export default CustomerInfoModal