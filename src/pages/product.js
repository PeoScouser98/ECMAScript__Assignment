import instance from "../api/axios.config";
import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import ProductCard from "../components/product-card_v1";

const ProductPage = {
	async render(cate) {
		const categories = await instance.get("/categories");
		console.log("::::::", cate);
		const list = !cate
			? await instance.get("/products")
			: await instance.get(`/categories/${cate}?_embed=products`);

		const products = !list.products ? list : list.products;

		return /* html */ `
         <div class="max-w-6xl mx-auto  drawer">
            <input id="my-drawer-3" type="checkbox" class="drawer-toggle" /> 
				<div class="drawer-content invisible-scroll flex flex-col">
                ${Header.render()}

				  <main class="py-10 px-5 flex flex-col gap-12">
              <!-- hero banner-->
				  <section><img src="../../assets/img/banner-product.png" alt="" class="max-w-full h-[500px] object-cover object-center"></section>
				  
              <!-- products list-->
					<section class="flex items-stretch flex-row xl:gap-8">
                  <aside class="sticky top-0 left-0 basis-1/4 px-3 border-r">
                     <ul class="menu">
                     ${categories
							.map((item) => /* html */ `<li><a href="/#/products?cate=${item.id}">${item.name}</a></li>`)
							.join("")}
                     </ul>
                  </aside>
                  <div class="basis-3/4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-16">
                     ${products.map((item) => ProductCard.render(item)).join("")}
                  </div>
                </section>
				  
					<!-- categories list -->
               
               </main>
               <hr>
					 <footer> ${Footer.render()}</footer>
            </div> 
            ${Sidebar.render()}
        </div>
      `;
	},
	handleEvents() {
		Header.handleEvent();
		ProductCard.handleEvents();
	},
};

export default ProductPage;
