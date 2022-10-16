import { $, $$ } from "../utils/common";
import toast from "./toast";
import { addCart } from "../utils/handle-cart";

const ProductCard = {
	render(data) {
		return /* html */ `
      <div class="flex flex-col justify-between gap-3">
         <a href="/#/product/${data.id}">
            <img src="${data.image
			}" alt="" class="w-[-webkit-fill-available] h-[160px] object-cover object-center rounded-lg">
         </a>
         <span class="font-semibold w-full truncate">${data.name}</span>
         <span class="text-[color:var(--primary-color)] font-semibold text-xl">$${data.price}</span>
			<button class="btn normal-case add-cart--btn" data-product='${JSON.stringify(data)}'>Add to Cart</button>
      </div>
      `;
	},
	handleEvents() {
		const addCartBtns = $$(".add-cart--btn");
		addCartBtns.forEach((btn) => {
			btn.onclick = (e) => {
				const product = JSON.parse(e.target.dataset.product);
				const addedItem = { qty: 1, ...product }
				console.log(addedItem);
				addCart(addedItem);
			};
		});
	},
};

export default ProductCard;
