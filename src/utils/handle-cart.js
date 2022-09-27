import { $, $$ } from "./common";
import toast from "../components/toast";

export const addCart = (item) => {
	const cartItems = JSON.parse(localStorage.getItem("cart"));
	if (cartItems) {
		if (+item.qty > +item.stock) {
			toast("warning", "Out of stock !");
			return;
		}
		const existItem = cartItems.find((elem) => elem.id == item.id);
		if (existItem) existItem.qty += item.qty;
		else {
			delete item.stock;
			cartItems.push(item);
		}
		localStorage.setItem("cart", JSON.stringify(cartItems));
		$("#cart-counter").innerText = cartItems.length;
		toast("success", "Added item to cart!");
		console.log("Current cart:", cartItems);
	}
};
