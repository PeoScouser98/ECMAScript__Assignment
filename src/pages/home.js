import instance from "../api/axios.config";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import HeroBanner from "../components/hero";
import Footer from "../components/footer";
import ProductCard from "../components/product-card_v2";

const Homepage = {
	async render() {
		const products = await instance.get("/products/?_expand=category");
		const categories = await instance.get("/categories");
		return /* html */`
				<div class="drawer">
					<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
					<div class="drawer-content">
						<div class="max-h-screen invisible-scroll flex flex-col overflow-y-auto">
							${await Header.render()}
							
							<main class="py-10 px-5 flex flex-col gap-12  max-w-6xl mx-auto ">
								<!-- hero banner-->
								<section>${HeroBanner.render()}</section>
	
								<!-- products list-->
								<section>
									<h1 class="text-center text-5xl font-bold mb-6">Our Popular Dishes</h1>
									<p class="text-center text-base mb-6 max-w-[700px] mx-auto">Lorem ipsum dolor sit amet, consectetuipisicing elit,
										sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim </p>
									<div class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-14">
										${products.map((item) => ProductCard.render(item)).join("")}
									</div>
								</section>
	
								<!-- categories list -->
								<section>
									<div class="flex justify-between items-center mb-20">
										<h1 class="text-5xl font-bold">Category</h1>
										<a type="button" role="button" href="#categories" class="border border-[#F54748] text-[#F54748] py-[19px] px-[24px] rounded-xl">View
											All Categories</a>
									</div>
	
									<div class="flex justify-between items-center overflow-x-auto invisible-scroll" id="categories">
										${categories.map((item) => /* html */ `
											<div class="flex flex-col gap-5 items-center">
												<a href=""><img src="${item.image}"/></a>
												<span>${item.name}</span>
											</div>`,
		).join("")}
									</div>
								</section>
	
								<section>
									<h1 class="font-bold text-center mb-10 text-3xl">Contact Us</h1>
									<form action="">
										<div class="grid sm:grid-cols-1 grid-cols-2 gap-5 mb-5">
											<div class="form-control">
												<label class="uppercase" for="">Name</label>
												<input type="text" class="input input-bordered">
												<small class="text-error font-medium"></small>
											</div>
											<div class="form-control">
												<label class="uppercase" for="">emAIL aDDRESS</label>
												<input type="text" class="input input-bordered">
												<small class="text-error font-medium"></small>
											</div>
											<div class="form-control">
												<label class="uppercase" for="">Subject</label>
												<input type="text" class="input input-bordered">
												<small class="text-error font-medium"></small>
											</div>
											<div class="form-control">
												<label class="uppercase" for="">ENquiry type</label>
												<input type="text" class="input input-bordered">
												<small class="text-error font-medium"></small>
											</div>
										</div>
										
										<div class="form-control min-w-full">
											<label class="uppercase" for="">Message</label>
											<textarea class="textarea textarea-bordered" id="" cols="30" rows="10"></textarea>
											<small class="text-error font-medium"></small>
										</div>
									</form>
								</section>
							</main>
							<hr class="max-w-6xl mx-auto">
							<footer class=" max-w-6xl mx-auto "> ${await Footer.render()}</footer>
					
						</div>
					</div> 
					${Sidebar.render()}
				</div>
          `;
	},
	handleEvents() {
		Header.handleEvent();
	},
};
export default Homepage;
