import "./index.css";
import Navigo from "navigo";
import { $, $$ } from "./utils/common";
import { renderPage } from "./utils/render-page";
/* pages */
import Homepage from "./pages/home";
import SiginPage from "./pages/signin";
import SignupPage from "./pages/signup";
import ProductPage from "./pages/product";
import ProductDetailsPage from "./pages/product-detail";
import instance from "./api/axios.config";
import AddProductPage from "./pages/admin/product-add";
import CartPage from "./pages/cart";

const router = new Navigo("/", { hash: true });

document.addEventListener("DOMContentLoaded", () => {
	router.hooks({
		before: (done) => {
			const cartItems = localStorage.getItem("cart");
			if (!cartItems) localStorage.setItem("cart", JSON.stringify([]));
			done();
		},
	});
	router.on({
		"/": () => {
			renderPage(Homepage);
		},
		"/signup": () => {
			renderPage(SignupPage);
		},
		"/signin": () => {
			renderPage(SiginPage);
		},
		"/products": ({ params }) => {
			renderPage(ProductPage, +params?.cate);
		},
		"/cart": () => {
			renderPage(CartPage);
		},
		"/product-detail/:id": ({ data }) => {
			renderPage(ProductDetailsPage, +data.id);
		},
		"/admin/product": () => {
			renderPage(AddProductPage);
		},
	});
	router.resolve();
});
