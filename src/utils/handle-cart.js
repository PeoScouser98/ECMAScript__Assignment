import { $, $$ } from "./common";
import toast from "../components/toast";
import CartItem from "../components/cart-item";
import formatNumber from "./format-number";
import { renderPage, reRender } from "./render-page";
import CartPage from "../pages/cart";

const countItems = (cartItems) => {
	const cartCounter = $("#cart-counter");
	if (cartCounter) cartCounter.innerText = cartItems.length;
};

export const addCart = (item) => {
	const cartItems = JSON.parse(localStorage.getItem("cart"));
	if (cartItems) {
		if (+item.qty > +item.stock) {
			toast("warning", "Out of stock !");
			return;
		}
		const existItem = cartItems.find((elem) => elem.id == item.id);
		if (existItem) {
			existItem.qty += item.qty;
			existItem.total = +existItem.qty * +item.price;
		} else {
			item.total = +item.qty * +item.price;
			cartItems.push(item);
		}
		countItems(cartItems);
		toast("success", "Added item to cart!");
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}
};

export const showEmptyCart = () => {
	const cartList = $("#cart-list");
	cartList.innerHTML = /*html */ `<tr><td colspan='5' class="text-xl">No item!</td></tr>
	`;
};

/**
 * render cart items
 */
export const renderCart = (data) => {
	const cartList = $("#cart-list");
	if (cartList) cartList.innerHTML = data.map((item) => CartItem.render(item)).join("");
	getTotalAmount(data);
	CartItem.handleEvents();
	countItems(data);
	if (data.length === 0) showEmptyCart();
};

/**
 * Tính tiền
 */
export const applyGiftCode = () => {
	const tempPayment = $("#temp-payment");
	const discount = $("#discount");
	const totalAmount = $("#total-amount");
	const giftcode = $("#gift-code");
	if (giftcode.value == "playstore") {
		discount.dataset.cash = 100000;
		discount.innerText = `${formatNumber(discount.dataset.cash)}₫`;
		totalAmount.dataset.cash = +tempPayment.dataset.cash - +discount.dataset.cash;
		totalAmount.innerText = `${formatNumber(totalAmount.dataset.cash)}₫`;
	}
};

export const getTotalAmount = (data) => {
	const tempPayment = $("#temp-payment");
	const discount = $("#discount");
	const totalAmount = $("#total-amount");
	const delivery = $("#delivery")
	// const giftcode = $("#gift-code");
	if ((tempPayment, discount, totalAmount)) {
		tempPayment.dataset.cash = data.reduce((previousValue, currentValue) => {
			return previousValue + currentValue.total;
		}, 0);
		discount.innerText = `$${formatNumber(discount.dataset.cash)}`;
		// tổng tiền tạm tính
		tempPayment.innerText = `$${formatNumber(tempPayment.dataset.cash)}`;
		// tổng tiền thanh toán chưa bao gồm phí ship
		totalAmount.dataset.cash = +tempPayment.dataset.cash - +discount.dataset.cash + +delivery.dataset.cost;
		totalAmount.innerText = `$${formatNumber(totalAmount.dataset.cash)}`;
	}
};

/**
 * update cart item
 */
export const updateCartItem = (id, qty) => {
	const cartItems = JSON.parse(localStorage.getItem("cart"));
	const item = cartItems.find((item) => item.id == id);
	// update qty & total của sản phẩm trong giỏ hàng
	if (item) {
		item.qty = +qty;
		item.total = +(item.price * item.qty);
		cartItems[cartItems.indexOf(item)] = item;
		// update lại toàn bộ giỏ hàng
		localStorage.setItem("cart", JSON.stringify(cartItems));
		renderCart(JSON.parse(localStorage.getItem("cart"))); // update xong -> rerender ra ngoài
	}
};
/**
 * delete cart item
 */
export const removeItem = (btn) => {
	let cartItems = JSON.parse(localStorage.getItem("cart"));
	cartItems = cartItems.filter((item) => item.id != btn.dataset.id);
	renderCart(cartItems);
	localStorage.setItem("cart", JSON.stringify(cartItems));
	if (cartItems.length == 0) showEmptyCart();
};

/**
 * change item quantity
 */

export const changeQty = (btn) => {
	const target = btn.parentElement.querySelector(".quantity");
	let value = +target.value;
	value += +btn.dataset.val;
	if (value < 1) value = 1;
	if (value > target.max) {
		toast("warning", "Not enough in stock!");
		value = target.max;
	}
	target.value = value;
	console.log(btn);
	updateCartItem(btn.dataset.id, target.value);
};

/**
 * check
 */
export const checkEmptyCart = () => {
	const cartItems = JSON.parse(localStorage.getItem("cart"));
	if (cartItems.length == 0) {
		toast("warning", "You have no product in cart");
		return false;
	}
};
