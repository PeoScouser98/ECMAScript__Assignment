import { $ } from "./common";

export const reRender = (selector, content) => {
	const contentContainer = $(selector);
	if (contentContainer) contentContainer.innerHTML = content;
};

export const renderPage = async (page, id, params) => {
	const app = $("#app");
	if (app) app.innerHTML = await page.render(id);
	// if (params) app.innerHTML = await page.render(params);
	if (page.handleEvents) page.handleEvents();
};
