import "./index.css";
import Navigo from "navigo";
import { $, $$ } from "./utils/common";
/* pages */
import Homepage from "./pages/home";
import SiginPage from "./pages/signin";
import SignupPage from "./pages/signup";
import ProductPage from "./pages/product";
import ProductDetailsPage from "./components/product-detail";
import instance from "./api/axios.config";

const router = new Navigo("/", { hash: true });

const cartItems = localStorage.getItem("cart");
if (cartItems == null) localStorage.setItem("cart", JSON.stringify([]));

document.addEventListener("DOMContentLoaded", () => {
	const renderPage = async (page, id) => {
		const app = $("#app");
		if (app) app.innerHTML = await page.render(id);
		if (page.handleEvents) page.handleEvents();
	};
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
		"/products": () => {
			renderPage(ProductPage);
		},
		"/product-detail/:id": ({ data }) => {
			renderPage(ProductDetailsPage, +data.id);
		},
	});
	router.resolve();
});
