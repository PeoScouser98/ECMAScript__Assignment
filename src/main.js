import "./index.css";
import Navigo from "navigo";
import { $, $$ } from "./utils/common";
/* pages */
import Homepage from "./pages/home";
import SiginPage from "./pages/signin";
import SignupPage from "./pages/signup";

const router = new Navigo("/", { hash: true });
document.addEventListener("DOMContentLoaded", () => {
	const renderPage = async (page, id) => {
		const app = $("#app");
		if (app) app.innerHTML = await page.render();
		if (page.handleEvents) await page.handleEvents();
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
	});
	router.resolve();
});
