import instance from "../api/axios.config";
import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import ProductCard from "../components/product-card_v1";
import { $, $$ } from "../utils/common";
import { reRender } from "../utils/render-page";

const ProductPage = {
	async render() {
		const categories = await instance.get("/categories");

		const products = await instance.get("/products");

		return /* html */ `
<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<div class="max-h-screen invisible-scroll flex flex-col overflow-y-auto">

			${await Header.render()}
	
			<main class="py-10 px-5 flex flex-col gap-12 max-w-6xl mx-auto">
				<!-- hero banner-->
				<section><img src="../../assets/img/banner-product.png" alt="" class="max-w-full max-h-[500px] object-cover object-center"></section>
	
				<!-- products list-->
				<section class="grid grid-cols-[1fr,3fr] sm:grid-cols-1 items-stretch md:gap-4 lg:gap-6 xl:gap-8">
					<aside class="sticky top-0 left-0 basis-1/4 px-3 border-r sm:hidden">
						<div class="flex justify-start items-center gap-3  px-3 rounded-full bg-zinc-100 mb-5">
							<form action="" id="search-form">
								<label for="search"><i class="bi bi-search"></i></label>
								<input type="text" name="keyword" placeholder="Search ..." class="py-2 border-none bg-transparent focus:outline-none">
								<button type="submit" class="hidden" id="search">Search</button>
							</form>
						</div>
						<ul class="menu">
							${categories
				.map(
					(item) => /* html */ `<li><a data-cate="${item.id}" class="filter-item">${item.name}</a></li>`).join("")}
						 </ul>
					  </aside>
					  <div 
						class="basis-3/4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-16"
						id="product-container"
						>
						 ${products.map((item) => ProductCard.render(item)).join("")}
					  </div>
					</section>
						<!-- categories list -->
				   </main>
				   <hr class="max-w-6xl mx-auto">
					${await Footer.render()}

            </div> 
        </div>
		${Sidebar.render()}
        </div>
      `;
	},
	async handleEvents() {
		Header.handleEvent();
		ProductCard.handleEvents();

		const isValidResult = (ref, val) => {
			if (val.length < 3) return false;
			if (ref.toLowerCase().includes(val.toLowerCase())) return true;
		};
		// search product

		// const categories = await instance.get("/categories");

		const products = await instance.get("/products?_expand=category");

		const searchForm = $("#search-form");
		if (searchForm) {
			searchForm.addEventListener("submit", (event) => {
				event.preventDefault();
				const val = event.target["keyword"];
				const result = products.filter(
					(item) => isValidResult(item.name, val.value) || isValidResult(item.category.name, val.value),
				);
				console.log(result);
				const content =
					result.length != 0
						? result.map((item) => ProductCard.render(item)).join("")
						: /* html */ `<h2 class="text-2xl font-semibold">No result! </h2>`;

				reRender("#product-container", content);
			});
		}


		const filterItems = $$(".filter-item");
		if (filterItems)
			filterItems.forEach(
				(item) =>
				(item.onclick = async () => {
					console.log(item.dataset.cate);
					const cateId = item.dataset.cate;
					const { products } = await instance.get(`/categories/${cateId}?_embed=products`);
					let content;
					if (products && Array.isArray(products) && products.length > 0)
						content = products.map((item) => ProductCard.render(item));
					else content = /* html */ `<h1 class="text-2xl font-semibold">No result</h1>`;
					reRender("#product-container", content);
				}),
			);
	},
};

export default ProductPage;
