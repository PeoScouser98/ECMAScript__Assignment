import "./index.css";
import Navigo from "navigo";
import { $, $$ } from "./utils/common";
import { renderPage } from "./utils/render-page";
import { isAdmin } from "./api/auth";
/* pages */
import Homepage from "./pages/home";
import SiginPage from "./pages/signin";
import SignupPage from "./pages/signup";
import ProductPage from "./pages/product";
import ProductDetailsPage from "./pages/product-detail";
import CartPage from "./pages/cart";
import instance from "./api/axios.config";

// admin pages
import AddProductPage from "./pages/admin/product-add";
import InventoryPage from "./pages/admin/inventory";
import EditProductPage from "./pages/admin/product-edit";
import Dashboard from "./pages/admin/dashboard";
import CustomerPage from "./pages/admin/customer-list";
import SiteSettingsPage from "./pages/admin/settings";

const router = new Navigo("/", { hash: true });

document.addEventListener("DOMContentLoaded", () => {
	router.hooks({
		before: async (done) => {
			const cartItems = localStorage.getItem("cart");
			if (!cartItems) localStorage.setItem("cart", JSON.stringify([]));


			done();
		}
	});

	router.on({
		"/": async () => {
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
		"/cart": () => {
			renderPage(CartPage);
		},
		"/product/:id": ({ data }) => {
			renderPage(ProductDetailsPage, +data?.id);
		},
		"/admin/dashboard": async () => {
			let isAuthorized = await isAdmin()
			if (isAuthorized)
				renderPage(Dashboard)
		},
		"/admin/inventory": async () => {
			let isAuthorized = await isAdmin()
			if (isAuthorized)
				renderPage(InventoryPage);
		},
		"/admin/inventory/add-product": async () => {
			let isAuthorized = await isAdmin()
			if (isAuthorized)
				renderPage(AddProductPage);
		},
		"/admin/inventory/edit-product/:id": async ({ data }) => {
			let isAuthorized = await isAdmin()
			if (isAuthorized)
				renderPage(EditProductPage, +data?.id);
		},
		"/admin/customers": () => {
			renderPage(CustomerPage)
		},
		"/admin/site-settings": () => {
			renderPage(SiteSettingsPage)
		}
	});
	router.resolve();
});
export default router