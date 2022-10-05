import CartItem from "../components/cart-item";
import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { $, $$ } from "../utils/common";
import { removeItem, renderCart, updateCartItem, changeQty } from "../utils/handle-cart";

const CartPage = {
	render() {
		return /* template */ `
			<div class="max-w-6xl mx-auto drawer">
				<input type="checkbox" id="my-drawer-3" class="drawer-toggle"/>
				<div class="drawer-content flex flex-col max-h-screen justify-between">
					<!-- Header -->
					${Header.render()}

					<main class="w-full h-full bg-zinc-100 flex justify-center items-center sm:py-0 lg:py-[50px]">
						<div
							class="w-full flex justify-center items-stretch sm:flex-col md:flex-col lg:flex-row sm:border-t lg:border-none"
						>
							<!-- cart items -->
							<div class="bg-white basis-4/6 flex flex-col justify-between p-4 h-[inherit]">
								<h1 class="text-2xl font-medium mb-5">Your cart</h1>
								<!-- cart items are rendered here -->
								<div class="overflow-y-auto w-full h-60" id="cart-container">
									<table class="table table-compact w-full rounded-none">
										<tbody id="cart-list">
										</tbody>
									</table>
								</div>
								<a href="/#/products" class="hover:link"
									><i class="bi bi-arrow-left-short"></i>Continue to shopping</a
								>
							</div>
							<!-- order summary  -->
							<div class="bg-gray-200 p-5 max-w-full flex flex-col gap-5">
								<div class="form-control w-full">
									<label class="text-[16px] font-[600]">Voucher </label>
									<div class="flex w-full items-stretch gap-2">
										<input
											type="text"
											placeholder="Gift code ..."
											class="input focus:outline-none input-bordered"
											id="gift-code"
										/>
										<button type="button" class="btn btn-outline btn-md normal-case" onclick="applyGiftCode()">
											Apply
										</button>
									</div>
								</div>
								<div class="flex items-center justify-between">
									<p class="text-lg">Temporary payment</p>
									<p class="text-lg" id="temp-payment" data-cash="0"></p>
								</div>
								<div class="flex items-center justify-between border-b-2">
									<p class="text-lg">Discount</p>
									<p class="text-lg" id="discount" data-cash="0"></p>
								</div>
								<!-- devider -->
								<div class="border-t border-gray-600 py-4">
									<div class="flex items-center justify-between">
										<p class="font-semibold text-xl">Total Amount</p>
										<p class="font-semibold text-xl" id="total-amount" data-cash></p>
										<input id="order-total-amount" type="hidden" />
									</div>
									<p class="text-[14px] bb-[30px]">This doesn't include shipping cost</p>
								</div>
								<form action="" id="cart-form" onsubmit="checkEmptyCart(event)">
									<button
										type="submit"
										name="check-out"
										id="check-out-submit"
										class="btn btn-block btn-lg hover:btn-active hover:btn-primary normal-case"
									>
										Create Order
									</button>
								</form>
							</div>
						</div>
					</main>
			${Footer.render()}
		</div>
		${Sidebar.render()}
		</div>

	`;
	},
	handleEvents() {
		const items = JSON.parse(localStorage.getItem("cart"));
		renderCart(items);
		Header.handleEvent();
		CartItem.handleEvents();
	},
};
export default CartPage;
