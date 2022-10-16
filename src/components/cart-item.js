import { $, $$ } from "../utils/common";
import formatNumber from "../utils/format-number";
import { changeQty, removeItem } from "../utils/handle-cart";

const CartItem = {
	render(item) {
		return /*html */ `<tr>
							<td class="max-w-fit px-0">
								<button class="remove-btn btn btn-ghost btn-square w-fit hover:bg-transparent btn-sm text-2xl text-gray-500 hover:text-gray-800" data-id="${item.id}">
									<i class="bi bi-trash"></i>
								</button>
							</td>
							<td>
								<div class="flex items-center gap-3">
									<img src="${item.image}" alt="" class="max-w-[60px] h-[60px] sm:max-w-[100px] sm:h-[100px] object-cover object-center rounded-lg">
										<div class="font-bold flex flex-col gap-2">
											<span class="font-medium truncate">${item.name}</span>
											<span class="font-medium text-zinc-400">$${item.price}</span>
											<div class="inline-flex w-fit md:hidden lg:hidden xl:hidden">
												<input type="button" class="btn btn-ghost btn-square btn-sm change-qty--btn" data-val="-1" data-id="${item.id}"  value="-"/>
												<input 
														min=1
														max=${item?.stock}
														value=${item?.qty} 
														class="quantity btn btn-square btn-ghost btn-sm hover:bg-transparent" name="custom-input-number">
												<input type="button" class="btn btn-ghost btn-square btn-sm change-qty--btn" data-val="1" data-id="${item.id}" value="+"/>
											</div>
										</div>
									</div>
								</div>
							</td>
							
							<td>
								<div class="inline-flex w-fit sm:hidden">
									<input type="button" class="btn btn-ghost btn-square btn-sm change-qty--btn" data-val="-1" data-id="${item.id}"  value="-"/>
									<input 
											min=1
											max=${item?.stock}
											value=${item?.qty} 
											class="quantity btn btn-square btn-ghost btn-sm hover:bg-transparent" name="custom-input-number">
									<input type="button" class="btn btn-ghost btn-square btn-sm change-qty--btn" data-val="1" data-id="${item.id}" value="+"/>
								</div>
							</td>
							<th class="sm:hidden">
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
