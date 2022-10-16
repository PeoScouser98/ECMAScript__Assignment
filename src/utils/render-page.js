import { $ } from "./common";

export const reRender = (selector, content) => {
	const contentContainer = $(selector);
	if (contentContainer) contentContainer.innerHTML = content;
};

export const renderPage = async (page, id) => {
	const app = $("#app");
	if (app) app.innerHTML = await page.render(id);
	if (page.handleEvents) await page.handleEvents();
};
