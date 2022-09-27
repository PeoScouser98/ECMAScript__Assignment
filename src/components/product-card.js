import { $, $$ } from "../utils/common";
import toast from "./toast";
import { addCart } from "../utils/handle-cart";

const ProductCard = {
	render(data) {
		return /* html */ `
      <div class="flex flex-col justify-between gap-5 h-[350px]">
         <a href="/#/product-details/${data.id}">
            <img src="${data.image}" alt="" class="w-[-webkit-fill-available] max-h-[200px] object-cover object-center rounded-lg">
         </a>
         <span>${data.name}</span>
         <span class="text-[color:var(--primary-color)] font-semibold text-xl">$${data.price}</span>
         <form action="" class="add-card__form">
            <input type="hidden" name="id" value="${data.id}">
            <input type="hidden" name="name" value="${data.name}">
            <input type="hidden" name="price" value="${data.price}">
            <input type="hidden" name="img" value="${data.image}">
            <input type="hidden" name="stock" value="${data.stock}">

            <button type="submit" class="btn btn-block add-cart__btn normal-case">Add to Cart</button>
         </form>
      </div>
      `;
	},
	handleEvents() {
		const addCartForm = $$(".add-card__form");
		if (addCartForm)
			addCartForm.forEach((form) => {
				form.addEventListener("submit", (e) => {
					e.preventDefault();
					const cartItems = JSON.parse(localStorage.getItem("cart"));
					if (cartItems) {
						const item = {
							id: form["id"].value,
							name: form["name"].value,
							price: form["price"].value,
							img: form["img"].value,
							stock: form["stock"].value,
							qty: 1,
						};
						addCart(item);
					}
				});
			});
	},
};

export default ProductCard;
