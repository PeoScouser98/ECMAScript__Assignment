import { $, $$ } from "../utils/common";
import formatNumber from "../utils/format-number";
import { changeQty, removeItem } from "../utils/handle-cart";

const CartItem = {
	render(item) {
		return /*html */ `<tr>
									<td>
										<button class="remove-btn btn btn-ghost text-2xl text-gray-500 hover:text-gray-800"
													data-id="${item.id}"
										>
											<i class="bi bi-trash"></i>
										</button>
									</td>
									<td>
										<div class="flex items-center gap-3">
											<img src="${item.image}" alt="" class="max-w-[60px] h-[60px] object-cover object-center rounded-lg">
												<div class="font-bold">
													<span class="block font-medium truncate">${item.name}</span>
													<span class="block font-medium text-zinc-400">$${item.price}</span>
												</div>
											</div>
										</div>
									</td>
									
									<td>
										<div class="inline-flex w-fit">
											<input type="button" class="btn btn-ghost btn-square btn-sm change-qty--btn" data-val="-1" data-id="${item.id}"  value="-"/>
											<input 
													min=1
													max=${item?.stock}
													value=${item?.qty} 
													class="quantity btn btn-square btn-ghost btn-sm hover:bg-transparent" name="custom-input-number">
											<input type="button" class="btn btn-ghost btn-square btn-sm change-qty--btn" data-val="1" data-id="${item.id}" value="+"/>
										</div>
									</td>
									<th>
										<span class="block total-price font-medium">$${item?.total}
									</th>
								</tr>`;
	},
	handleEvents() {
		const removeBtns = $$(".remove-btn");
		if (removeBtns) {
			removeBtns.forEach((btn) =>
				btn.addEventListener("click", () => {
					removeItem(btn);
				}),
			);
		}

		const changeQtyBtns = $$(".change-qty--btn");
		if (changeQtyBtns) {
			changeQtyBtns.forEach((btn) =>
				btn.addEventListener("click", () => {
					changeQty(btn);
				}),
			);
		}
	},
};
export default CartItem;
