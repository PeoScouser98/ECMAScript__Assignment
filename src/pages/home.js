import instance from "../api/axios.config";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import HeroBanner from "../components/hero";
import Footer from "../components/footer";

const Homepage = {
	async render() {
		const products = await instance.get("/products");
		const categories = await instance.get("/categories");
		return /* html */ `
        <div class="max-w-6xl mx-auto  drawer">
            <input id="my-drawer-3" type="checkbox" class="drawer-toggle" /> 
				<div class="drawer-content invisible-scroll flex flex-col">
                ${Header.render()}

				  <main class="py-10 px-5 flex flex-col gap-12">
              <!-- hero banner-->
				  <section>${HeroBanner.render()}</section>
				  
              <!-- products list-->
					<section>
					<h1 class="text-center text-5xl font-bold mb-6">Our Popular Dishes</h1>
					<p class="text-center text-base mb-6 max-w-[700px] mx-auto">Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim </p>
					<div class="grid grid-cols-3 gap-x-10 gap-y-14">
                    ${products
						.map((item) => {
							return /* html */ `
						<div class="flex flex-col gap-5">
						<a href=""><img src="${item.image}" class="rounded-2xl"/></a>
						<h3 class="text-[#F54748] font-semibold text-lg">${item.name}</h3>
						<div class="flex items-start gap-10">
							<span class="inline-flex items-center gap-1"><img src="../../assets/img/Timer.svg" alt="" loading="lazy"> 30s</span>
							<span class="inline-flex item-center gap-1">
								<img src="../../assets/img/ForkKnife.svg" alt="" loading="lazy"> ${item.category}
							</span>
						</div>
                    </div>
                  `;
						})
						.join("")}
                  </div>
                </section>
				  
					<!-- categories list -->
                <section>
                  <div class="flex justify-between items-center mb-20">
                    <h1 class="text-5xl font-bold">Category</h1>
                    <a type="button" role="button" href="#categories" class="border border-[#F54748] text-[#F54748] py-[19px] px-[24px] rounded-xl">View All Categories</a>
                  </div>
            
                  <div class="flex justify-between items-center" id="categories">
                    ${categories
						.map((item) => {
							return /* html */ `
                    <div class="flex flex-col gap-5 items-center">
                      <a href=""><img src="${item.image}"/></a>
                      <span>${item.name}</span>
                    </div>
                  `;
						})
						.join("")}
                  </div>
                </section>
                <div class="divider"></div>
                ${Footer.render()}
              </main>
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
