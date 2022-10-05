import { $, $$ } from "../utils/common";
import toast from "./toast";
import { addCart } from "../utils/handle-cart";

const ProductCard = {
	render(data) {
		return /* html */ `
      <div class="flex flex-col justify-between gap-5 h-[350px]">
         <a href="/#/product-detail/${data.id}">
            <img src="${
				data.image
			}" alt="" class="w-[-webkit-fill-available] max-h-[200px] object-cover object-center rounded-lg">
         </a>
         <span>${data.name}</span>
         <span class="text-[color:var(--primary-color)] font-semibold text-xl">$${data.price}</span>
			<button class="btn normal-case add-cart--btn" data-product='${JSON.stringify(data)}'>Add to card</button>
      </div>
      `;
	},
	handleEvents() {
		const addCartBtns = $$(".add-cart--btn");
		addCartBtns.forEach((btn) => {
			btn.onclick = (e) => {
				const product = JSON.parse(e.target.dataset.product);
				addCart({ qty: 1, ...product });
			};
		});
	},
};

export default ProductCard;
